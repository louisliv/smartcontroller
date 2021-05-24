import {api} from 'api/api.js';

var Nodes = api.createModel('nodes');

Nodes.powerOff = (nodeId) => {
    Nodes.getAll({}, nodeId + '/power_off')
}

Nodes.togglePower = (nodeId) => {
    Nodes.getAll({}, nodeId + '/toggle_power')
}

export default Nodes;