import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';


export const handleInputs = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case types.USER_LOGIN_EMAIL_INPUT:
            return objectAssign({}, state, {loginData: {email: action.value}});
        case types.USER_LOGIN_PASSWORD_INPUT:
            return objectAssign({}, state, {loginData: {password: action.value }});

        default:
            return state;

    }
}

export const loginStatus = (state = initialState.loginData, action) => {
    let newState = {};

    switch(action.type) {

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            newState = objectAssign({}, 
                                    state, 
                                    {email: "", password: "", message: "Bienvenido!"});


            return newState;
        case types.USER_SEND_LOGIN_INFO_FAILURE:
            newState = objectAssign({},
                                    state, 
                                    {email: "", 
                                     password: "", 
                                     message: "Hubo un error al ingresar tus datos. Por favor intentalo de nuevo"});
            return newState;
        case types.USER_LOGOUT_SUCCESS:
        //In this scenario we have to destroy the JWT token, but probably shouldn't be here since that'd be impure.
            newState = objectAssign({}, state, {email: "", password: "", message: "Has salido exitosamente"});
            return newState;

        case types.USER_LOGOUT_FAILURE:
            newState = objectAssign({}, state, {email: "", password: "", message: "Hubo un error, favor intentar de nuevo"});
            return newState;

        default:
            return state;
    }


}

export const auth_tokenSetter = (state = initialState.auth_token, action) => {
    switch(action.type) {
    //   {auth_token: "zzzz"}, {isAuthenticated: true},
    // {userData: {name: "perico", email: "mail@email.mail"}}


    } 

}

export const isAuthenticatedSetter = (state = initialState.isAuthenticated, action) => {
    switch(action.type) {

    }

}

export const userDataSetter = (state = initialState.userData, action) => {
    switch(action.type) {

    }


}
 

export const logoutResults = (state = initialState.loginData, action) => {

    switch(action.type) {

        default:
            return state
    }
}