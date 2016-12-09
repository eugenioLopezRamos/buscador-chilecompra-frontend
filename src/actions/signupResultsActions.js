import * as types from './actionTypes';
import signup from '../api/signup';


export const sendSignupDataSuccess = (resp) => {
    console.log("response signup", resp);

    return {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: resp.message, value: resp.result};
};

export const sendSignupDataFailure = (resp) => {

 //   let message = `${resp.statusText} - ${resp.status}`
    return {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: resp.errors, value: resp.result};
};

//Probably need to add a new action for network errors or w/else

export const sendSignupData = () => {
    return function(dispatch, getState){
        const state = {getState};
        return signup.sendSignupInfo(state)
                      .then(response => { 
                        if(response) {
                            console.log("response action", response);
                            dispatch(sendSignupDataSuccess(response));
                        }else {
                            dispatch(sendSignupDataFailure(response));
                        }
                        
                        })
                      .catch(error => { dispatch(sendSignupDataFailure(error))});
    };
};

