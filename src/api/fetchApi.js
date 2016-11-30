
class fetchApi {

//    return function(dispatch) {

    static getTestResults() {

        return fetch("/api/test")
        .then(function(response) { return response.json()})
        .catch( error => { return error})
//    }
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