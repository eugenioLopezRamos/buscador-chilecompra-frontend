
// parameters should be a json object with parameters according to ChileCompra's API
function dataFetcher() {

        return fetch('/test', {accept: 'application/json',})
        .then(function(response) { return response.json()})
       .then(function(response) {
           console.log("response", response);
        })



}




export default dataFetcher;