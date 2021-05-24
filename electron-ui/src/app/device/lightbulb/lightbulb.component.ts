import { Component, Input, OnInit } from '@angular/core';
import { DeviceApi } from '../../api/api.device';
import { Device } from '../../models/device';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-lightbulb',
  templateUrl: './lightbulb.component.html',
  styleUrls: ['./lightbulb.component.scss']
})
export class LightbulbComponent implements OnInit {
  @Input() device: Device;
  faPower = faPowerOff
  
  constructor(private deviceApi: DeviceApi) { }

  ngOnInit(): void {
  }

  changeBulbColor(event) {
    this.deviceApi.changeColor(
      this.device.id, event.color.hex
    ).subscribe()
  }

  changeBulbBrightness(event) {
    var brightness = event.target.value;
    this.deviceApi.changeBrightness(
      this.device.id, brightness
    ).subscribe()
  }

  powerDevice() {
    this.deviceApi.power(this.device.id).subscribe();
  }
}
