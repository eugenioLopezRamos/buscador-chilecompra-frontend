import * as types from './actionTypes';
import signup from '../api/signup';


export const sendSignupDataSuccess = (resp) => {
    return {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: resp.message, value: resp.result};
};

export const sendSignupDataFailure = (resp) => {
    let errorsToString = Object.keys(resp.errors).map(key => {
        return `${key} ${resp.errors[key]}`;
    }).join(' \n ');

    return {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: errorsToString, value: resp.result};
};

export const sendSignupData = () => {
    return function(dispatch, getState){
        const state = {getState};
        return signup.sendSignupInfo(state)
                      .then(response => { 
                        if(response.result === "success") {
                            dispatch(sendSignupDataSuccess(response));
                        }else {
                            dispatch(sendSignupDataFailure(response));
                        }
                        
                        })
                      .catch(error => { dispatch(sendSignupDataFailure(error))});
    };
};

