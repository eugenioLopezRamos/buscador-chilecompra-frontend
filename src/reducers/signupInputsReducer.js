import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const signupInputsReducer = (state = initialState.signupData, action) => {

    let newState = state;
    switch(action.type) {
        
        case types.USER_SIGNUP_INPUT_NAME:
            newState = objectAssign({}, state, {name: action.value});
            return newState;
            
        case types.USER_SIGNUP_INPUT_EMAIL:
            //Here I'll probably put some email validation
            newState = objectAssign({}, state, {email: action.value});
            return newState

        case types.USER_SIGNUP_INPUT_PASSWORD:
            //Length validation goes here
            newState = objectAssign({}, state, {password: action.value});
            return newState

        case types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION:
        //...
            newState = objectAssign({}, state, {password_confirmation: action.value})
            return newState

        default:
            return newState;
    };
    
}
export default signupInputsReducer;