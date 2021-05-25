import { Component, OnInit } from '@angular/core';
import { DeviceApi } from '../../api/api.device';
import { DiscoverDevice } from "../../models/discover-device";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { NodeApi } from "../../api/api.node";
import { NavbarService } from '../../navbar/navbar.service';

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
  nodeId: string;
  nodeName: string;

  constructor(
    private deviceApi: DeviceApi,
    private route: ActivatedRoute,
    private navbar: NavbarService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        this.nodeId = params['nodeId'];
        this.nodeName = params['nodeName']

        this.navbar.set(['/nodes', this.nodeId], this.nodeName)
      }
    })
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
