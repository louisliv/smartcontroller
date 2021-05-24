import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DeviceApi } from '../../api/api.device';
import { Device } from '../../models/device';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  device: Device;
  faSpinner = faSpinner;
  isLoaded = false;
  isComputer = false;
  loadError: any;
  
  constructor(
    private route: ActivatedRoute, 
    private deviceApi: DeviceApi
  ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe( params => {
      this.deviceApi.get(params.id).subscribe({
        next: data => {
          this.device = data;
          this.isLoaded = true;
          this.loadError = null;
          this.isComputer = ["PC", "LINUX", "PI"].includes(
            this.device.device_type
          );
        },
        error: err => {
          this.isLoaded = false;
          this.loadError = `${err.statusText}: ${err.error.message}`;
        }
      })
    });
  }

}
