import * as types from './actionTypes';

//TODO: Need to make the (value) or (event) value more consistent
// eg autoFillerInput is (value) => {type: ...., value}
// whereas RUTInput is (event) => {type: ..., value: event.target.value} <- inconsistent

export const autoFillerInput = (value) => {

    return {type: types.AUTOFILLER_INPUT, value};

}

export const dateFieldSelect = (value) => {

    return {type: types.DATE_FIELD_SELECT, value};

}

export const searchFieldInput = (value) => {

    return {type: types.SEARCH_FIELD_INPUT, value};

}

export const selectionFieldSelect = (event) => {

    return {type: types.SELECTION_FIELD_SELECT, value: event.target.value};

}

export const RUTInput = (event) => {

    return {type: types.RUT_INPUT, value: event.target.value };

}

export const pickOrganismoPublico = (event) => {
    return {type: types.PICK_ORGANISMO_PUBLICO, value: event.target.value };
}

export const codigoLicitacionInputChange = (event) => {
    return {type: types.COD_LIC_INPUT_CHANGE, value: event.target.value };
}

export const autoFillerInputChange = (organismosPublicos, value) => {

    let selectionResults = [];
    let defaultSelectedValue = "";
    let testRegex = new RegExp(value.toLowerCase());
    selectionResults = organismosPublicos.filter((e, i) => {

        let key = Object.keys(e)[0]; // O sea que en el objeto {"1337": "Ministerio del interior"}, key === "1337"

        if(testRegex.test(e[key].toLowerCase())) {
            return e[key]; // Y aqui retorna el nombre ("Ministerio del interior")
        }
    })

    if(selectionResults[0]) {
        defaultSelectedValue = Object.keys(selectionResults[0])[0];
    }

    return {type: types.AUTOFILLER_INPUT_CHANGE, 
            value,
            defaultSelectedValue, 
            selectionResults
            };
}