import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created
import login from './loginReducer';
import test from './fetchTestReducer';
import inputFieldValues from './inputFieldsReducer';
import organismosPublicos from './onLoadFetchOrgPubReducer';
import estadosLicitacion from './onLoadFetchEstLicReducer';


const rootReducer = combineReducers({
    
    organismosPublicos,
    estadosLicitacion,
    routing: routerReducer,
    login,
    test,
    inputFieldValues,
    
})

 export default rootReducer;