import utils from './authUtils';

export const userDataFetcher = (endpoint, method, body) => {
        
        let headers = utils.setHeaders();
        let reqBody = method.toUpperCase() === 'GET' ? null : JSON.stringify(body);
        return fetch(`${process.env.API_HOST}/api/${endpoint}`, {
            headers,
            body: reqBody,
            method: `${method.toUpperCase()}`
        })
        .then(response => {
            if(response.status >= 200 & response.status < 300) {
                return response;
            }else {
                throw response.json()
            }
        })
        .catch(error => {return error});
}