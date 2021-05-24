import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../models/device';
import { DeviceApi } from "../../api/api.device";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-plug',
  templateUrl: './plug.component.html',
  styleUrls: ['./plug.component.scss']
})
export class PlugComponent implements OnInit {
  @Input() device: Device;
  faPower = faPowerOff;
  
  constructor(private deviceApi: DeviceApi) { }

  ngOnInit(): void {
  }

  powerDevice() {
    this.deviceApi.power(this.device.id).subscribe({
      next: data => {
      }
    });
  }
}
