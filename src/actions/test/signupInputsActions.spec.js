import * as types from '../../constants/actionTypes';

export const signupInputsName = (value) => {

    return {type: types.USER_SIGNUP_INPUT_NAME, value}
}

export const signupInputsEmail = (value) => {
    return {type: types.USER_SIGNUP_INPUT_EMAIL, value}
}

export const signupInputsPassword = (value) => {
    return {type: types.USER_SIGNUP_INPUT_PASSWORD, value}
}

export const signupInputsPasswordConf = (value) => {
    return {type: types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION, value}
}