
import utils from '../utils/authUtils';
import {userDataFetcher} from '../utils/userApiUtils';

class userApi {
    constructor(utils) {
        
    }
        
    static sendLoginInfo(state) {
        let login_data = {
                            email: state.getState().loginData.email,
                            password: state.getState().loginData.password
                        };

        return fetch(`${process.env.API_HOST}/api/auth/sign_in`, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify(login_data),
            method: "POST"
        }).then(response => {
            
                return this.receiveNewAuthData(response);
            })
          .catch(error => {return error.json()});
    }

    static requestTokenValidation() {

            let query = utils.setQueryParams();
            return fetch(`${process.env.API_HOST}/api/auth/validate_token?${query}`)
                        .then(response => {
                            if(response.status >= 200 && response.status < 300) {
                                return this.receiveNewAuthData(response);
                            }
                            })
                        .catch(error => {return error});
    }

    static sendLogoutInfo() {

        let headers = utils.setHeaders();
        return fetch(`${process.env.API_HOST}/api/auth/sign_out`, {
            headers: headers,
            body: "", 
            method: "DELETE"
            })
            .then(response => {
                if(response.status >= 200 && response.status < 300) {
                    return response;
                }
                })
            .catch(error => {return error});
    }


    static receiveNewAuthData(response) {

        let headers = utils.headerToObject(response);
        let result = "failure";
        if (response.status >= 200 && response.status < 300) {
            result = "success";
        }

        return response.json()
                .then(response => {

                    return {headers, body: response, result}
                });
    }

    static updateUserInfo(body) {
        let reqBody = JSON.stringify(body);
        let headers = utils.setHeaders();
        return fetch(`${process.env.API_HOST}/api/auth/`, {
            headers,
            body:reqBody,
            method: "PUT"
        })
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                return response;
            }else {
                throw response.json();
            }
        })
        .catch(error => {return error});
    }

    static getResults() {
        return userDataFetcher("results", "get");
    }

    static createResults(results) {
        return userDataFetcher("results", "POST", results);
    }

    static updateResults(results) {
        return userDataFetcher("results", "PUT", results);
    }

    static deleteResults(results) {
        return userDataFetcher('results', "DELETE", results);
    }

    static getSearches() {
        return userDataFetcher('searches', 'GET');
    }

    static createSearches(searches) {
        return userDataFetcher('searches', 'POST', searches);
    }
    
    static updateSearches(searches) {
        return userDataFetcher('searches', 'PUT', searches);
    }

    static deleteSearches(searches) {
        return userDataFetcher('searches', 'DELETE', searches);
    }

}

export default userApi;