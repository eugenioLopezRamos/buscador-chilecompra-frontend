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

export const selectionFieldSelect = (value) => {
    return {type: types.SELECTION_FIELD_SELECT, value}
}

