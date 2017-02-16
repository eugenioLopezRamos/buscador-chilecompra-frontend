import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';

const signupReducer = (state = initialState.signup, action) => {

    let newState = state;
    let newInfo = objectAssign({}, state.info);
    let newResult = objectAssign({}, state.result);

    switch(action.type) {
        ////////////// FIRST THE INPUT HANDLERS
        case types.USER_SIGNUP_INPUT_NAME:


            newInfo.name = action.value
            newState = objectAssign({}, state, {info:newInfo});

            return newState;
            
        case types.USER_SIGNUP_INPUT_EMAIL:
            //Here I'll probably put some email validation...

            newInfo.email = action.value;
            newState = objectAssign({}, state, {info:newInfo});
            return newState

        case types.USER_SIGNUP_INPUT_PASSWORD:
            //Length validation goes here...
            newInfo.password = action.value;
            newState = objectAssign({}, state, {info:newInfo});
            return newState

        case types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION:
        //...
            newInfo.password_confirmation = action.value;
            newState = objectAssign({}, state, {info:newInfo});
            return newState

            
        /////////////////// AND NOW THE RESULT HANDLERS
        case types.USER_SEND_SIGNUP_INFO_SUCCESS:
            [newInfo.name, newInfo.email, newInfo.password, newInfo.password_confirmation] = ["", "","", ""];
            newState = objectAssign({}, state, {info: newInfo},{result: {message: action.message, result: action.value}});
            return newState;
            
        case types.USER_SEND_SIGNUP_INFO_FAILURE:

            newState = objectAssign({}, state, {info:newInfo}, {result: {message: action.message, result: action.value}});
            return newState;
        // case types.USER_LOGIN_SUCCESS...
        // case types.USER_LOGIN_FAILURE...
           
        default:
            return newState;
    };
    
}
export default signupReducer;
