import _ from 'lodash';

import NodeApi from 'api/models/nodes';

import {store} from 'index';
import { transformToObject } from "store/utils";

const ACTION_CONSTANTS = {
    NODES_GET_ALL_SUCCESS: 'NODES_GET_ALL_SUCCESS',
    NODES_GET_ALL_FAIL: 'NODES_GET_ALL_FAIL',

    NODES_GET_SUCCESS: 'NODES_GET_SUCCESS',
    NODES_GET_FAIL: 'NODES_GET_FAIL',

    NODES_ADD_SUCCESS: 'NODES_ADD_SUCCESS',
    NODES_ADD_FAIL: 'NODES_ADD_FAIL',
}

let NodeActions = {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.nodes.listHasFetched) {
            return store.dispatch({
                type: ACTION_CONSTANTS.NODES_GET_ALL_SUCCESS,
                payload: currentStore.nodes.raw
            })
        }

        return NodeApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.NODES_GET_ALL_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.NODES_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.nodes.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.NODES_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return NodeApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.NODES_GET_SUCCESS,
                    payload: response
                })
            })
            .catch((message) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.NODES_GET_FAIL
                })
            })
    },
    create: (data) => {
        return NodeApi.post(data)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.NODES_ADD_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.NODES_ADD_FAIL
                })
            })
    },
}

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
};

function nodeReducer(state = initialState, action) {
    let newById;
    switch (action.type) {
        case ACTION_CONSTANTS.NODES_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true,
            })
        case ACTION_CONSTANTS.NODES_GET_SUCCESS:
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
        case ACTION_CONSTANTS.NODES_ADD_SUCCESS:
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

let NodeSelectors = {
    one: (nodes, id) => {
        return nodes.byId[id] ? nodes.byId[id] : {}
    },
    list: (nodes) => {
        return nodes.raw
    },
};

export {
    ACTION_CONSTANTS,
    NodeActions,
    nodeReducer,
    NodeSelectors
}