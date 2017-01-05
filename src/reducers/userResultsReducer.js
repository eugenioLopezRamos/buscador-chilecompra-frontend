import initialState from './initialState';
import objectAssign from 'object-assign';
import * as types from '../actions/actionTypes';

export const userResultsReducer = (state = initialState.userResults, action) => {
    let newState = objectAssign({}, state)
    switch(action.type) {
        
        case types.USER_GET_RESULTS_SUCCESS:
            return objectAssign({}, newState, {fetched: action.value});

        case types.USER_GET_RESULTS_FAILURE:
            return objectAssign({}, newState, initialState.userResults);
        
        // USER_CREATE... doesnt case here since it only returns a message, that goes into the messages reducer

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