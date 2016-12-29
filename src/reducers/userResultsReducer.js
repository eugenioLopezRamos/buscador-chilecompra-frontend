import initialState from './initialState';
import objectAssign from 'object-assign';
import * as types from '../actions/actionTypes';

export const userResultsReducer = (state = initialState.userResults, action) => {
    let newState = objectAssign({}, state)
    switch(action.type) {
        case types.USER_GET_RESULTS_SUCCESS:
        console.log("action", action)
            return objectAssign({}, newState, {fetched: action.value});
        case types.USER_GET_RESULTS_FAILURE:
        console.log("here")
            return objectAssign({}, newState, initialState.userResults);
        case types.USER_UPDATE_RESULTS_SUCCESS:
            return objectAssign({}, newState, initialState.userResults);
        case types.USER_UPDATE_RESULTS_FAILURE:
            return objectAssign({}, newState, initialState.userResults);
        case types.USER_DELETE_RESULTS_SUCCESS:
            return objectAssign({}, newState, initialState.userResults);
        case types.USER_DELETE_RESULTS_FAILURE:
            return objectAssign({}, newState, initialState.userResults);
        default:
            return state;
    }
}