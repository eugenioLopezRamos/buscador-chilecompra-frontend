import utils from './authUtils';

export const userDataFetcher = (endpoint, method, body) => {
        
        let headers = utils.setHeaders();
        let reqBody = method.toUpperCase() === 'GET' ? null : body;
        return fetch(`${process.env.API_HOST}/api/${endpoint}`, {
            headers,
            body: JSON.stringify({results: reqBody}),
            method: `${method.toUpperCase()}`
        })
        .then(response => {
            if(response.status >= 200 & response.status < 300) {
                let headers = utils.headerToObject(response);
                utils.saveToStorage(headers);
                return response.json();
            }else {
                throw response.json();
            }
        })
        .catch(error => {return error});
}