import * as types from './actionTypes';
import signup from '../api/signup';


export const sendSignupDataSuccess = (response) => {
    console.log("response signup", response);
    return {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: response, value: "success"};
};

export const sendSignupDataFailure = (response) => {
    let message = `${response.statusText} - ${response.status}`
    return {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message, value: "failure"};
};

//Probably need to add a new action for network errors or w/else

export const sendSignupData = () => {
    return function(dispatch, getState){
        const state = {getState};
        return signup.sendSignupInfo(state)
                      .then(response => { 
                        if(response.ok) {  
                            dispatch(sendSignupDataSuccess(response));
                        }else {
                            dispatch(sendSignupDataFailure(response));
                        }
                        
                        })
                      .catch(error => { dispatch(sendSignupDataFailure(error))});
    };
};

