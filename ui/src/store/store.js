import {nodeReducer} from './nodes';
import {deviceReducer} from './devices';

function appStore(state = {}, action) {
    return {
        nodes: nodeReducer(state.nodes, action),
        devices: deviceReducer(state.devices, action),
    }
}

export default appStore;