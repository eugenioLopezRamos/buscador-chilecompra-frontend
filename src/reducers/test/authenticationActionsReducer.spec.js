import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import * as reducers from '../authenticationActionsReducer';
import objectAssign from 'object-assign';
import * as responses from '../../constants/authenticationActionsReducerResponses';

describe('Authentication actions reducer', () => {

    it('Test that actions return the initial state', () => {

        function returnsInitialState(action, initialStateProp) {
            expect(reducers[action](undefined, {type: "mock"})).toEqual(initialState[initialStateProp]);
        }

        returnsInitialState("loginDataSetter", "loginData");
        returnsInitialState("isAuthenticatedSetter", "isAuthenticated");
        returnsInitialState("userDataSetter", "userData");
    });

    it('returns the expected state when calling loginDataSetter', () => {
        function compareResults(action, value=action.value) {
            expect(objectAssign({}, initialState[stateProp], value)).toEqual(reducers.loginDataSetter(undefined, action))
        }

        const stateProp = "loginData";
        let type = undefined;
        let value = undefined;
        let action = {type, value};

        action.type = types.USER_LOGIN_EMAIL_INPUT;
        action.value = "aaa@email.com";
        compareResults(action, {email: action.value});

        action.type = types.USER_LOGIN_PASSWORD_INPUT;
        action.value = "s3cr3tp4ss";
        compareResults(action, {password: action.value});
        
        action.type = types.USER_SEND_LOGIN_INFO_SUCCESS;
        compareResults(action, responses.loginSuccess);
        
        action.type = types.USER_SEND_LOGIN_INFO_FAILURE;
        compareResults(action, responses.loginFailure);

        action.type = types.USER_LOGOUT_SUCCESS;
        compareResults(action, responses.logoutSuccess);

        action.type = types.USER_LOGOUT_FAILURE;
        compareResults(action, responses.logoutFailure);

    });

    it('returns the expected state when calling isAuthenticatedSetter', () => {
        function compareResults(action, value=action.value) {
            expect(value).toEqual(reducers.isAuthenticatedSetter(undefined, action))
        }

        const stateProp = "isAuthenticated";
        let type = undefined;
        let value = undefined;
        let action = {type, value};

        action.type = types.USER_SEND_LOGIN_INFO_SUCCESS;
        compareResults(action, true);

        action.type = types.USER_SEND_LOGIN_INFO_FAILURE;
        compareResults(action, false);
        
        action.type = types.USER_LOGOUT_SUCCESS;
        compareResults(action, initialState.isAuthenticated);

        action.type = types.USER_LOGOUT_FAILURE;
        compareResults(action, initialState.isAuthenticated);

        action.type = types.USER_VALIDATE_TOKEN_SUCCESS;
        compareResults(action, true);

        action.type = types.USER_VALIDATE_TOKEN_FAILURE;
        compareResults(action, false);

    });

    it('returns the expected state when calling userDataSetter', () => {
        function compareResults(action, value=action.response) {
            expect(value).toEqual(reducers.userDataSetter(undefined, action))
        }
        const stateProp = "userData";
        let type = undefined;
        let response = undefined;
        let action = {type, response};

        action.type = types.USER_SEND_LOGIN_INFO_SUCCESS;
        action.response = {body: {data: {id: 1}}}
        compareResults(action, action.response);
        
        action.type = types.USER_SEND_LOGIN_INFO_FAILURE;
        compareResults(action, null);

        action.type = types.USER_LOGOUT_SUCCESS;
        compareResults(action, initialState.userData);

        action.type = types.USER_LOGOUT_FAILURE;
        compareResults(action, initialState.userData);

        action.type = types.USER_VALIDATE_TOKEN_SUCCESS;
        compareResults(action, action.response.body.data);

        action.type = types.USER_VALIDATE_TOKEN_FAILURE;
        compareResults(action, null);
    });




})