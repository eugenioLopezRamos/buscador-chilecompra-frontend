import * as types from '../constants/actionTypes';
import signup from '../api/signup';


export const sendSignupDataSuccess = (resp) => {
    return {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: resp.status, value: resp.status};
};

export const sendSignupDataFailure = (resp) => {
    let errorString = resp.errors.full_messages.join("\n");
    return {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: errorString, value: resp.status};
};

export const sendSignupData = (signupInfo) => {
    return function(dispatch){
        dispatch({type: types.USER_SEND_SIGNUP_INFO})
        return signup.sendSignupInfo(signupInfo)
                      .then(response => { 
                        if(response.status === "success") {
                            dispatch(sendSignupDataSuccess(response));
                        }else {
                            dispatch(sendSignupDataFailure(response));
                        }
                        
                        })
                      .catch(error => { dispatch(sendSignupDataFailure(error));});
    };
};

