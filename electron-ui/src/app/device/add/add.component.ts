import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceApi } from '../../api/api.device';
import { NodeApi } from "../../api/api.node";
import { Device } from '../../models/device';
import { DiscoverDevice } from '../../models/discover-device';
import { Node } from "../../models/node";
import { DeviceType } from "../../models/device-type";
import { NavbarService } from '../../navbar/navbar.service';
import { faRedo, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Keyboard from 'simple-keyboard';

const keyboardOptions = {
  theme: "hg-theme-default dark-keyboard hide-keyboard",
  layout: {
    'default': [
      '{bksp}',
      '7 8 9',
      '4 5 6',
      '1 2 3',
      '0 .'
    ]
  },
  mergeDisplay: true,
  display: {
    '{bksp}': 'Backspace'
  },
  buttonTheme: [
    {
      class: "keyboard-small-btn",
      buttons: ""
    }
  ],
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, AfterViewInit {
  discoveredDevices: DiscoverDevice[];
  device: Device = new Device();
  deviceTypes: DeviceType[];
  nodes: Node[];
  devicesRetrieved: boolean = false;
  faSpinner = faSpinner;
  faRedo = faRedo;
  selectedDevice: DiscoverDevice;
  manuallyInputting: boolean = false;
  keyboard: Keyboard

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceApi: DeviceApi,
    private nodeApi: NodeApi,
    private navbar: NavbarService
  ) {
    this.route.queryParams.subscribe({
      next: params => {
        this.device.node = parseInt(params['nodeId'])
        const nodeName = params['nodeName']

        this.navbar.set(['/nodes', String(this.device.node)], nodeName)
      }
    })
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

    this.retrieveDevices()
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button),
      ...keyboardOptions
    });
  }

  onKeyPress(button: string): void {
    if (button.length === 1) {
      if (!this.device.ip) {
        this.device.ip = ''
      }
      this.device.ip = this.device.ip + button
    } else if (button === '{bksp}') {
      this.device.ip = this.device.ip.slice(0, -1)
    }
  }

  retrieveDevices(): void {
    this.devicesRetrieved = false;
    this.deviceApi.discover().subscribe({
      next: data => {
        this.discoveredDevices = data as DiscoverDevice[];
        this.devicesRetrieved = true;
      },
      error: err => {
        this.devicesRetrieved = true;
      }
    })
  }

  submit(): void {
    this.device.ip = this.selectedDevice.ip;
    this.device.mac = this.selectedDevice.mac;
    this.deviceApi.post(this.device).subscribe({
      next: data => {
        this.router.navigate(['/nodes/', data.node])
      }
    })
  }

  toggleManuallyInputting(): void {
    this.selectedDevice = null
    this.device.ip = null
    this.manuallyInputting = !this.manuallyInputting;

    let keyboardTheme = "hg-theme-default dark-keyboard"

    keyboardTheme = this.manuallyInputting ? keyboardTheme: `${keyboardTheme} hide-keyboard`

    this.keyboard.setOptions({
      theme: keyboardTheme
    });
  }
}
