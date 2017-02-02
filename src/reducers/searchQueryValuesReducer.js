import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';
import moment from 'moment';

export default function searchQueryValuesReducer(state = initialState.searchQueryValues, action) {

    switch(action.type) {
        case types.AUTOFILLER_INPUT:
            return objectAssign({}, state, { organismosPublicosFilter: action.value } );

        case types.SET_SEARCH_START_DATE:
            let startDate = action.value;//._isValid ? action.value : ""; 
            return objectAssign({}, state, {startDate});

        case types.TOGGLE_DATE_ALWAYS_FROM_TODAY:
            if(action.value) {
                return objectAssign({}, state, {startDate: Object.freeze(moment()), 
                                                endDate:Object.freeze(moment()), 
                                                alwaysFromToday: action.value,
                                                alwaysToToday: action.value});
            } 
            return objectAssign({}, state, {alwaysFromToday: action.value})

        case types.SET_SEARCH_END_DATE:
            let endDate = action.value;//._isValid ? action.value : "";
            return objectAssign({}, state, {endDate});   

        case types.TOGGLE_DATE_ALWAYS_TO_TODAY:
            if(action.value) {
                return objectAssign({}, state, {endDate: Object.freeze(moment()), alwaysToToday: action.value})    
            }
            return objectAssign({}, state, {alwaysToToday: action.value})
        
        case types.SEARCH_FIELD_INPUT:
            return objectAssign({}, state, { palabrasClave: action.value });

        case types.SELECTION_FIELD_SELECT:
            return objectAssign({}, state, { selectedEstadoLicitacion: action.value });
            
        case types.RUT_INPUT:
            return objectAssign({}, state, { rutProveedor: action.value })

        case types.PICK_ORGANISMO_PUBLICO:
            return objectAssign({}, state, { selectedOrganismoPublico: action.value })
        
        case types.COD_LIC_INPUT_CHANGE:
            return objectAssign({}, state, { codigoLicitacion: action.value })
        
        case types.AUTOFILLER_INPUT_CHANGE:
            return objectAssign({}, state, { organismosPublicosFilter: action.value, 
                                             selectedOrganismoPublico: action.defaultSelectedValue,
                                             organismosPublicosFilteredSubset: action.selectionResults});

        case types.ONLOAD_FETCH_ORG_PUB_SUCCESS:
            return objectAssign({}, state, {organismosPublicosFilter: ""}, {organismosPublicosFilteredSubset: action.value});

        default:
            return state;

    }

}

