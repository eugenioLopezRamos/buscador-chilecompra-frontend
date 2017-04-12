import * as types from '../constants/actionTypes';
import userAPI from '../api/userApi';
import utils from '../utils/authUtils';


export const loginSuccess = (response) => {
    let responseData = response.body.data;
    //token should be a hash with all of the user's info (token, user name, email, searches etc etc etc)
    return {type: types.USER_SEND_LOGIN_INFO_SUCCESS, response: responseData};
};

export const loginFailure = (response) => {
    // whereas this should return just an error message and little else.
    return {type: types.USER_SEND_LOGIN_INFO_FAILURE, response, message: response.body.errors};
};

export const validateTokenSuccess = (response) => {


    return {type: types.USER_VALIDATE_TOKEN_SUCCESS, response};
};

export const validateTokenFailure = (error) => {
    return {type: types.USER_VALIDATE_TOKEN_FAILURE, response: {error}};
};
export const logoutSuccess = (response) => {
    return {type: types.USER_LOGOUT_SUCCESS, response};
};
export const logoutFailure = (response) => {
    return {type: types.USER_LOGOUT_FAILURE, response};
};

export const sendRecoverAccountSuccess = (value) => {
    return {type: types.USER_SEND_RECOVER_ACCOUNT_SUCCESS, value};
};
export const sendRecoverAccountFailure = (value) => {
    return {type: types.USER_SEND_RECOVER_ACCOUNT_FAILURE, value};
};


export const submitLoginInfo = (login_data) => {
    // login_data = {email,password};
 
    return (dispatch) => {
        dispatch({type: types.USER_SEND_LOGIN_INFO});
        return userAPI.sendLoginInfo(login_data)
                    .then(response => {
                        //this got moved from userApi
                            return userAPI.receiveNewAuthData(response);
                        })
                      .then(response => {
                        utils.saveToStorage(response.headers);   
                                 
                            if(response.result === "success") {
                                dispatch(loginSuccess(response));
                            }else {
                                utils.clearStorage();

                                dispatch(loginFailure(response));
                            }
                        })
                      .catch(error => { dispatch(loginFailure(error)); }); 
    };

};

export const validateToken = (mockToken) => {
    
    return dispatch => {
        let mock = mockToken;
        return userAPI.requestTokenValidation(mock)
            .then(response => {

                            if(response && response.status >= 200 && response.status < 300) {
                                return userAPI.receiveNewAuthData(response);
                            }
                            return response;
                            })
            .then(response => {
                utils.saveToStorage(response.headers);
                
                if(response.result === "success") {
                    dispatch(validateTokenSuccess(response));
                } else {
                    utils.clearStorage();
                    dispatch(validateTokenFailure("failure"));
                }
            })
           .catch(error => {dispatch(validateTokenFailure(error));});
    };
};

export const sendLogoutInfo = () => {

    return dispatch => {
        dispatch({type: types.USER_LOGOUT});
        return userAPI.sendLogoutInfo()
        .then(response => {
             if(response && response.status >= 200 && response.status < 300) {
                 utils.clearStorage();
                 return response.json().then(response => {
                     dispatch(logoutSuccess(response)); 
                });

             }else {
                return response.json().then(response => {
                    dispatch(logoutFailure(response));
                });
             }
            })
            .catch(error => {dispatch(logoutFailure(error));});
               
    };
};

export const sendRecoverAccount = (email) => {
    
    return dispatch => {
        dispatch({type: types.USER_SEND_RECOVER_ACCOUNT});
        return userAPI.sendRecoverAccount(email)
            .then(response => {
                if(response && response.status >= 200 && response.status < 300) {
                    return response.json().then(response => {
                        dispatch(sendRecoverAccountSuccess(response));
                    });
                }
                return response.json().then(response => {
                    dispatch(sendRecoverAccountFailure(response));
                });
        })
        .catch(() => dispatch(sendRecoverAccountFailure({errors: "Ha habido un error."})));
    };
};