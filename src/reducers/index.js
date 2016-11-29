// Set up your root reducer here...
import { combineReducers } from 'redux';
 //import XXXXREDUCER from '.myReducerName';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created
import login from './loginReducer';
import test from './fetchTestReducer';
//import codigosLicitacion from './fetchReducer';

const rootReducer = combineReducers({
    //XXXREDUCER,
    routing: routerReducer,
    login,
    test

    
})

 export default rootReducer;