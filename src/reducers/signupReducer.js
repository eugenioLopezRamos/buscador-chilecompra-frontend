import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const signupReducer = (state = initialState.signup, action) => {
    let newInfo = objectAssign({}, state.info);

    switch(action.type) {
        ////////////// FIRST THE INPUT HANDLERS
        case types.USER_SIGNUP_INPUT_NAME:
            newInfo.name = action.value;
            return objectAssign({}, state, {info: newInfo});
            
        case types.USER_SIGNUP_INPUT_EMAIL:
            //TODO: Email validation;
            newInfo.email = action.value;
            return objectAssign({}, state, {info: newInfo});

        case types.USER_SIGNUP_INPUT_PASSWORD:
            //TODO: Length validation goes here...
            newInfo.password = action.value;
            return objectAssign({}, state, {info: newInfo});

        case types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION:
            //TODO: Format with red border if input >= 0 && != password
            newInfo.password_confirmation = action.value;
            return objectAssign({}, state, {info: newInfo});
            
        /////////////////// AND NOW THE RESULT HANDLERS
        case types.USER_SEND_SIGNUP_INFO_SUCCESS:
        //TODO: Make the keys more understandable...
            return objectAssign({}, state, {info: initialState.signup.info});
            
        case types.USER_SEND_SIGNUP_INFO_FAILURE:

            return state;

        default:
            return state;
    }
    
};
export default signupReducer;
