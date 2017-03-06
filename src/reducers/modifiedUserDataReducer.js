import * as types from '../constants/actionTypes';
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

        case types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD:
            return objectAssign({}, state, {currentPassword: action.value});

        case types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD:
            return objectAssign({}, state, {password: action.value});

        case types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION:
            return objectAssign({}, state, {passwordConfirmation: action.value});

            //THESE ARE ON LOGIN
        case types.USER_SEND_LOGIN_INFO_SUCCESS:


            return objectAssign({}, 
                                state, 
                                {name: action.response.name, 
                                 email: action.response.email,
                                image: action.response.image});

        case types.USER_VALIDATE_TOKEN_SUCCESS:
        // TODO: Probably try to normalize this a bit, probably on the backend?
            return objectAssign({}, 
                                state, 
                                {
                                 name: action.response.body.data.name,
                                 currentPassword: "",
                                 password: "", 
                                 passwordConfirmation: "",
                                 email: action.response.body.data.email,
                                 image: action.response.body.data.image
                                });

         case types.USER_VALIDATE_TOKEN_FAILURE:
            return objectAssign({}, 
                                state, 
                                {
                                 currentPassword: ""
                                });

        case types.USER_MODIFY_PROFILE_DATA_SUCCESS:
            return objectAssign({}, state, {currentPassword: ""})
        case types.USER_LOGOUT_SUCCESS:
            return initialState.modifiedUserData;


        default:
            return state;
    }
};


export default modifiedUserDataReducer;
