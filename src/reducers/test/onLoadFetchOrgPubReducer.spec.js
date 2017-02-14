import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export default function onLoadFetchOrgPubReducer(state = initialState.organismosPublicos, action){
    let newState = {};

    switch(action.type) {
        case types.ONLOAD_FETCH_ORG_PUB_SUCCESS:
            // let organismos = {};
            // let toArray = Object.keys(action.value).map (e => {
            //     return organismos[e] = action.value[e];
            // }) 
            // toArray.unshift({"*": "Todos"});
            // //return objectAssign({}, state, toArray) // hard to use since I need to filter them before rendering
            // return toArray; //newState was not needed in this case
            return action.value;

        default:
            return state

    }
}
