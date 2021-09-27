import { Component, Input, OnInit } from '@angular/core';
import { DeviceApi } from '../../../api/api.device';
import { Device } from '../../../models/device';

@Component({
  selector: 'app-roku-button',
  templateUrl: './roku-button.component.html',
  styleUrls: ['./roku-button.component.scss']
})
export class RokuButtonComponent implements OnInit {
  @Input() button: {
    icon: any;
    secondaryIcon: any;
    command: string;
    btnClass: string;
    text: string;
    type: string;
  };

  @Input() device: Device;
  btnClass: string;

  constructor(private deviceApi: DeviceApi) {
  }

  ngOnInit(): void {
    this.btnClass = this.button.btnClass ? this.button.btnClass : 'secondary';
  }

  onClick(): void {
    if (this.device.device_type === 'ROKU') {
      this.deviceApi.roku(this.device.id, this.button.command)
        .subscribe();
    } else if (this.device.device_type === 'AMZN') {
      this.deviceApi.firetv(this.device.id, this.button.command)
        .subscribe();
    } else if (this.device.device_type.includes('LG')) {
      this.deviceApi.lg(this.device.id, this.button.command)
        .subscribe()
    }
  }

}
