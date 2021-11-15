import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../models/device';
import { DeviceApi } from "../../api/api.device";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-strip',
  templateUrl: './strip.component.html',
  styleUrls: ['./strip.component.scss']
})
export class StripComponent implements OnInit {
  @Input() device: Device;
  faPower = faPowerOff;

  constructor(private deviceApi: DeviceApi) { }

  ngOnInit(): void {
  }

  powerDevice(childId: string|null=null) {
    this.deviceApi.power(this.device.id, childId).subscribe({
      next: data => {
      }
    });
  }
}
