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
            return objectAssign({}, state, { selectedEstadoLicitacion: action.value });
        case types.RUT_INPUT:
            return objectAssign({}, state, { rutProveedor: action.value })

        case types.PICK_ORGANISMO_PUBLICO:
            return objectAssign({}, state, { selectedOrganismoPublico: action.value })
        
        case types.COD_LIC_INPUT_CHANGE:
            return objectAssign({}, state, { codigoLicitacion: action.value })
        
        case types.AUTOFILLER_INPUT_CHANGE:
        console.log("state", store.getState().organismosPublicos);

        let selectionResults = [];
        let defaultSelectedValue = "";
        let defaultValue = "";
        let testRegex = new RegExp(action.value.toLowerCase());
        
        selectionResults = store.getState().organismosPublicos.filter( (e, i) => {

            let key = Object.keys(e)[0];
            if(i === 0) {
                defaultValue = key;
            }

            if(testRegex.test(e[key].toLowerCase())) {
                return e[key];
            }
        })

        defaultSelectedValue = Object.keys(selectionResults[0])[0];
        //action.selectedOrganismoPublico 
        return objectAssign({}, 
                            state, { organismosPublicosFilter: action.value, 
                                        selectedOrganismoPublico: defaultSelectedValue,
                                        organismosPublicosFilteredSubset: selectionResults})

        default:
            return state;

    }

}

