import * as types from './actionTypes';
import userAPI from '../api/userApi';
import * as utils from '../utils/authUtils';


export const loginSuccess = (response) => {


    let responseData = response.body.data;
    //token should be a hash with all of the user's info (token, user name, email, searches etc etc etc)
    return {type: types.USER_SEND_LOGIN_INFO_SUCCESS, response: responseData}
}

export const loginFailure = (response) => {
    // whereas this should return just an error message and little else.
    return {type: types.USER_SEND_LOGIN_INFO_FAILURE, response}
}

export const validateTokenSuccess = (response) => {


    return {type: types.USER_VALIDATE_TOKEN_SUCCESS, response}
}


export const validateTokenFailure = (error) => {
    return {type: types.USER_VALIDATE_TOKEN_FAILURE, error}
}

export const submitLoginInfo = () => {

    return (dispatch, getState) => {
        let state = {getState};
        return userAPI.sendLoginInfo(state)
                      .then(response => {
                        
                            if(response.result === "success") {
                                //her i can use response.headers to set the corresponding tokens to localStorage/cookie
                                console.log("HEADEDER", response.headers);
                           
                                utils.saveToStorage(response.headers);
                                dispatch(loginSuccess(response));
                            }else {
                                utils.clearStorage();

                                dispatch(loginFailure(response));
                            }
                        })
                      .catch(error => { dispatch(loginFailure(error)) }); 
    };

}

export const validateToken = () => {

    if(localStorage.length === 0) {
        return dispatch => {
            dispatch(validateTokenFailure("failure"));
        }

    } else {

    
        return dispatch => {
            return userAPI.validateToken()
                .then(response => {
                    if(response.result === "success") {
                        console.log("validate token response", response);
                        console.log("validate token resp heade", response.headers);
                        utils.saveToStorage(response.headers);
                        dispatch(validateTokenSuccess(response));
                    } else {
                        utils.clearStorage();
                        console.log("POST CLEAR", localStorage);
                        dispatch(validateTokenFailure("failure"));
                    }
                })
                .catch(error => {dispatch(validateTokenFailure(error))})
        }
    }


}