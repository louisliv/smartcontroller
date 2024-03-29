import {
    faVolumeDown,
    faVolumeUp,
    faVolumeMute,
    faPlay,
    faPause,
    faSearch,
    faForward,
    faBackward,
    faArrowLeft,
    faBackspace,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
    faSignInAlt,
    faSearchLocation,
    faHome,
    faInfo,
    faTerminal,
    faPowerOff,
    faUndoAlt,
    faCheck,
    faBed,
    faBars,
    faCog,
    faMicrophone,
    faMinus,
    faEllipsisH,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

import { faClosedCaptioning } from "@fortawesome/free-regular-svg-icons";

import { DeviceApi } from "../api/api.device";
import { KeyboardApi } from '../api/api.keyboard';
import { Device } from '../models/device';

export const RokuButtons = {
    'back': {
        command: 'back',
        icon: faArrowLeft,
        btnClass: 'secondary w-100'
    },
    'backspace': {
        command: 'backspace',
        icon: faBackspace
    },
    'down': {
        command: 'down',
        icon: faChevronDown,
        btnClass: 'roku'
    },
    'enter': {
        command: 'enter',
        icon: faSignInAlt
    },
    'find_remote': {
        command: 'find_remote',
        icon: faSearchLocation
    },
    'forward': {
        command: 'forward',
        icon: faForward,
        btnClass: 'secondary w-100'
    },
    'home': {
        command: 'home',
        icon: faHome,
        btnClass: 'secondary w-100'
    },
    'info': {
        command: 'info',
        icon: faInfo,
        btnClass: 'secondary w-100'
    },
    'left': {
        command: 'left',
        icon: faChevronLeft,
        btnClass: 'roku'
    },
    'literal': {
        command: 'literal',
        icon: faTerminal
    },
    'play': {
        command: 'play',
        icon: faPlay,
        secondaryIcon: faPause,
        btnClass: 'secondary w-100'
    },
    'power': {
        command: 'power',
        icon: faPowerOff,
        btnClass: 'secondary w-100'
    },
    'replay': {
        command: 'replay',
        icon: faUndoAlt,
        btnClass: 'secondary w-100'
    },
    'reverse': {
        command: 'reverse',
        icon: faBackward,
        btnClass: 'secondary w-100'
    },
    'right': {
        command: 'right',
        icon: faChevronRight,
        btnClass: 'roku'
    },
    'search': {
        command: 'search',
        icon: faSearch,
        btnClass: 'secondary w-100'
    },
    'select': {
        command: 'select',
        icon: faCheck,
        btnClass: 'roku'
    },
    'up': {
        command: 'up',
        icon: faChevronUp,
        btnClass: 'roku'
    },
    'volume_down': {
        command: 'volume_down',
        icon: faVolumeDown,
        btnClass: 'secondary w-100'
    },
    'volume_mute': {
        command: 'volume_mute',
        icon: faVolumeMute,
        btnClass: 'secondary w-100'
    },
    'volume_up': {
        command: 'volume_up',
        icon: faVolumeUp,
        btnClass: 'secondary w-100'
    }
}

export const FireTVButtons = {
    'back': {
        command: 'back',
        icon: faArrowLeft,
        btnClass: 'secondary w-100'
    },
    'backspace': {
        command: 'backspace',
        icon: faBackspace
    },
    'down': {
        command: 'down',
        icon: faChevronDown,
        btnClass: 'fire-tv'
    },
    'enter': {
        command: 'enter',
        icon: faCheck
    },
    'find_remote': {
        command: 'find_remote',
        icon: faSearchLocation
    },
    'forward': {
        command: 'media_fast_forward',
        icon: faForward,
        btnClass: 'secondary w-100'
    },
    'home': {
        command: 'home',
        icon: faHome,
        btnClass: 'secondary w-100'
    },
    'info': {
        command: 'menu',
        icon: faBars,
        btnClass: 'secondary w-100'
    },
    'left': {
        command: 'left',
        icon: faChevronLeft,
        btnClass: 'fire-tv'
    },
    'literal': {
        command: 'literal',
        icon: faTerminal
    },
    'play': {
        command: 'media_play_pause',
        icon: faPlay,
        secondaryIcon: faPause,
        btnClass: 'secondary w-100'
    },
    'power': {
        command: 'power',
        icon: faPowerOff,
        btnClass: 'secondary w-100'
    },
    'replay': {
        command: 'sleep',
        icon: faBed,
        btnClass: 'secondary w-100'
    },
    'reverse': {
        command: 'media_rewind',
        icon: faBackward,
        btnClass: 'secondary w-100'
    },
    'right': {
        command: 'right',
        icon: faChevronRight,
        btnClass: 'fire-tv'
    },
    'search': {
        command: 'search',
        icon: faSearch,
        btnClass: 'secondary w-100'
    },
    'select': {
        command: 'enter',
        icon: faCheck,
        btnClass: 'fire-tv'
    },
    'up': {
        command: 'up',
        icon: faChevronUp,
        btnClass: 'fire-tv'
    },
    'volume_down': {
        command: 'volume_down',
        icon: faVolumeDown,
        btnClass: 'secondary w-100'
    },
    'volume_mute': {
        command: 'volume_mute',
        icon: faVolumeMute,
        btnClass: 'secondary w-100'
    },
    'volume_up': {
        command: 'volume_up',
        icon: faVolumeUp,
        btnClass: 'secondary w-100'
    },
    'sleep': {
        command: 'volume_up',
        icon: faBed,
        btnClass: 'secondary w-100'
    }
}

export const TVButtons = {
  'back': {
      command: 'back',
      icon: faArrowLeft,
      btnClass: 'secondary w-100'
  },
  'cc': {
      command: 'cc',
      icon: faEllipsisH,
      btnClass: 'secondary w-100'
  },
  'channel_down': {
      command: 'channel_down',
      icon: faChevronDown,
      btnClass: 'secondary w-100'
  },
  'channel_up': {
      command: 'channel_up',
      icon: faChevronUp,
      btnClass: 'secondary w-100'
  },
  'dash': {
      command: 'dash',
      icon: faMinus,
      btnClass: 'secondary w-100'
  },
  'down': {
      command: 'down',
      icon: faChevronDown,
      btnClass: 'primary'
  },
  'info': {
      command: 'info',
      icon: faInfo,
      btnClass: 'secondary w-100'
  },
  'enter': {
      command: 'enter',
      icon: faCheck,
      btnClass: 'primary'
  },
  'forward': {
      command: 'fastforward',
      icon: faForward,
      btnClass: 'secondary w-100'
  },
  'home': {
      command: 'home',
      icon: faHome,
      btnClass: 'secondary w-100'
  },
  'left': {
      command: 'left',
      icon: faChevronLeft,
      btnClass: 'primary'
  },
  'play': {
      command: 'play',
      icon: faPlay,
      secondaryIcon: faPause,
      btnClass: 'secondary w-100'
  },
  'power': {
      command: 'power',
      icon: faPowerOff,
      btnClass: 'secondary w-100'
  },
  'reverse': {
      command: 'rewind',
      icon: faBackward,
      btnClass: 'secondary w-100'
  },
  'right': {
      command: 'right',
      icon: faChevronRight,
      btnClass: 'primary'
  },
  'settings': {
      command: 'menu',
      icon: faCog,
      btnClass: 'secondary w-100'
  },
  'up': {
      command: 'up',
      icon: faChevronUp,
      btnClass: 'primary'
  },
  'volume_down': {
      command: 'volume_down',
      icon: faMinus,
      btnClass: 'secondary w-100'
  },
  'mute': {
      command: 'mute',
      icon: faVolumeMute,
      btnClass: 'secondary w-100'
  },
  'volume_up': {
      command: 'volume_up',
      icon: faPlus,
      btnClass: 'secondary w-100'
  },
  '0': {
    command: 'num_0',
    text: '0',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '1': {
    command: 'num_1',
    text: '1',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '2': {
    command: 'num_2',
    text: '2',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '3': {
    command: 'num_3',
    text: '3',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '4': {
    command: 'num_4',
    text: '4',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '5': {
    command: 'num_5',
    text: '5',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '6': {
    command: 'num_6',
    text: '6',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '7': {
    command: 'num_7',
    text: '7',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '8': {
    command: 'num_8',
    text: '8',
    icon: null,
    btnClass: 'secondary w-100'
  },
  '9': {
    command: 'num_9',
    text: '9',
    icon: null,
    btnClass: 'secondary w-100'
  }
}

const _nonFunctioningKeys = [
  "{tab}",
  "Tab",
  "NumLock",
  "CapsLock",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "Insert",
  "Delete",
  "Control",
  "Shift"
]

const _arrowKeys = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right'
};

const _mediaBtns = {
    'Home': 'play',
    'End': 'info',
    'PageUp': 'reverse',
    'PageDown': 'forward'
};

export const rokuKeyboard = (
    api: DeviceApi,
    literal: string,
    device: Device
) => {
    let value: string;

    if (literal === "{enter}" || literal === "Enter") {
        api.roku(
          device.id,
          'select'
        ).subscribe();
    } else if (literal === "{space}") {
    value = ' ';
    } else if (_nonFunctioningKeys.includes(literal)) {

    } else if (literal === "{bksp}" || literal === 'Backspace' ) {
        api.roku(
            device.id,
            'backspace'
        ).subscribe();
    } else if (literal === 'Escape' ) {
      api.roku(
          device.id,
          'back'
      ).subscribe();
    } else if (literal === 'Alt' ) {
      api.roku(
          device.id,
          'home'
      ).subscribe();
    } else if (Object.keys(_arrowKeys).includes(literal) ) {
      api.roku(
          device.id,
          _arrowKeys[literal]
      ).subscribe();
    } else if (Object.keys(_mediaBtns).includes(literal) ) {
        let btnKey = _mediaBtns[literal]
        let command = RokuButtons[btnKey].command
        api.roku(
            device.id,
            command
        ).subscribe();
    } else {
        value = literal;
    };

    if (value) {
        api.roku(
            device.id,
            'literal',
            value
        ).subscribe();
    }
}

export const firetvKeyboard = (
    api: DeviceApi,
    literal: string,
    device: Device
) => {
    let value: string;
    if (literal === "{enter}" || literal === "Enter") {
        api.firetv(
          device.id,
          'enter'
        ).subscribe();
    } else if (literal === "{space}" || literal === " ") {
        value = '%s';
    } else if (_nonFunctioningKeys.includes(literal)) {

    } else if (literal === "`") {
        api.firetv(
            device.id,
            'grave'
        ).subscribe();
    } else if (literal === "\\") {
        api.firetv(
            device.id,
            'backslash'
        ).subscribe();
    } else if (literal === "{bksp}" || literal === "Backspace") {
        api.firetv(
            device.id,
            'backspace'
        ).subscribe();
    } else if (literal === 'Alt' ) {
        api.firetv(
            device.id,
            'home'
        ).subscribe();
    } else if (Object.keys(_arrowKeys).includes(literal) ) {
        api.firetv(
            device.id,
            _arrowKeys[literal]
        ).subscribe();
    } else if (Object.keys(_mediaBtns).includes(literal) ) {
        let btnKey = _mediaBtns[literal]
        let command = FireTVButtons[btnKey].command
        api.roku(
            device.id,
            command
        ).subscribe();
    } else if (typeof literal === 'number') {
      console.log('here', literal)
    } else {
        value = literal;
    };

    if (value) {
        api.firetv(
            device.id,
            'keyboard',
            value
        ).subscribe();
    }
}

export const computerKeyboard = (
    api: KeyboardApi,
    literal: string,
    device: Device,
    onSuccess
) => {
    let value: string;
    if (literal.includes("{enter}")) {
        value = literal.replace("{enter}", "enter");
    } else if (literal.includes("{space}")) {
        value = literal.replace("{space}", "space");
    } else if (literal.includes("{tab}")) {
        value = literal.replace("{tab}", "tab");
    } else if (literal === "+" || literal === "shift++") {
        value = '+'
    } else if (literal === "`") {
        value="`"
    } else if (literal === "\\") {
        value = "\\"
    } else if (literal === "@") {
        value = "shift+@"
    } else if (literal.includes("{bksp}")) {
        value = literal.replace("{bksp}", "backspace");
    } else if (literal.includes("{esc}")) {
        value = literal.replace("{esc}", "esc");
    } else if (literal.includes("{f")) {
        value = literal.replace("{f", "F").replace("}", "");
    } else if (literal.length > 1) {
        value = value.toLowerCase()
    } else {
        value = literal;
    };

    if (value) {
        api.keyboard(
            device,
            value,
        ).subscribe({
            next: data => {
                onSuccess()
            }
        });
    }
}
