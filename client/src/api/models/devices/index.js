import {api} from 'api/api.js';

var Devices = api.createModel('devices');

Devices.powerOn = (deviceId) => {
    Devices.getAll({}, deviceId + '/power_on')
}

Devices.powerOff = (deviceId) => {
    Devices.getAll({}, deviceId + '/power_off')
}

export default Devices;