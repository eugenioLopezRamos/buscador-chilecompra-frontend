import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fetchReducer(state = initialState.searchResults, action){
    switch(action.type) {
        case types.FETCH_CHILECOMPRA_DATA_SUCCESS:
            return action.data;

        case types.FETCH_CHILECOMPRA_DATA_FAILURE:
            return action.error;

        default:
            return state;

    }
}