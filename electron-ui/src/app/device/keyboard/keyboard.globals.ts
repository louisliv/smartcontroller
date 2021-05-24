import { 
    faVolumeDown, 
    faVolumeUp, 
    faVolumeMute,
    faPlay,
    faPause,
    faStop,
    faStepForward,
    faStepBackward
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