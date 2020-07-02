import {api} from 'api/api.js';

var Devices = api.createModel('devices');

Devices.powerOn = (deviceId) => {
    Devices.getAll({}, deviceId + '/power_on')
}

Devices.powerOff = (deviceId) => {
    Devices.getAll({}, deviceId + '/power_off')
}

Devices.discover = () => {
    return Devices.getAll({}, 'discover')
}

Devices.changeColor = (deviceId, color) => {
    Devices.post({color:color}, deviceId + '/change_color')
}

Devices.changeBrightness = (deviceId, brightness) => {
    Devices.post({brightness:brightness}, deviceId + '/change_brightness')
}

export default Devices;