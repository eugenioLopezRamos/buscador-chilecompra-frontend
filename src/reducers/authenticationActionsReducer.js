import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export const loginDataSetter = (state = initialState.loginData, action) => {
    let newState = {};

    switch(action.type) {

        case types.USER_LOGIN_EMAIL_INPUT:
            return objectAssign({}, state, {email: action.value});

        case types.USER_LOGIN_PASSWORD_INPUT:
            return objectAssign({}, state,  {password: action.value});

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            newState = objectAssign({}, 
                                    state, 
                                    {email: "", password: "", message: "Bienvenido!", result: "success"});

            return newState;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            newState = objectAssign({},
                                    state, 
                                    {email: "", 
                                     password: "", 
                                     message: "Hubo un error al ingresar tus datos. Por favor intentalo de nuevo",
                                     result: "failure"});
            return newState;

        case types.USER_LOGOUT_SUCCESS:
        //In this scenario we have to destroy the JWT token, but probably shouldn't be here since that'd be impure.
            newState = objectAssign({}, state, {email: "", password: "", message: "Has salido exitosamente", result: "logout-success"});
            return newState;

        case types.USER_LOGOUT_FAILURE:
            newState = objectAssign({}, state, {email: "", password: "", message: "Hubo un error, favor intentar de nuevo", result: "logout-failure"});
            return newState;

        default:
            return state;
    }


}

export const auth_tokenSetter = (state = initialState.auth_token, action) => {
    switch(action.type) {

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return action.response.auth_token;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return null;

        case types.USER_LOGOUT_SUCCESS:
            return null;

        case types.USER_LOGOUT_FAILURE: //Unneeded(could just use the default action), but included for clarity.
            return state;

        default:
            return state;

    } 

}

export const isAuthenticatedSetter = (state = initialState.isAuthenticated, action) => {

    switch(action.type) {

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return true;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return false;

        case types.USER_LOGOUT_SUCCESS:
            return false;

        case types.USER_LOGOUT_FAILURE: //Unneeded(could just use the default action), but included for clarity.
            return state;

        default:
            return state;
    }

}

export const userDataSetter = (state = initialState.userData, action) => {
    switch(action.type) {

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return action.response.user;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return null;

        case types.USER_LOGOUT_SUCCESS:
            return null;

        case types.USER_LOGOUT_FAILURE: //Unneeded(could just use the default action), but included for clarity.
            return state;

        default:
            return state;

    }

}
