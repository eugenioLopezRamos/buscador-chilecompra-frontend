import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created
import searchResults from './fetchReducer';
import inputFieldValues from './inputFieldsReducer';
import organismosPublicos from './onLoadFetchOrgPubReducer';
import estadosLicitacion from './onLoadFetchEstLicReducer';
import * as displayReducers from './displayActionsReducer';
//import searchTypeReducer from './displayActionsReducer';

const rootReducer = combineReducers({
    
    organismosPublicos,
    estadosLicitacion,
    routing: routerReducer,
    searchResults,
    inputFieldValues,
    showNavbar: displayReducers.showNavbarReducer,
    searchType: displayReducers.searchTypeReducer
    
});

 export default rootReducer;