import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';


export function showNavbarReducer(state = initialState.showNavbar, action) {
    switch(action.type) {
        case types.TOGGLE_VISIBILITY:
            return !state;
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