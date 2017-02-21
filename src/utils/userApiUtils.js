import utils from './authUtils';

export const userDataFetcher = (endpoint, method, body) => {
        let headers = utils.setHeaders();
        let reqBody = method.toUpperCase() === 'GET' ? null : body;

        let request = {
                        headers,
                        method: `${method.toUpperCase()}`   
                    }
                    
        if(reqBody !== null) {
            request.body = JSON.stringify(reqBody);
        } 
        return fetch(`${process.env.API_HOST}/api/${endpoint}`, request)
        .then(response => {
            let headers = utils.headerToObject(response);
            utils.saveToStorage(headers);
            if(response.status >= 200 & response.status < 300) {
                return response.json();
            }else { 
                return response.json().then(error => {throw error})
            }
        })
        //.catch(error => {return error});
}