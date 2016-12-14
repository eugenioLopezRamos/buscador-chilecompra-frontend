import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created
import searchResults from './fetchReducer';
import inputFieldValues from './inputFieldsReducer';
import organismosPublicos from './onLoadFetchOrgPubReducer';
import estadosLicitacion from './onLoadFetchEstLicReducer';
import * as displayReducers from './displayActionsReducer';
import * as authenticationReducers from './authenticationActionsReducer';
//import signupInputsReducer from './signupInputsReducer';
import signupReducer from './signupReducer';
//import searchTypeReducer from './displayActionsReducer';

const rootReducer = combineReducers({
    
    organismosPublicos,
    estadosLicitacion,
    showNavbar: displayReducers.showNavbarReducer,
    isAuthenticated: authenticationReducers.isAuthenticatedSetter,
    userData: authenticationReducers.userDataSetter,
    loginData: authenticationReducers.loginDataSetter,
    routing: routerReducer,
    signup: signupReducer,
    searchResults,
    inputFieldValues,

    searchType: displayReducers.searchTypeReducer
    
});

 export default rootReducer;