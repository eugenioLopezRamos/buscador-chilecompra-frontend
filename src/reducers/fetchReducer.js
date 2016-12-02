import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fetchReducer(state = initialState.searchResults, action){
    switch(action.type) {
        case types.FETCH_CHILECOMPRA_DATA_SUCCESS:
           // let newState;
            // newState = Object.assign({}, state, {test: action.test});
            // return newState;
            return action.data
        default:
            return state

    }
}