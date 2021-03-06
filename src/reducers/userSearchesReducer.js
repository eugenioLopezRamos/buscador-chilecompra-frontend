import initialState from './initialState';
import objectAssign from 'object-assign';
import * as types from '../constants/actionTypes';

export const userSearchesReducer = (state = initialState.userSearches, action) => {
   // let newState = objectAssign({}, state);

    switch(action.type) {

        case types.INITIAL_USER_DATA_LOAD_SUCCESS:
            return objectAssign({}, state, action.data.searches);

        case types.USER_GET_SEARCHES_SUCCESS:
            return objectAssign({}, state, action.value.searches);

        case types.USER_GET_SEARCHES_FAILURE:
            return state;

        case types.USER_CREATE_SEARCHES_SUCCESS:
            return objectAssign({}, state, action.value.searches);

        case types.USER_CREATE_SEARCHES_FAILURE:
            return state;

        case types.USER_UPDATE_SEARCHES_SUCCESS:
            return action.value.searches;

        case types.USER_UPDATE_SEARCHES_FAILURE:
            return state;

        case types.USER_DELETE_SEARCHES_SUCCESS:
            return action.value.searches;

        case types.USER_DELETE_SEARCHES_FAILURE:
            return state;
            
        case types.USER_LOGOUT_SUCCESS:
            return initialState.userSearches;

        default:
            return state;
    }
};