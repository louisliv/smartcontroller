import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Device } from '../../models/device';
import { RokuButtons } from "../device.globals";
import Keyboard from "simple-keyboard";
import { DeviceApi } from '../../api/api.device';

@Component({
  selector: 'app-roku',
  templateUrl: './roku.component.html',
  styleUrls: ['./roku.component.scss']
})
export class RokuComponent implements OnInit, AfterViewInit {
  @Input() device: Device;
  rokuButtons = RokuButtons;
  keyboard: Keyboard;

  constructor(private deviceApi: DeviceApi) { }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default dark-keyboard-purple"
    });
  }

  ngOnInit(): void {
  }

  onKeyPress = (button: string) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    let value: string;
    if (button === "{shift}" || button === "{lock}"){
      this.handleShift()
    } else if (button === "{enter}") {
      this.deviceApi.roku(
        this.device.id,
        'select'
      ).subscribe();
    } else if (button === "{space}") {
      value = ' ';
    } else if (button === "{tab}") {

    } else if (button === "{bksp}") {
      this.deviceApi.roku(
        this.device.id,
        'backspace'
      ).subscribe();
    } else {
      value = button;
    };

    if (value) {
      this.deviceApi.roku(
        this.device.id,
        'literal',
        value
      ).subscribe();
    }
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
