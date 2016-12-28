import initialState from './initialState';
import objectAssign from 'object-assign';
import * as types from '../actions/actionTypes';

export const userSearchesReducer = (state = initialState.userSearches, action) => {
    let newState = objectAssign({}, state);

    switch(action.type) {
        case types.USER_GET_SEARCHES_SUCCESS:
            return objectAssign({}, newState, initialState.userSearches);
        case types.USER_GET_SEARCHES_FAILURE:
            return objectAssign({}, newState, initialState.userSearches);
        case types.USER_UPDATE_SEARCHES_SUCCESS:
            return objectAssign({}, newState, initialState.userSearches);
        case types.USER_UPDATE_SEARCHES_FAILURE:
            return objectAssign({}, newState, initialState.userSearches);
        case types.USER_DELETE_SEARCHES_SUCCESS:
            return objectAssign({}, newState, initialState.userSearches);
        case types.USER_DELETE_SEARCHES_FAILURE:
            return objectAssign({}, newState, initialState.userSearches);
        default:
            return state;
    }
}