
class fetchApi {

    static getTestResults() {

        return fetch(`${process.env.API_HOST}/api/test`)
        .then(function(response) { return response.json()})
        .catch( error => { return error})

    }

    static getChileCompraData(state) {
        let estado = state.getState();
        // These two are yet to be implemented! 
        //let loginStatus = estado.login
        //let loginToken = estado.loginToken 
        let queryVals = estado.inputFieldValues; //queryValues
        let queryFields = [
            `estadoLicitacion=${queryVals.selectedEstadoLicitacion}`,
            `codigoLicitacion=${queryVals.codigoLicitacion}`,
            `selectedDate=${queryVals.date}`,
            `organismoPublico=${queryVals.selectedOrganismoPublico}`,
            `rutProveedor=${queryVals.rutProveedor}`,
            `palabrasClave=${queryVals.palabrasClave}`
        ];

        let query = queryFields.join("&");

        return fetch(`${process.env.API_HOST}/api/get_chilecompra_data?${query}`)
            .then(response => response.json() )
            .catch(error => {return error })

    }

    static getOrganismosPublicos() {
        return fetch("/api/get_misc_info?info=organismos_publicos")
        .then(function(response) { return response.json() })
        .catch( error => { return error } )    
    }

    static getEstadosLicitacion() {
        return fetch("/api/get_misc_info?info=estados_licitacion")
        .then(function(response) { return response.json() })
        .catch( error => { return error } )   
    }
    
}

export default fetchApi;