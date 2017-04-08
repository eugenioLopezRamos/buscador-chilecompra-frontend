    // organismosPublicos: {"1": "No hay organismos públicos disponibles en este momento"},
    // codigosLicitacion: {"1": "No hay códigos disponibles en este momento"},

import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

// export const FETCH_ORGANISMOS_PUBLICOS_SUCCESS = 'FETCH_ORGANISMOS_PUBLICOS_SUCCESS';
// export const FETCH_ORGANISMOS_PUBLICOS_FAILURE = 'FETCH_ORGANISMOS_PUBLICOS_FAILURE';
// export const FETCH_ESTADOS_LICITACION_SUCCESS = 'FETCH_ESTADOS_LICITACION_SUCCESS';
// export const FETCH_ESTADOS_LICITACION_FAILURE = 'FETCH_ESTADOS_LICITACION_FAILURE';

export default function onLoadFetchEstLicReducer(state = initialState.estadosLicitacion, action){
    switch(action.type) {
        case types.FETCH_ESTADOS_LICITACION_SUCCESS:
            return objectAssign({}, state, action.value);
        
        case types.FETCH_ESTADOS_LICITACION_FAILURE:
            return state;
            
        default:
            return state;

    }
}
