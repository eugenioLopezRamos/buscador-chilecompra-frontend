import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';
import moment from 'moment';

export default function searchQueryValuesReducer(state = initialState.searchQueryValues, action) {

    switch(action.type) {
        
        case types.FETCH_CHILECOMPRA_DATA_SUCCESS:
            return objectAssign({}, state, action.query);
        case types.FETCH_CHILECOMPRA_DATA_FAILURE:
            return objectAssign({}, state, action.query);

        case types.ONLOAD_FETCH_ORG_PUB_SUCCESS:
            return objectAssign({}, state, {organismosPublicosFilteredSubset: action.value});


        default:
            return state;

    }

}

