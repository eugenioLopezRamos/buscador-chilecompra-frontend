import * as types from './actionTypes';
import userAPI from '../api/userApi';

export const loginSuccess = (response) => {

    //token should be a hash with all of the user's info (token, user name, email, searches etc etc etc)
    return {type: types.USER_SEND_LOGIN_INFO_SUCCESS, response}
}

export const loginFailure = (response) => {
    // whereas this should return just an error message and little else.
    return {type: types.USER_SEND_LOGIN_INFO_FAILURE, response}
}

export const submitLoginInfo = () => {

    return (dispatch, getState) => {
        let state = {getState};
        return userAPI.sendLoginInfo(state)
                      .then(response => {
                          console.log("resp auth", response);
                        if(response.result === "success") {
                            dispatch(loginSuccess(response));
                        }else {
                            dispatch(loginFailure(response));
                        }
                        })
                      .catch(error => { dispatch(loginFailure(error)) }); 
    };

}

