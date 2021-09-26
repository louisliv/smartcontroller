import { AfterViewInit, Component } from '@angular/core';
import { NodeApi } from "../../api/api.node";
import Keyboard from "simple-keyboard";
import { Router } from '@angular/router';
import { NavbarService } from '../../navbar/navbar.service';

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
  selector: 'node-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class NodeAddComponent implements AfterViewInit {
  keyboard: Keyboard;
  nodeName: string = '';

  constructor(
    private nodeApi: NodeApi,
    private router: Router,
    private navbar: NavbarService
  ) { }

  ngAfterViewInit() {
    this.navbar.set(['/home'], "Add Node")
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button),
      ...keyboardOptions
    });
  }

  onKeyPress(button: string): void {
    if (button.length === 1) {
      this.nodeName = this.nodeName + button
      this.clearPushButtons();
    } else if (button === '{bksp}') {
      this.nodeName = this.nodeName.slice(0, -1)
    } else if (button === '{space}') {
      this.nodeName === this.nodeName + ' ';
    }

    if (button === "{shift}" || button === "{lock}") this.handleShift();
  }

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle,
      shiftOn: shiftToggle
    });
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

  addNode() {
    this.nodeApi.add(this.nodeName).subscribe({
      next: resp => {
        this.router.navigate(['/'])
      }
    })
  }
}
