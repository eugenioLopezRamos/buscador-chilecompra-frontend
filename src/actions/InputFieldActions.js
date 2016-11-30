import * as types from './actionTypes';

export const autoFillerInput = (value) => {

    return {type: types.AUTOFILLER_INPUT, value}

}

export const dateFieldSelect = (value) => {

    return {type: types.DATE_FIELD_SELECT, value}

}

export const searchFieldInput = (value) => {

    return {type: types.SEARCH_FIELD_INPUT, value}

}

export const selectionFieldSelect = (event) => {

    return {type: types.SELECTION_FIELD_SELECT, value: event.target.value}

}

export const RUTInput = (event) => {

    return {type: types.RUT_INPUT, value: event.target.value }

}

export const pickOrganismoPublico = (event) => {
    
    return {type: types.PICK_ORGANISMO_PUBLICO, value: event.target.value }

}