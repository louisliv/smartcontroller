import { Component, OnInit } from '@angular/core';
import { DeviceApi } from '../../api/api.device';
import { DiscoverDevice } from "../../models/discover-device";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  devices: DiscoverDevice[];
  faSpinner = faSpinner;
  isLoaded = false;
  loadError: any;

  constructor(private deviceApi: DeviceApi) { }

  ngOnInit(): void {
    this.deviceApi.discover().subscribe({
      next: data => {
        this.devices = data;
        this.isLoaded = true;
        this.loadError = null;
      },
      error: err => {
        this.isLoaded = false;
        this.loadError = `${err.statusText}: ${err.error.message}`;
      }
    })
  }

}
