import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const signupReducer = (state = initialState.signup, action) => {

   // let newState = state;
   // let newInfo = objectAssign({}, state.info);
    //let newResult = objectAssign({}, state.result);

    switch(action.type) {
        ////////////// FIRST THE INPUT HANDLERS
        case types.USER_SIGNUP_INPUT_NAME:

            return objectAssign({}, state, {info: {name: action.value}});
            // newInfo.name = action.value
            // newState = objectAssign({}, state, {info:newInfo});

            // return newState;
            
        case types.USER_SIGNUP_INPUT_EMAIL:
            //Here I'll probably put some email validation...
            return objectAssign({}, state, {info: {email: action.value}});
            // newInfo.email = action.value;
            // newState = objectAssign({}, state, {info:newInfo});
            // return newState

        case types.USER_SIGNUP_INPUT_PASSWORD:
            //TODO: Length validation goes here...
            // newInfo.password = action.value;
            // newState = objectAssign({}, state, {info:newInfo});
            // return newState
            return objectAssign({}, state, {info: {password: action.value}});

        case types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION:
        //...
            // newInfo.password_confirmation = action.value;
            // newState = objectAssign({}, state, {info:newInfo});
            // return newState
            return objectAssign({}, state, {info: {password_confirmation: action.value}});
            
        /////////////////// AND NOW THE RESULT HANDLERS
        case types.USER_SEND_SIGNUP_INFO_SUCCESS:
        //TODO: Make the keys more understandable...
            return objectAssign({}, state, {info: initialState.signup.info},{result: {message: action.message, result: action.value}});

            
        case types.USER_SEND_SIGNUP_INFO_FAILURE:

            return objectAssign({}, state,{result: {message: action.message, result: action.value}});

        default:
            return state;
    };
    
}
export default signupReducer;
