import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Introduction from './components/Introduction.jsx';
import InputFieldsContainer from './components/InputFieldsContainer.jsx';
import UserPage from './components/user/UserPage.jsx';
import UserProfileData from './components/user/UserProfileData.jsx';
import AuthorizationWrapper from './components/AuthorizationWrapper.jsx';
import * as API from './actions/fetchActions';
import {createUserSearches as createSearches} from './actions/UserActions';
import initialState from './reducers/initialState';
import SearchesSaver from './components/SearchesSaver';
import AccountRecovery from './components/AccountRecovery.jsx';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Introduction}  />
        <Route 
            path="/busqueda" 
            component={
                () => {
                    return (<AuthorizationWrapper
                               component={InputFieldsContainer}
                               saveMenu={SearchesSaver}
                               actions={{createSearches, API}}
                               componentDefaultValues={{
                                defaultState: initialState.searchQueryValues
                               }}
                               renderFailure={Introduction}
                           />);
                    }
              }
        />

        <Route
            path="/inicio" 
            component={
                   () => {
                        return (<AuthorizationWrapper
                                    component={UserPage}
                                    renderFailure={Introduction}
                                />);
                    }
            } 
        />

        <Route
            path="/perfil"
            component={
                () => {
                    return (<AuthorizationWrapper 
                            component={UserProfileData}
                            renderFailure={Introduction}
                           />);
                }
            } 
        />

        <Route
            path="/recuperacion"
            component={AccountRecovery}
        />

    </Route>
);



