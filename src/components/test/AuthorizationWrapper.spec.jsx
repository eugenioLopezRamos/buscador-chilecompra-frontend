import React from 'react';
import {shallow} from 'enzyme';
import AuthorizationWrapper from '../AuthorizationWrapper';
import configureMockStore from 'redux-mock-store';

//Possible wrapees 
import Introduction from '../Introduction';
import InputFieldsContainer from '../InputFieldsContainer';
import SearchesSaver from '../SearchesSaver';
import UserPage from '../UserPage';
import UserProfileData from '../UserProfileData';

//actions
import * as API from './actions/fetchActions';
import createSearches from './actions/UserActions';
//menus
import SearchesSaver from '../SearchesSaver';
import initialState from '../reducers/initialState';


const mockStore = configureMockStore();
const contextObject = (store) => {
    return {
        context: {
            store: store
        },
        childContextTypes: {
            store: React.PropTypes.Object
        }
    };
};
const userMock = {
            id: 1,
            provider: "email",
            uid: "email@example.com",
            name: "test-user",
            nickname: null,
            image: "",
            email: "email@example.com",
            created_at: "2016-12-22T12:42:17.461-03:00",
            updated_at: "2017-02-23T17:14:03.002-03:00"
};



function noAuthSetup() {

    const store = mockStore({user:null, isAuthenticated: false, messages: {Info: [], Errores: []}});
    const noAuthWrapper = shallow(<AuthorizationWrapper
                                    component={inputFieldsContainer}
                                   />, contextObject(store));

    return {
        noAuthWrapper
    }
};

function inputFieldsSetup() {

    const store = mockStore({
                            user: userMock,
                            isAuthenticated: true,
                            messages: {
                                Info: [], Errores: []
                            }
                            });
    
    const inputFieldsWrapper = shallow(<AuthorizationWrapper
                                        component={inputFieldsContainer}
                                        saveMenu={SearchesSaver}
                                        actions={{createSearches, API}}
                                        componentDefaultValues={{
                                            defaultState: initialState.searchQueryValues
                                        }}
                                        renderFailure={Introduction}
                                        />, contextObject(store));

    return {
        inputFieldsWrapper
    }
};

function userPageSetup() {

    const store = mockStore({user: userMock, isAuthenticated: true, messages: {Info:[], Errores:[]}})

    const userPageWrapper = shallow(
                                    <AuthorizationWrapper
                                        component={UserPage}
                                        renderFailure={Introduction}
                                    />, contextObject);
    return {
        userPageWrapper
    }
};

function UserProfileDataSetup() {

    const store = mockStore({user: userMock, isAuthenticated: true, messages: {Info:[], Errores:[]}})

    const userProfileDataWrapper = shallow(
                                    <AuthorizationWrapper
                                        component={UserPage}
                                        renderFailure={Introduction}
                                    />, contextObject);

    return {
        userProfileDataWrapper
    }
};



describe('Component', () => {
    const {noAuthWrapper} = noAuthSetup();
    const {inputFieldsWrapper} = inputFieldsSetup();
    const {userPageWrapper} = userPageSetup();
    const {userProfileDataWrapper} = UserProfileDataSetup();


    describe('AuthorizationWrapper', () => {

        it('Should render self and subcomponents', () => {



        });

        it('Should correctly invoke functions', () => {



        });

    });
});