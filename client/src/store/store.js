import {nodeReducer} from './nodes';

function appStore(state = {}, action) {
    return {
        // currentState: currentStateReducer(state.currentState, action),
        // currentUser: authReducer(state.currentUser, action),
        nodes: nodeReducer(state.nodes, action),
        // systems: systemReducer(state.systems, action),
        // myGames: myGameReducer(state.myGames, action),
        // rooms: roomReducer(state.rooms, action),
        // notifications: notificationReducer(state.notifications, action)
    }
}

export default appStore;