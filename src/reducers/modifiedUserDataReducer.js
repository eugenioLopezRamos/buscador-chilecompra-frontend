import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';


const modifiedUserDataReducer = (state = initialState.modifiedUserData, action) => {
    switch(action.type) {

        case types.USER_MODIFY_PROFILE_DATA_INPUT_NAME:
            return objectAssign({}, state, {name: action.value});

        case types.USER_MODIFY_PROFILE_DATA_INPUT_IMAGE:
            return objectAssign({}, state, {image: action.value});

        case types.USER_MODIFY_PROFILE_DATA_INPUT_EMAIL:
            return objectAssign({}, state, {email: action.value});

        case types.USER_MODIFY_PROFILE_DATA_INPUT_PASSWORD:
            return objectAssign({}, state, {password: action.value});

        case types.USER_MODIFY_PROFILE_DATA_INPUT_PASSWORD_CONFIRMATION:
            return objectAssign({}, state, {password_confirmation: action.value});


            //THESE ARE ON LOGIN
        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            console.log("login", action)

            return objectAssign({}, 
                                state, 
                                {name: action.response.name, 
                                 email: action.response.email,
                                image: action.response.image});

         case types.USER_LOGOUT_SUCCESS:
            return objectAssign({}, 
                                state, 
                                {name: "", 
                                 email: "",
                                 password: "",
                                 password_confirmation: "",
                                 image: ""
                                });

        default:
            return state;
    }
};


export default modifiedUserDataReducer;
