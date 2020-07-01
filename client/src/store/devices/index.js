import _ from 'lodash';

import DeviceApi from 'api/models/devices';

import {store} from 'index';
import { transformToObject } from "store/utils";

const ACTION_CONSTANTS = {
    DEVICES_GET_ALL_SUCCESS: 'DEVICES_GET_ALL_SUCCESS',
    DEVICES_GET_ALL_FAIL: 'DEVICES_GET_ALL_FAIL',

    DEVICES_GET_SUCCESS: 'DEVICES_GET_SUCCESS',
    DEVICES_GET_FAIL: 'DEVICES_GET_FAIL',

    DEVICES_ADD_SUCCESS: 'DEVICES_ADD_SUCCESS',
    DEVICES_ADD_FAIL: 'DEVICES_ADD_FAIL',
}

let DeviceActions = {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.devices.listHasFetched) {
            return store.dispatch({
                type: ACTION_CONSTANTS.DEVICES_GET_ALL_SUCCESS,
                payload: currentStore.devices.raw
            })
        }

        return DeviceApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.DEVICES_GET_ALL_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.DEVICES_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.devices.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.DEVICES_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return DeviceApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.DEVICES_GET_SUCCESS,
                    payload: response
                })
            })
            .catch((message) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.DEVICES_GET_FAIL
                })
            })
    },
    create: (data) => {
        return DeviceApi.post(data)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.DEVICES_ADD_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.DEVICES_ADD_FAIL
                })
            })
    },
}

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
};

function deviceReducer(state = initialState, action) {
    let newById;
    switch (action.type) {
        case ACTION_CONSTANTS.DEVICES_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true,
            })
        case ACTION_CONSTANTS.DEVICES_GET_SUCCESS:
            if (state.listHasFetched && state.byId[action.payload]) {
                return state
            }

            newById = _.clone(state.byId);
            newById[action.payload.id] = action.payload;

            return Object.assign({}, state, {
                raw: [...state.raw, action.payload],
                byId: newById,
                listHasFetched: state.listHasFetched,
            })
        case ACTION_CONSTANTS.DEVICES_ADD_SUCCESS:
            newById = _.clone(state.byId);
            newById[action.payload.id] = action.payload;

            return Object.assign({}, state, {
                raw: [...state.raw, action.payload],
                byId: newById,
                listHasFetched: state.listHasFetched,
            })
        default:
            return state;
    }
}

let DeviceSelectors = {
    one: (devices, id) => {
        return devices.byId[id] ? devices.byId[id] : {}
    },
    list: (devices) => {
        return devices.raw
    },
};

export {
    ACTION_CONSTANTS,
    DeviceActions,
    deviceReducer,
    DeviceSelectors
}