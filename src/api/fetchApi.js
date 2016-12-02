
class fetchApi {

    static getTestResults() {
        
        return fetch(`${process.env.API_HOST}/api/test`)
        .then(function(response) { return response.json()})
        .catch( error => { return error})

    }

    static getChileCompraData(state) {
        let estado = state.getState();
        // These two are yet to be implemented! 
        //let loginStatus = estado.login
        //let loginToken = estado.loginToken 
        let queryVals = estado.inputFieldValues; //queryValues
        let queryFields = [
            `estadoLicitacion=${queryVals.selectedEstadoLicitacion}`,
            `codigoLicitacion=${queryVals.codigoLicitacion}`,
            `selectedDate=${queryVals.date}`,
            `organismoPublico=${queryVals.selectedOrganismoPublico}`,
            `rutProveedor=${queryVals.rutProveedor}`,
            `palabrasClave=${queryVals.palabrasClave}`
        ];

        let query = queryFields.join("&");

        return fetch(`${process.env.API_HOST}/api/get_chilecompra_data?${query}`)
            .then(response => response.json() )
            .catch(error => {return error })

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

    // static getListadoLicitaciones(...arguments) //aqui es donde armo el query que tenia armado antes

    static getListadoLicitaciones() {
        let query = ""//all parts of the state that get sent to the server, which is mostly ones from store.inputFieldValues, but later will include the JWT + login status



    }








        sendParameters = () => {}

            //So, here I should call the fetch action with something like this:

           // FetchActions.FETCH_CHILECOMPRA_DATA();


                        // let parameters = JSON.stringify(this.state);
                        //   console.log("parameters", parameters);
                        //    console.log("STATE OBJECT KEYS", Object.keys(this.state));

                            //This should be destructuring to form the params

    //         let query = Object.keys(self.state).map( e => {
    //             let stateKeyValue = self.state[e];
    //             if(stateKeyValue === "" || stateKeyValue.trim().length === 0) {
    //                 return;
    //             }else {
    //                 let returnValue = (e + "=" + stateKeyValue).toString();
    //                 return returnValue;
    //             }
    //         })

    //         query = query.filter( e => {
    //             //eliminates undefined returned by .map when returning from empty strings.
    //             if(e) { return e; }
    //         })

    //         console.log("QUERY ARRAY", query);
    //         let queryExpression = query.join("&");

    //         console.log("QUERY EXP", queryExpression);

    //         fetch("/get_info?" + queryExpression, {accept: 'application/json', contentType: 'application/json'})
    //             .then(function(response) { return response.json()})
    //             .then(function(response) {
    //                 console.log("RESP", response);

    //                 self.props.onSubmit(response);
    //                 })
    // }
    
}

export default fetchApi;