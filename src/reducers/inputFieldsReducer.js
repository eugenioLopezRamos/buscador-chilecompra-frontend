import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export default function InputFieldsReducer(state = initialState.inputFieldValues, action) {

    switch(action.type) {
        case types.AUTOFILLER_INPUT:
            return objectAssign({}, state, { organismosPublicosFilter: action.value } );

        case types.DATE_FIELD_SELECT:
            return objectAssign({}, state, { date: action.value });
        
        case types.SEARCH_FIELD_INPUT:
            return objectAssign({}, state, { palabrasClave: action.value });

        case types.SELECTION_FIELD_SELECT:
            return objectAssign({}, state, { seleccionEstadoLicitacion: action.value });

        default:
            return state;

    }

}

