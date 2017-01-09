import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';


export function showNavbarReducer(state = initialState.showNavbar, action) {
    switch(action.type) {
        case types.TOGGLE_VISIBILITY:
        return !state;
        
        case types.NAVBAR_OFF:
            return false;

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return false;
        
        case types.USER_LOGOUT_SUCCESS:
            return false;

        default:
            return state;
    };
};

export function searchTypeReducer(state = initialState.searchType, action) {
    switch(action.type) {
        case types.CHANGE_SEARCH_TYPE:
            return action.value;
        default: 
            return state;
    };
};