import { 
    faVolumeDown, 
    faVolumeUp, 
    faVolumeMute,
    faPlay,
    faPause,
    faStop,
    faStepForward,
    faStepBackward,
    faArrowDown,
    faArrowUp,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export const MediaButtons = [
    {
        command: "voldown",
        icon: faVolumeDown
    },
    {
        command: "volup",
        icon: faVolumeUp
    },
    {
        command: "mute",
        icon: faVolumeMute
    },
    {
        command: "playpause",
        icon: faPlay,
        secondaryIcon: faPause
    },
    {
        command: "stop",
        icon: faStop
    },
    {
        command: "previous",
        icon: faStepBackward
    },
    {
        command: "next",
        icon: faStepForward
    },
]

export const ExtraButtons = [
    {
        command: "insert",
        text: "Ins"
    },
    {
        command: "del",
        text: 'Del'
    },
    {
        command: "home",
        text: 'Home'
    },
    {
        command: "pgup",
        text: 'Pg Up',
    },
    {
        command: "pgdn",
        text: 'Pg Dn'
    },
    {
        command: "end",
        text: 'End'
    }
]

export const DButtons = {
    'up': {
        command: "up",
        icon: faArrowUp
    },
    'down': {
        command: "down",
        icon: faArrowDown
    },
    'left': {
        command: "left",
        icon: faArrowLeft
    },
    'right': {
        command: "right",
        icon: faArrowRight
    }
}

export const keyboardOptions = {
    theme: "hg-theme-default dark-keyboard",
    layout: {
        'default': [
            '{esc} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o p [ ] \\',
            '{lock} a s d f g h j k l ; \' {enter}',
            '{shift} z x c v b n m , . / {shift}',
            '{ctrl} {alt} @ {space} {alt} {ctrl}'
        ],
        'shift': [
            '{esc} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
            '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{lock} A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M < > ? {shift}',
            '{ctrl} {alt} @ {space} {alt} {ctrl}'
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