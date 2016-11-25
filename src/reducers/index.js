// Set up your root reducer here...
import { combineReducers } from 'redux';
 //import XXXXREDUCER from '.myReducerName';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created


const rootReducer = combineReducers({
    //XXXREDUCER,
    routing: routerReducer
    
})

 export default rootReducer;