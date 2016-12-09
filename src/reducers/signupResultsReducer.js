import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const signupResultsReducer = (state = initialState.signupResult, action) => {

    let newState = state;
    switch(action.type) {
        case types.USER_SEND_SIGNUP_INFO_SUCCESS:
            
            newState = {message: action.message, result: action.value};
            return newState;
            
        case types.USER_SEND_SIGNUP_INFO_FAILURE:
            newState = {message: action.message, result: action.value};
        
        // case types.USER_LOGIN_SUCCESS...
        // case types.USER_LOGIN_FAILURE...
           
        default:
            return newState;
    };
    
}
export default signupResultsReducer;
