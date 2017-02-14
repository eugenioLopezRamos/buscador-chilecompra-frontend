import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
// import * as types from '../actions/types'; //to be created
import searchResults from './fetchReducer';

import searchQueryValues from './searchQueryValuesReducer';
import organismosPublicos from './onLoadFetchOrgPubReducer';
import estadosLicitacion from './onLoadFetchEstLicReducer';
import {displayActionsReducer as display} from './displayActionsReducer';
import * as authenticationReducers from './authenticationActionsReducer';
import signupReducer from './signupReducer';
import modifiedUserDataReducer from './modifiedUserDataReducer';
import messagesReducer from './messagesReducer';
import {userSearchesReducer as userSearches} from './userSearchesReducer';
import {userSubscriptionsReducer as userSubscriptions} from './userSubscriptionsReducer';
import {userNotificationsReducer as userNotifications} from './userNotificationsReducer';

const rootReducer = combineReducers({
    
    organismosPublicos,
    estadosLicitacion,
    display,
    isAuthenticated: authenticationReducers.isAuthenticatedSetter,
    userData: authenticationReducers.userDataSetter,
    userSearches,
    userSubscriptions,
    userNotifications,
    modifiedUserData: modifiedUserDataReducer,
    loginData: authenticationReducers.loginDataSetter,
    routing: routerReducer,
    signup: signupReducer,
    searchResults,
    searchQueryValues,
    messages: messagesReducer,
    
});

 export default rootReducer;