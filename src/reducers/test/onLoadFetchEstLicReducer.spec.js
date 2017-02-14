    // organismosPublicos: {"1": "No hay organismos públicos disponibles en este momento"},
    // codigosLicitacion: {"1": "No hay códigos disponibles en este momento"},

import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

// export const ONLOAD_FETCH_ORG_PUB_SUCCESS = 'ONLOAD_FETCH_ORG_PUB_SUCCESS';
// export const ONLOAD_FETCH_ORG_PUB_FAILURE = 'ONLOAD_FETCH_ORG_PUB_FAILURE';
// export const ONLOAD_FETCH_EST_LIC_SUCCESS = 'ONLOAD_FETCH_EST_LIC_SUCCESS';
// export const ONLOAD_FETCH_EST_LIC_FAILURE = 'ONLOAD_FETCH_EST_LIC_FAILURE';

export default function onLoadFetchEstLicReducer(state = initialState.estadosLicitacion, action){
    switch(action.type) {
        case types.ONLOAD_FETCH_EST_LIC_SUCCESS:
            return objectAssign({}, state, action.value )
        default:
            return state

    }
}
