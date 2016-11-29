
class fetchTestApi {

//    return function(dispatch) {

    static getTestResults() {

        return fetch("/api/test")
        .then(function(response) { return response.json()})
        .catch( error => { return error})
//    }
    }


}

export default fetchTestApi;