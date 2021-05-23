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
    faCheck
} from '@fortawesome/free-solid-svg-icons';

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
