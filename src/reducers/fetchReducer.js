import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export default function fetchReducer(state = initialState.searchResults, action){
  //  let newState = state;
    switch(action.type) {
        case types.FETCH_CHILECOMPRA_DATA_SUCCESS:
            return action.data;

        case types.FETCH_CHILECOMPRA_DATA_FAILURE:
            console.log("action error", action);
            return action.error;

        default:
            return state;

    }
}