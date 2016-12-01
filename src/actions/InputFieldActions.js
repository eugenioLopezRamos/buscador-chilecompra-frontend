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
    console.log("picked value", event.target.value);
    //^ setting evt.target.value doesnt work correctly, however that's work that's already done in the older/bad (but still working!)
    //version of the app. So, I'll adapt the code later.
    return {type: types.PICK_ORGANISMO_PUBLICO, value: event.target.value }

}

export const codigoLicitacionInputChange = (event) => {

    return {type: types.COD_LIC_INPUT_CHANGE, value: event.target.value }
    
}

export const autoFillerInputChange = (value) => {
    // y event deberia pasar a ser el valor solamente en vez del evento en si
    // selected vendria a ser la option[0] o bien el que se seleccione a mano (por lo cual se podría eliminar esa otra acción)
    // ...Change = (event, subArray) => {

    // }


    return {type: types.AUTOFILLER_INPUT_CHANGE, value }
}

                                // onSelectionChange={this.props.actions.pickOrganismoPublico}
                                // onInputChange={this.props.actions.autoFillerInputChange}