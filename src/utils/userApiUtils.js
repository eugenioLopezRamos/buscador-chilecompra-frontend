import utils from './authUtils';

export const userDataFetcher = (endpoint, method, body) => {
        let headers = utils.setHeaders();
        console.log("ENDPOINT", endpoint);
        let reqBody = method.toUpperCase() === 'GET' ? null : body;

        let request = {
                        headers: JSON.stringify(headers),
                        method: `${method.toUpperCase()}`   
                    }
                    
        if(reqBody !== null) {
            request.body = JSON.stringify(reqBody);
        } 
        console.log("FETCH ADDR", `${process.env.API_HOST}/api/${endpoint}/`)
        return fetch(`${process.env.API_HOST}/api/${endpoint}/`, request)
        .then(response => {
            let headers = utils.headerToObject(response);
            utils.saveToStorage(headers);
            if(response.status >= 200 & response.status < 300) {
                return response.json();
            }else {
                throw response.json();
            }
        })
        .catch(error => {return error});
}