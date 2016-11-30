import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export default function onLoadFetchOrgPubReducer(state = initialState.organismosPublicos, action){
    switch(action.type) {
        case types.ONLOAD_FETCH_ORG_PUB_SUCCESS:
            return objectAssign({}, state, action.value )
        default:
            return state

    }
}
