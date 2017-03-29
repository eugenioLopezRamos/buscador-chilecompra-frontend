import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';
import * as responses from '../constants/authenticationActionsReducerResponses';

export const loginDataSetter = (state = initialState.loginData, action) => {

    switch(action.type) {
            
        // TODO: Move hardcoded values off here into either the action or a constant
        case types.USER_LOGIN_EMAIL_INPUT:
            return objectAssign({}, state, {email: action.value});

        case types.USER_LOGIN_PASSWORD_INPUT:
            return objectAssign({}, state, {password: action.value});

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return objectAssign({}, state, responses.loginSuccess);

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return objectAssign({}, state, responses.loginFailure);


        case types.USER_LOGOUT_SUCCESS:
            return objectAssign({}, state, responses.logoutSuccess);
        

        case types.USER_LOGOUT_FAILURE:
            return objectAssign({}, state, responses.logoutFailure);

        default:
            return state;
    }


};

export const isAuthenticatedSetter = (state = initialState.isAuthenticated, action) => {

    switch(action.type) {

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return true;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return false;

        case types.USER_LOGOUT_SUCCESS:
            return initialState.isAuthenticated;

        case types.USER_LOGOUT_FAILURE: //Unneeded(could just use the default action), but included for clarity.
            return state;

        case types.USER_VALIDATE_TOKEN_SUCCESS:
            return true;

        case types.USER_VALIDATE_TOKEN_FAILURE:
            return false;

        default:
            return state;
    }
};

export const userDataSetter = (state = initialState.userData, action) => {

    switch(action.type) {

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return action.response;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return null;

        case types.USER_LOGOUT_SUCCESS:
            return initialState.userData;

        case types.USER_LOGOUT_FAILURE: //Unneeded(could just use the default action), but included for clarity.
            return state;

        case types.USER_VALIDATE_TOKEN_SUCCESS:
            return action.response.body.data;
            
        case types.USER_VALIDATE_TOKEN_FAILURE:
            return null;

        default:
            return state;

    }

};
