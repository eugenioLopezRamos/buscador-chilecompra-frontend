import * as types from '../constants/actionTypes';
// import utility functions from '..utils/xxxxx';


//So, here I would call the fetch functions extracted from the view from ../utils/, each corresponding to an action

//therefore the flow would be -> event -> dispatcher -> THUNK START -> async fetch  -> fetch resolves -> THUNK ENDS and passes result back to dispatcher to update the state.




// // example of a thunk using the redux-thunk middleware
// export function saveFuelSavings(settings) {
//   return function (dispatch) {
//     // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
//     // in context case at context point we could call a service that would persist the fuel savings
//     return dispatch({
//       type: types.SAVE_FUEL_SAVINGS,
//       dateModified: dateHelper.getFormattedDateTime(),
//       settings
//     });
//   };
// }

// export function calculateFuelSavings(settings, fieldName, value) {
//   return {
//     type: types.CALCULATE_FUEL_SAVINGS,
//     dateModified: dateHelper.getFormattedDateTime(),
//     settings,
//     fieldName,
//     value
//   };
// }

// export const FETCH_CHILECOMPRA_DATA = 'FETCH_CHILECOMPRA_DATA';
// export const FETCH_ESTADOS_LICITACION = 'FETCH_ESTADOS_LICITACION';
// export const FETCH_ORGANISMOS_PUBLICOS = 'FETCH_ORGANISMOS_PUBLICOS';






//this is a non async action.

// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// function receivePosts(subreddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     subreddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }


const FETCH_CHILECOMPRA_DATA = (context = this) => {

    //use a context parameter to replace context=context; !
      //  let context = context;
             
       // let parameters = JSON.stringify(context.state);
     //   console.log("parameters", parameters);
    //    console.log("STATE OBJECT KEYS", Object.keys(context.state));

        //context should be destructured to form the params - Perhaps later.
        
        return function(dispatch) {

            dispatch(requestData("Obteniendo datos")); // obteniendo datos = temporal, a modificarse luego:
            
            let query = Object.keys(context.state).map( e => {
                
                let stateKeyValue = context.state[e];
                if(stateKeyValue === "" || stateKeyValue.trim().length === 0) {
                    return;
                }else {
                    let returnValue = (e + "=" + stateKeyValue).toString();
                    return returnValue;
                }
                    //probably I can just if(!currentConditionalStatement) {currentElseStatementFunction} so it looks better
            })

            query = query.filter( e => {
                //eliminates undefined returned by .map when returning from empty strings.
                if(e) { return e; }
            })

            //probably can just chain that .filter to the .map

            console.log("QUERY ARRAY", query);
            let queryExpression = query.join("&");

            console.log("QUERY EXP", queryExpression);

            return fetch("/get_chilecompra_data?" + queryExpression, {accept: 'application/json', contentType: 'application/json'})
                .then(response => response.json())
                .then(json => {
                    console.log("RESP", json);
                    dispatch(receiveChileCompraData(json)); //Once again, this is temp.
                // context.props.onSubmit(response);
                    } 

                )
                //catch errors here!!!!!
                //
                //
                //
                
        }
}


//I should be able to refactor this into just one function, but I'll do it later when I'm more familiarized with the whole setup.

const FETCH_ESTADOS_LICITACION = (context = this) => {

      // var context = context;
        fetch("/get_misc_info?info=estados_licitacion", {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {

                context.setState({estadosLicitacion: response});
                //If I understand correctly I will have to change context from .setState to store.dispatch!                
                })
            
        }
        
const FETCH_ORGANISMOS_PUBLICOS = (context = this) => {
        var context = context;
        fetch("/get_misc_info?info=organismos_publicos", {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
                context.setState({organismosPublicos: response});


                //If I understand correctly I will have to change context from .setState to store.dispatch!
                })
            
        }

export {FETCH_CHILECOMPRA_DATA, FETCH_ORGANISMOS_PUBLICOS, FETCH_ESTADOS_LICITACION}