import * as types from './actionTypes';
import * as userAPI from '../api/userApi';

const submitLoginInfoSuccess = (response) => {

    //token should be a hash with all of the user's info (token, user name, email, searches etc etc etc)
    return {type: types.USER_SEND_LOGIN_INFO_SUCCESS, value: response}
}

const submitLoginInfoFailure = (response) => {
    // whereas this should return just an error message and little else.
    return {type: types.USER_SEND_LOGIN_INFO_FAILURE, value: response}
}


const submitLoginInfo = () => {

    return (dispatch, getState) => {
        let state = {getState};
        return userAPI.sendLoginInfo(state).then(
            //so, fetchLoginRsponse sends the credentials, and the
            //action should handle either throwing or returning json
            //which would then be returned as "token" (response.json() => token)
            token => {
                    dispatch(loginSuccess(token) //dispatch another action
                    // with the JWT as arg
                )}
        ).catch(error => { throw(error) }) //or throws in case of failure
    };

}

export default login