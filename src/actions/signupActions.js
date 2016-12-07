import * as types from './actionTypes';
import signup from '../api/signup';


export const sendSignupDataSuccess = (response) => {
    return {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, value: response};
};

export const sendSignupDataFailure = (error) => {
    return {type: types.USER_SEND_SIGNUP_INFO_FAILURE, value: error};
};
export const sendSignupData = (getState) => {
    return function(dispatch, getState){
        const state = {getState};
        return signup.sendSignupInfo(getState)
                      .then(response => { dispatch(sendSignupDataSuccess(response))})
                      .catch(error => { dispatch(sendSignupDataFailure(error))});
    };
};

