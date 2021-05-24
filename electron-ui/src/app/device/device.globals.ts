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
    faMicrophone
} from '@fortawesome/free-solid-svg-icons';

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

export const rokuKeyboard = (
    api: DeviceApi, 
    literal: string, 
    device: Device
) => {
    let value: string;

    if (literal === "{enter}") {
        api.roku(
          device.id,
          'select'
        ).subscribe();
    } else if (literal === "{space}") {
    value = ' ';
    } else if (literal === "{tab}") {

    } else if (literal === "{bksp}") {
        api.roku(
            device.id,
            'backspace'
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
    if (literal === "{enter}") {
        api.firetv(
          device.id,
          'enter'
        ).subscribe();
    } else if (literal === "{space}") {
        value = '%s';
    } else if (literal === "{tab}") {
        
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
    } else if (literal === "{bksp}") {
        api.firetv(
            device.id,
            'backspace'
        ).subscribe();
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
    device: Device
) => {
    let value: string;
    if (literal.includes("{enter}")) {
        value = 'enter'
    } else if (literal.includes("{space}")) {
        value = 'space';
    } else if (literal.includes("{tab}")) {
        value = 'tab'
    } else if (literal === "+" || literal === "shift++") {
        value = '+'
    } else if (literal === "`") {
        value="`"
    } else if (literal === "\\") {
        value = "\\"
    } else if (literal === "@") {
        value = "shift+@"
    } else if (literal.includes("{bksp}")) {
        value = 'backspace'
    } else {
        value = literal;
    };

    if (value) {
        api.keyboard(
            device,
            value,
        ).subscribe();
    }
}