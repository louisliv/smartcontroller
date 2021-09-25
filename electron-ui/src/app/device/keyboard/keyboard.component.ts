import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceApi } from '../../api/api.device';
import { KeyboardApi } from '../../api/api.keyboard';
import { Device } from '../../models/device';
import Keyboard from "simple-keyboard";
import {
  MediaButtons,
  keyboardOptions,
  ExtraButtons,
  DButtons
} from "./keyboard.globals";
import { computerKeyboard} from "../device.globals";
import { NavbarService } from '../../navbar/navbar.service';

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
  extraButtons = ExtraButtons;
  dButtons = DButtons;

  constructor(
    private keyboardApi: KeyboardApi,
    private deviceApi: DeviceApi,
    private route: ActivatedRoute,
    private navbar: NavbarService
  ) { }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button),
      ...keyboardOptions
    });
  }

  ngOnInit(): void {
    this.route.parent.params.subscribe( params => {
      this.deviceApi.get(params.id).subscribe({
        next: data => {
          this.device = data;
          this.isLoaded = true;
          this.loadError = null;
          this.navbar.set(['/devices', this.device.id.toString()], this.device.name)
        },
        error: err => {
          this.isLoaded = false;
          this.loadError = `${err.statusText}: ${err.error.message}`;
        }
      })
    });
  }

  onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      this.handleShift(button)
    } else if (button === "{ctrl}") {
      this.handleCtrl()
    } else if (button === "{alt}") {
      this.handleAlt()
    } else {
      var literal = button;
      var options = this.keyboard.options;

      let ctrlLiteral = options.ctrlOn ? 'ctrl+': '';
      let shiftLiteral = options.shiftOn || options.capsOn ? 'shift+': '';
      let altLiteral = options.altOn ? 'alt+': '';
      literal = `${ctrlLiteral}${shiftLiteral}${altLiteral}${literal.toLowerCase()}`;

      computerKeyboard(this.keyboardApi, literal, this.device, this.clearPushButtons);
    };
  };

  handleShift = (button) => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    if (button === "{shift}") {
      this.keyboard.options.shiftOn = !this.keyboard.options.shiftOn;
      this.keyboard.options.shiftOn ?
        this.keyboard.addButtonTheme("{shift}", "active"):
        this.keyboard.removeButtonTheme("{shift}", "active");
    } else {
      this.keyboard.options.capsOn = !this.keyboard.options.capsOn;
    }

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  handleAlt = () => {
    this.keyboard.options.altOn = !this.keyboard.options.altOn;

    this.keyboard.options.altOn ?
      this.keyboard.addButtonTheme("{alt}", "active"):
      this.keyboard.removeButtonTheme("{alt}", "active");
  };

  handleCtrl = () => {
    this.keyboard.options.ctrlOn = !this.keyboard.options.ctrlOn;

    this.keyboard.options.ctrlOn ?
      this.keyboard.addButtonTheme("{ctrl}", "active"):
      this.keyboard.removeButtonTheme("{ctrl}", "active");
  };

  clearPushButtons = () => {
    let options = this.keyboard.options;

    if (options.shiftOn) {
      this.keyboard.setOptions({
        layoutName: "default"
      })
    }

    options.ctrlOn = false;
    options.shiftOn = false;
    options.altOn = false;
    this.keyboard.removeButtonTheme("{shift} {ctrl} {alt}", "active");
  }

  sendButtonClick(command: string) {
    var literal = command;
    let currentLayout = this.keyboard.options.layoutName;

    if (currentLayout === "shift") {
      literal = `shift+${literal}`;
    };

    this.keyboardApi.keyboard(this.device, literal).subscribe();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.key;
    computerKeyboard(this.keyboardApi, keyPressed, this.device, ()=>{});
  }
}
