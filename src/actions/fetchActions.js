
// const FETCH_CHILECOMPRA_DATA = 'FETCH_CHILECOMPRA_DATA';

// const fetchChileCompraData = (context = this) => {
//         //context should be destructured to form the params - Perhaps later.

//         return function(dispatch) {

//             dispatch(requestData("Obteniendo datos")); // obteniendo datos = temporal, a modificarse luego:
            
//             let query = Object.keys(context.state).map( e => {
                
//                 let stateKeyValue = context.state[e];
//                 if(stateKeyValue === "" || stateKeyValue.trim().length === 0) {
//                     return;
//                 }else {
//                     let returnValue = (e + "=" + stateKeyValue).toString();
//                     return returnValue;
//                 }
//                     //probably I can just if(!currentConditionalStatement) {currentElseStatementFunction} so it looks better
//             })

//             query = query.filter( e => {
//                 //eliminates undefined returned by .map when returning from empty strings.
//                 if(e) { return e; }
//             })

//             //probably can just chain that .filter to the .map

//             console.log("QUERY ARRAY", query);
//             let queryExpression = query.join("&");

//             console.log("QUERY EXP", queryExpression);

//             return fetch("/get_chilecompra_data?" + queryExpression, {accept: 'application/json', contentType: 'application/json'})
//                 .then(response => dispatch(showSearchResults(response.json())),
//                       error => dispatch(showSearchResults("Error")));
//                 // .then(json => {
//                 //     console.log("RESP", json);


//                 //     dispatch(receiveChileCompraData(json)); //Once again, this is temp.
//                 // // context.props.onSubmit(response);
//                 //     } 

//                 // )
//                 //catch errors here!!!!!
//                 //
//                 //
//                 //
                
//         }
// }


// //I should be able to refactor this into just one function, but I'll do it later when I'm more familiarized with the whole setup.
// const FETCH_ESTADOS_LICITACION = 'FETCH_ESTADOS_LICITACION';

// const fetchEstadosLicitacion = (context = this) => {

//       // var context = context;
//         fetch("/get_misc_info?info=estados_licitacion", {accept: 'application/json', contentType: 'application/json'})
//             .then(function(response) { return response.json()})
//             .then(function(response) {

//                 //context.setState({estadosLicitacion: response});
//                 //If I understand correctly I will have to change context from .setState to store.dispatch!                
//                 })
            
//         }





// const FETCH_ORGANISMOS_PUBLICOS = 'FETCH_ORGANISMOS_PUBLICOS';     

// const fetchOrganismosPublicos = (context = this) => {
//         var context = context;
//         fetch("/get_misc_info?info=organismos_publicos", {accept: 'application/json', contentType: 'application/json'})
//             .then(function(response) { return response.json()})
//             .then(function(response) {
// //                context.setState({organismosPublicos: response});


//                 //If I understand correctly I will have to change context from .setState to store.dispatch!
//                 })
            
//         }

// export {fetchChileCompraData, fetchEstadosLicitacion, fetchOrganismosPublicos}

const fetchChileCompraData = () => {

    return function(dispatch) {

        return fetch("/get_misc_info?info=organismos_publicos", {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})

    }


}