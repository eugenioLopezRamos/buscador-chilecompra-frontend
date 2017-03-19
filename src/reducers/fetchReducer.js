import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export default function fetchReducer(state = initialState.searchResults, action){

    switch(action.type) {
        case types.FETCH_CHILECOMPRA_DATA_SUCCESS:
            return action.data;

        case types.FETCH_CHILECOMPRA_DATA_FAILURE:
        console.log("ACTION", action)
            return action.error;
            //maybe will enable them later (if I make client side sorting work)
        // case types.REORDER_CHILECOMPRA_DATA_SUCCESS:
        //     return objectAssign({}, state, action.data);
        // case types.REORDER_RESULTS_FRONTEND_SUCCESS:
        //     return action.data;
        // case types.REORDER_RESULTS_FRONTEND_FAILURE:
        //     return state;

        default:
            return state;

    }
}