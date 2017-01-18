
class fetchApi {

    static getTestResults() {

        return fetch(`${process.env.API_HOST}/api/test`)
        .then(function(response) { return response.json()})
        .catch( error => { return error})

    }

    static getChileCompraData(state) {
        
        // These two are yet to be implemented! - Maybe not even here.
        //let loginStatus = estado.login
        //let loginToken = estado.loginToken 
        let queryVals = state.inputFieldValues; //queryValues
        let searchType = state.searchType;
        let fieldsPerSearchType = {
                                    "listado": ["estadoLicitacion", "organismoPublico"],
                                    "proveedor": ["rutProveedor"],
                                    "codigo": ["codigoLicitacion"]
                                    };
                                    
        (() => { //adds parameters shared by all of those ^
            Object.keys(fieldsPerSearchType).map (e => {
                fieldsPerSearchType[e].push("selectedDate")
                fieldsPerSearchType[e].push("palabrasClave");
            })
        })();

        let queryFields = [
            `estadoLicitacion=${queryVals.selectedEstadoLicitacion}`,
            `codigoLicitacion=${queryVals.codigoLicitacion}`,
            `selectedDate=${queryVals.date}`,
            `organismoPublico=${queryVals.selectedOrganismoPublico}`,
            `rutProveedor=${queryVals.rutProveedor}`,
            `palabrasClave=${queryVals.palabrasClave}`
            ]

        let appropiateFields = fieldsPerSearchType[searchType];
        let query = appropiateFields.map(elem => { //extracts the corresponding chunks of the query from queryFields
                let filter = new RegExp(elem);
                return queryFields.filter(queryChunk => {
                    if(filter.test(queryChunk)) {
                        return queryChunk;
                    }
            })
        });

        query = query.reduce((prev, curr) => { //concats them all (since the map returns an array of arrays)
           return prev.concat(curr);
        });

        query = query.join("&"); //joins them to form the query string.

        return fetch(`${process.env.API_HOST}/api/get_info?${query}`,
        {headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
        }}
        )
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


    static shortGetChileCompraData(state) {

        let queryFields = [
            `estadoLicitacion=${state.selectedEstadoLicitacion}`,
            `codigoLicitacion=${state.codigoLicitacion}`,
            `selectedDate=${state.date}`,
            `organismoPublico=${state.selectedOrganismoPublico}`,
            `rutProveedor=${state.rutProveedor}`,
            `palabrasClave=${state.palabrasClave}`
            ];
        
        let query = queryFields.join("&");


        return fetch(`${process.env.API_HOST}/api/get_info?${query}`,
        {headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
        }}
        )
            .then(response => response.json() )
            .catch(error => {return error }) 
    }   
    
}

export default fetchApi;