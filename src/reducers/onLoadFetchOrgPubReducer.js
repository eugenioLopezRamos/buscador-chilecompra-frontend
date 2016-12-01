import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export default function onLoadFetchOrgPubReducer(state = initialState.organismosPublicos, action){
    switch(action.type) {
        case types.ONLOAD_FETCH_ORG_PUB_SUCCESS:

            let toArray = Object.keys(action.value).map (e => {
                let newObj = {};
                newObj[e] = action.value[e];
                return newObj;
            }) 

            //return objectAssign({}, state, toArray) // hard to use since I need to filter them before rendering
            return toArray;
        default:
            return state

    }
}
