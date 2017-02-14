import * as types from '../constants/actionTypes';
//TODO: Need to make the (value) or (event) value more consistent
// eg autoFillerInput is (value) => {type: ...., value}
// whereas RUTInput is (event) => {type: ..., value: event.target.value} <- inconsistent

export const autoFillerInput = (value) => {

    return {type: types.AUTOFILLER_INPUT, value};

}

export const setStartDate = (value) => {

    return {type: types.SET_SEARCH_START_DATE, value};

}

export const toggleDateAlwaysFromToday = (value) => {
    return {type: types.TOGGLE_DATE_ALWAYS_FROM_TODAY, value}
}

export const setEndDate = (value) => {
    return {type: types.SET_SEARCH_END_DATE, value}
}

export const toggleDateAlwaysToToday = (value) => {
    return {type: types.TOGGLE_DATE_ALWAYS_TO_TODAY, value}
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

export const sortResultsInFrontend = (results, field, order) => {
 //TODO: This works...but the results are not stable so it looks really weird
    // results = [
                //     {
                //         id: xxxx, value: {
                //                           FechaCreacion: yyyy,
                //                           Listado: [
                //                                     0: {
                //                                         CodigoExterno: zzzzz
                //                                        }
                //                                     ]....
                //                             }
                //     },
                //     {id: vvvvv, ....etc},
                //     {id: qqqq, ...},
                //     ...etc
                //  ]
   // field = ["Listado", 0, "CodigoExterno"]
   // order = "ascending" || "descending"
   if(order != "ascending" && order != "descending") {
       alert("Orden inválido");
       return {type: types.REORDER_RESULTS_FRONTEND_FAILURE}
   }

   let getFieldValues = results.values.map(singleResult => {

        let fieldValue = field.reduce((resultValue, keyToAccess) => {

            return resultValue[keyToAccess];

        }, singleResult.value);

        return {id: singleResult.id, value: fieldValue}
   });



   if(order === "ascending") {
        getFieldValues.sort((a, b) => {
                return a.value.localeCompare(b.value);
            });
   }
   else if(order === "descending") {
        getFieldValues.sort((a, b) => {
                return b.value.localeCompare(a.value);
            });  
   }


   let sortedValues = getFieldValues.reduce((sorted, currentResult) => {
        //TODO: this is VERY redundant - But since it is a small amount of records
        // Im not sure if it's worth it to do something more sophisticated
        let correspondingValue = results.values.filter((result) => {
            return result.id === currentResult.id
        });
        return sorted.concat(correspondingValue)
   }, []);

   return {type: types.REORDER_RESULTS_FRONTEND_SUCCESS,
           data: {
                    values: sortedValues,
                    count: results.count,
                    limit: results.limit,
                    offset: results.offset
                 }
          }

}