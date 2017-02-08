
class fetchApi {

    static getChileCompraData(state) {
        
        // let queryValues = state.searchQueryValues; //queryValues
        // let searchType = state.searchType;

        let queryFields = [
            `estadoLicitacion=${state.selectedEstadoLicitacion}`,
            `codigoLicitacion=${state.codigoLicitacion}`,
            `startDate=${state.startDate}`,
            `endDate=${state.endDate}`,
            `organismoPublico=${state.selectedOrganismoPublico}`,
            `rutProveedor=${state.rutProveedor}`,
            `palabrasClave=${state.palabrasClave}`,
            `alwaysFromToday=${state.alwaysFromToday}`,
            `alwaysToToday=${state.alwaysToToday}`,
            `offset=${state.offset}`
            
            ]

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