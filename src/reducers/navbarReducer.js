import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';


export default function navbarReducer(state = initialState.showNavbar, action) {
    switch(action.type) {
        case types.TOGGLE_VISIBILITY:
            return !state;
        default:
            return state;
    };
};