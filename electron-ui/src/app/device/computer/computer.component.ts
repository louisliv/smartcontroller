import { Component, Input, OnInit } from '@angular/core';
import { faKeyboard, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Device } from '../../models/device';
import { DeviceApi } from '../../api/api.device';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {
  @Input() device: Device;
  faPower = faPowerOff;
  faKeyboard = faKeyboard;
  
  constructor( private deviceApi: DeviceApi) { }

  ngOnInit(): void {
  }

  power(): void {
    this.deviceApi.powerOff(this.device.id).subscribe();
  }

}
