import * as types from './actionTypes';

const loginInputEmail = (value) => {
    return {type: types.USER_LOGIN_EMAIL_INPUT, value}
}

const loginInputPassword = (value) => {
    return {type: types.USER_LOGIN_PASSWORD_INPUT, value}
}

