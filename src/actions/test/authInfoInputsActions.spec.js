import * as types from '../actionTypes';

export const loginInputEmail = (value) => {
    return {type: types.USER_LOGIN_EMAIL_INPUT, value}
}

export const loginInputPassword = (value) => {
    return {type: types.USER_LOGIN_PASSWORD_INPUT, value}
}

