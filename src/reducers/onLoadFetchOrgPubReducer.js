import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function onLoadFetchOrgPubReducer(state = initialState.organismosPublicos, action){
    
    switch(action.type) {
        case types.FETCH_ORGANISMOS_PUBLICOS_SUCCESS:
            return action.value;

        default:
            return state;

    }
}
