import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created
import login from './loginReducer';
import searchResults from './fetchReducer';
import inputFieldValues from './inputFieldsReducer';
import organismosPublicos from './onLoadFetchOrgPubReducer';
import estadosLicitacion from './onLoadFetchEstLicReducer';
import showNavbar from './navbarReducer';


const rootReducer = combineReducers({
    
    organismosPublicos,
    estadosLicitacion,
    routing: routerReducer,
    login,
    searchResults,
    inputFieldValues,
    showNavbar
    
})

 export default rootReducer;