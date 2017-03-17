import fetch from 'isomorphic-fetch';
import utils from '../utils/authUtils';

class fetchApi {

    static getChileCompraData(state) {
  
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
                 
        let headers = utils.setHeaders();
        return fetch(`${process.env.API_HOST}/api/get_info`,
        {
            headers,
            method: "POST",
            body: JSON.stringify(body)
        }
        )
            .then(response => {
                let headers = utils.headerToObject(response);
                utils.saveToStorage(headers);
                if(response.status >= 200 && response.status <300) {
                    return response.json();
                }
                throw response;
            })
            .catch(error => {return error })

    }

    static getOrganismosPublicos() {
        let headers = utils.setHeaders();
        return fetch("http://localhost:3000/api/get_misc_info?info=organismos_publicos", {headers})
        .then(response => {
            let headers = utils.headerToObject(response);
            utils.saveToStorage(headers);
            if(response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw response;
        })
    }

    static getEstadosLicitacion() {
        let headers = utils.setHeaders();
        return fetch("http://localhost:3000/api/get_misc_info?info=estados_licitacion", {headers})
        .then(response => { 
            let headers = utils.headerToObject(response);
            utils.saveToStorage(headers);

            if(response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw response;
        })

    }


    static shortGetChileCompraData(state) {
        let headers = utils.setHeaders();
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
        {headers}
        )
            .then(response => {
                let headers = utils.headerToObject(response);
                utils.saveToStorage(headers);
                response.json()
            })
            .catch(error => {return error }) 
    }   
    
}

export default fetchApi;