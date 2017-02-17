
class fetchApi {

    static getChileCompraData(state) {
        
        // let queryValues = state.searchQueryValues; //queryValues
        // let searchType = state.searchType;
  
        let body = {
                        estadoLicitacion: state.selectedEstadoLicitacion,
                        codigoLicitacion: state.codigoLicitacion,
                        startDate: Date.parse(state.startDate),
                        endDate: Date.parse(state.endDate),
                        organismoPublico: state.selectedOrganismoPublico,
                        rutProveedor:state.rutProveedor,
                        palabrasClave: state.palabrasClave,
                        alwaysFromToday: state.alwaysFromToday,
                        alwaysToToday: state.alwaysToToday,
                        offset: state.offset,
                        order_by: state.order_by
                    }
                 
       // let query = queryFields.join("&");

        return fetch(`${process.env.API_HOST}/api/get_info`,
        {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
        }
        )
            .then(response => response.json() )
            .catch(error => {return error })

    }

    static getOrganismosPublicos() {
        return fetch("http://localhost:3000/api/get_misc_info?info=organismos_publicos")
        .then(function(response) { return response.json() })
        .catch( error => { return error } )    
    }

    static getEstadosLicitacion() {
        return fetch("http://localhost:3000/api/get_misc_info?info=estados_licitacion")
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