import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const usersReducer = (state = initialState, action) => {
    let newState = state;
    switch(action.type) {
        case types.USER_SEND_REGISTRATION_INFO_SUCCESS:
            
            newState = objectAssign({}, state, {registrationResult: action.value});
            return newState;
        case types.USER_SEND_REGISTRATION_INFO_FAILURE:
            newState = objectAssign({}, state, {registrationResult: action.value});
        
        // case types.USER_LOGIN_SUCCESS...
        // case types.USER_LOGIN_FAILURE...
           
        default:
            return newState;
    };
};


export default usersReducer;