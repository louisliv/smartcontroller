import { Component, Input, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Device } from '../../models/device';
import {
  RokuButtons,
  FireTVButtons,
  rokuKeyboard,
  firetvKeyboard
} from "../device.globals";
import Keyboard from "simple-keyboard";
import { DeviceApi } from '../../api/api.device';

@Component({
  selector: 'app-roku',
  templateUrl: './roku.component.html',
  styleUrls: ['./roku.component.scss']
})
export class RokuComponent implements OnInit, AfterViewInit {
  @Input() device: Device;
  rokuButtons;
  keyboard: Keyboard;
  keyboardClass: string;

  constructor(private deviceApi: DeviceApi) { }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button),
      theme: `hg-theme-default dark-keyboard-${this.keyboardClass}`
    });
  }

  ngOnInit(): void {
    if (this.device.device_type === 'ROKU') {
      this.rokuButtons = RokuButtons;
      this.keyboardClass = 'purple'
    } else if (this.device.device_type === 'AMZN') {
      this.rokuButtons = FireTVButtons;
      this.keyboardClass = 'orange'
    }
  }

  onKeyPress = (button: string) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */

    if (button === "{shift}" || button === "{lock}"){
      this.handleShift()
    } else {
      this.device.device_type === 'ROKU' ?
        rokuKeyboard(this.deviceApi, button, this.device) :
        firetvKeyboard(this.deviceApi, button, this.device)
    }
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.key;
    this.device.device_type === 'ROKU' ?
        rokuKeyboard(this.deviceApi, keyPressed, this.device) :
        firetvKeyboard(this.deviceApi, keyPressed, this.device)
  }
}
