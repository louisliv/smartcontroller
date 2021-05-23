import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceApi } from '../../api/api.device';
import { NodeApi } from "../../api/api.node";
import { Device } from '../../models/device';
import { DiscoverDevice } from '../../models/discover-device';
import { Node } from "../../models/node";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  discoveredDevice: DiscoverDevice;
  device: Device = new Device();
  deviceTypes: string[];
  nodes: Node[];

  constructor(
    private router: Router, 
    private deviceApi: DeviceApi,
    private nodeApi: NodeApi
  ) {
    this.discoveredDevice = this.router.getCurrentNavigation().extras.state as DiscoverDevice;
    if (this.discoveredDevice) {
      this.device.id = this.discoveredDevice.id;
      this.device.ip = this.discoveredDevice.ip;
      this.device.mac = this.discoveredDevice.mac;
    }
  }

  ngOnInit(): void {
    this.deviceApi.getDeviceTypes().subscribe({
      next: data => {
        this.deviceTypes = data;
      }
    })

    this.nodeApi.getAll().subscribe({
      next: data => {
        this.nodes = data;
      }
    })
  }

  submit(): void {
    this.deviceApi.post(this.device).subscribe({
      next: data => {
        this.router.navigate(['/nodes/', data.node])
      }
    })
  }
}
