import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Setting } from '../models/setting';
import { LocalStorageService } from '../shared/services/localStorage.service';
import { NavbarService } from '../navbar/navbar.service';
import Keyboard from "simple-keyboard";

const keyboardOptions = {
  theme: "hg-theme-default dark-keyboard",
  layout: {
      'default': [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' @',
          '{shift} z x c v b n m , . / {shift}',
          '{space}'
      ],
      'shift': [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " @',
          '{shift} Z X C V B N M < > ? {shift}',
          '{space}'
      ]
  },
  mergeDisplay: true,
  display: {
      '{ctrl}': 'ctrl',
      '{enter}': 'enter',
  },
  buttonTheme: [
      {
          class: "keyboard-small-btn",
          buttons: "{ctrl} {alt} {esc}"
      }
  ],
  altOn: false,
  shiftOn: false,
  ctrlOn: false,
  capsOn: false
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  settings: Setting[] = [];
  keyboard: Keyboard;
  activeElm: any;

  constructor(
    private localStorage: LocalStorageService,
    private navbar: NavbarService
  ) { }

  ngOnInit() {
    this.navbar.set(["/home"], "Settings")
    this.getSettings();
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button),
      ...keyboardOptions
    });
  }

  onKeyPress(button: string): void {
    if (this.activeElm && button.length === 1) {
      let elem = document.getElementsByName(this.activeElm)[0]
      let index = this.settings.findIndex(x => x.name === this.activeElm)
      this.settings[index].value = this.settings[index].value + button
      elem.focus()
    } else if (this.activeElm && button === '{bksp}') {
      let elem = document.getElementsByName(this.activeElm)[0]
      let index = this.settings.findIndex(x => x.name === this.activeElm)
      this.settings[index].value = this.settings[index].value.slice(0, -1)
      elem.focus()
    } else if (this.activeElm) {
      let elem = document.getElementsByName(this.activeElm)[0]
      elem.focus()
    }

    if (button === "{shift}" || button === "{lock}") this.handleShift();
  }

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  onFocus(elm) {
    this.activeElm = elm.getAttribute("name");
  }

  onBlur(elm) {
    let elmName = elm.getAttribute("name");
    if (this.activeElm === elmName) {
      this.activeElm === null;
    }
  }

  getSettings() {
    this.localStorage.settingsList.forEach(settingKey => {
      let setting = new Setting();
      setting.name = settingKey;
      setting.value = this.localStorage.get(settingKey);

      this.settings.push(setting);
    });
  }

  setSettings() {
    this.settings.forEach(setting => {
      this.localStorage.set(setting.name, setting.value)
    })
  }
}
