import React from 'react';
import {shallow} from 'enzyme';
import {AuthorizationWrapper} from '../AuthorizationWrapper';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

//Possible wrapeés 
import Introduction from '../Introduction';
import {InputFieldsContainer} from '../InputFieldsContainer.jsx';
import {UserPage} from '../user/UserPage.jsx';
import {UserProfileData} from '../user/UserProfileData.jsx';

//actions
import * as API from '../../actions/fetchActions';
import {createUserSearches as createSearches} from '../../actions/UserActions';

//menus
import SearchesSaver from '../SearchesSaver';
import initialState from '../../reducers/initialState';


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
const defaultMessages = {Info: [], Errores: []}

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
                                        component={InputFieldsContainer}
                                        saveMenu={SearchesSaver}
                                        actions={{createSearches, API}}
                                        componentDefaultValues={{
                                            defaultState: initialState.searchQueryValues
                                        }}
                                        renderFailure={Introduction}
                                   />, contextObject(store));

    return {
        noAuthWrapper
    }
};

function inputFieldsSetup() {

    const store = mockStore();


    const inputFieldsWrapper = shallow(<AuthorizationWrapper
                                        component={InputFieldsContainer}
                                        saveMenu={SearchesSaver}
                                        actions={{createSearches, API}}
                                        componentDefaultValues={{
                                            defaultState: initialState.searchQueryValues
                                        }}
                                        renderFailure={Introduction}

                                        user={userMock}
                                        isAuthenticated={true}
                                        messages={defaultMessages}
                                        />, contextObject(store));

    return {
        inputFieldsWrapper
    }
};

function userPageSetup() {

    const store = mockStore();

    const userPageWrapper = shallow(
                                    <AuthorizationWrapper
                                        component={UserPage}
                                        renderFailure={Introduction}
            
                                        user={userMock}
                                        isAuthenticated={true}
                                        messages={defaultMessages}
                                    />, contextObject(store));
    return {
        userPageWrapper
    }
};

function UserProfileDataSetup() {

    const store = mockStore();

    const userProfileDataWrapper = shallow(
                                    <AuthorizationWrapper
                                        component={UserProfileData}
                                        renderFailure={Introduction}

                                        user={userMock}
                                        isAuthenticated={true}
                                        messages={defaultMessages}
                                    />, contextObject(store));

    return {
        userProfileDataWrapper
    }
};



describe('Component', () => {

  
    describe('AuthorizationWrapper', () => {

        const components = () => {
            //Supresses console.error warnings about propTypes.
            let stub;
            let expectedConsoleErrorMessage;

            const {noAuthWrapper} = noAuthSetup();

            stub = sinon.stub(console, "error");

            const {inputFieldsWrapper} = inputFieldsSetup();
            //two propsType checks fail
            expect(stub.calledTwice).toEqual(true);
            //check that these two  (what we expect to fail) failed.
            expectedConsoleErrorMessage = "Warning: Failed prop type: The prop `organismosPublicos` is marked as required in `InputFieldsContainer`, but its value is `undefined`.\n    in InputFieldsContainer"
            expect(stub.args[0]).toEqual([expectedConsoleErrorMessage]);

            expectedConsoleErrorMessage = "Warning: Failed prop type: The prop `estadosLicitacion` is marked as required in `InputFieldsContainer`, but its value is `undefined`.\n    in InputFieldsContainer";            
            expect(stub.args[1]).toEqual([expectedConsoleErrorMessage]);
            //restore the original behavior
            console.error.restore();

            stub = sinon.stub(console, "error");
            const {userPageWrapper} = userPageSetup();

            expect(stub.calledOnce).toEqual(true);

            expectedConsoleErrorMessage = "Warning: Failed prop type: The prop `user` is marked as required in `UserPage`, but its value is `undefined`.\n    in UserPage";
            expect(stub.args[0]).toEqual([expectedConsoleErrorMessage]);

            console.error.restore();


            stub = sinon.stub(console, "error");
            const {userProfileDataWrapper} = UserProfileDataSetup();

            expect(stub.calledOnce).toEqual(true);

            expectedConsoleErrorMessage = "Warning: Failed prop type: The prop `modifiedUserData` is marked as required in `UserProfileData`, but its value is `undefined`.\n    in UserProfileData";
            expect(stub.args[0]).toEqual([expectedConsoleErrorMessage]);

            return {
                noAuthWrapper,
                inputFieldsWrapper,
                userPageWrapper,
                userProfileDataWrapper
            }

        };
    


        it('Should render self and subcomponents', () => {
       
            const {noAuthWrapper, inputFieldsWrapper, userPageWrapper, userProfileDataWrapper} = components();

            //No auth wrapper - When not logged in, displays "Introduction";
            expect(noAuthWrapper.find(Introduction).length).toEqual(1);

            // InputFieldsContainer
            expect(inputFieldsWrapper.find(InputFieldsContainer).length).toEqual(1);
            //Actions are correctly bound with bindActionCreators
            expect(Object.keys(inputFieldsWrapper.instance().actions)).toEqual(["createSearches", "API"])
            //The correct SaveMenu is passed to InputFieldsContainer
            expect(inputFieldsWrapper.instance().saveMenu).toEqual(SearchesSaver);

            //UserPage
            expect(userPageWrapper.find(UserPage).length).toEqual(1);

            //UserProfileData
            expect(userProfileDataWrapper.find(UserProfileData).length).toEqual(1);

        });
    });
});