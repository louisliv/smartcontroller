import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceApi } from '../../api/api.device';
import { KeyboardApi } from '../../api/api.keyboard';
import { Device } from '../../models/device';
import Keyboard from "simple-keyboard";
import { MediaButtons } from "./keyboard.globals";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  device: Device;
  isLoaded;
  loadError;
  mediaButtons = MediaButtons;
  keyboard: Keyboard;

  constructor(
    private keyboardApi: KeyboardApi,
    private deviceApi: DeviceApi,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default dark-keyboard"
    });
  }

  ngOnInit(): void {
    this.route.parent.params.subscribe( params => {
      this.deviceApi.get(params.id).subscribe({
        next: data => {
          this.device = data;
          this.isLoaded = true;
          this.loadError = null;
        },
        error: err => {
          this.isLoaded = false;
          this.loadError = `${err.statusText}: ${err.error.message}`;
        }
      })
    });
  }

  onKeyPress = (button: string) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  sendButtonClick(command: string) {
    this.keyboardApi.sendCommand(this.device, command).subscribe({
      next: data => {
      }
    })
  }
}
