import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DeviceApi } from '../../api/api.device';
import { Device } from '../../models/device';
import { NavbarService } from '../../navbar/navbar.service';

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
    private deviceApi: DeviceApi,
    private navbar: NavbarService
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
          this.navbar.set(['/nodes', this.device.node.toString()], this.device.name, null, this.device)
        },
        error: err => {
          this.isLoaded = false;
          this.loadError = `${err.statusText}: ${err.error.message}`;
        }
      })
    });
  }

}
