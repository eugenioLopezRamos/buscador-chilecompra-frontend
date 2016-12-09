import * as types from './actionTypes';
import signup from '../api/signup';


export const sendSignupDataSuccess = (resp) => {
    console.log("response signup", resp);

    return {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: resp.message, value: resp.result};
};

export const sendSignupDataFailure = (resp) => {

 //   let message = `${resp.statusText} - ${resp.status}`
    console.log("FAIL RESP", resp);
    // resp.errors => {"error1": "blabla", "error2": "sth's wrong", "error3":"w/e"}
    let errorsToString = Object.keys(resp.errors).map(key => {
        return `${key} ${resp.errors[key]}`;
    }).join(' \n ');

    console.log("2str", errorsToString);


    return {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: errorsToString, value: resp.result};
};

//Probably need to add a new action for network errors or w/else

export const sendSignupData = () => {
    return function(dispatch, getState){
        const state = {getState};
        return signup.sendSignupInfo(state)
                      .then(response => { 
                        if(response.result === "success") {
                            console.log("response action", response);
                            dispatch(sendSignupDataSuccess(response));
                        }else {
                            dispatch(sendSignupDataFailure(response));
                        }
                        
                        })
                      .catch(error => { dispatch(sendSignupDataFailure(error))});
    };
};

