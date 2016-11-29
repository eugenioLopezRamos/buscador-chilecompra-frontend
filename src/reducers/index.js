// Set up your root reducer here...
import { combineReducers } from 'redux';
 //import XXXXREDUCER from '.myReducerName';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created
import loginReducer from './loginReducer';
import fetchTestReducer from './fetchTestReducer';
//import codigosLicitacion from './fetchReducer';

const rootReducer = combineReducers({
    //XXXREDUCER,
    routing: routerReducer,
    loginReducer,
    fetchTestReducer

    
})

 export default rootReducer;