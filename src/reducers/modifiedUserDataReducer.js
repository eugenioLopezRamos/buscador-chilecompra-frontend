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
        default:
            return state;
    }
};


export default modifiedUserDataReducer;
