import * as types from '../actions/actionTypes';
import initialState from './initialState';

const loginReducer = (state = initialState.login, action) => {

    switch(action.type) {
        case types.SEND_LOGIN_INFO_SUCCESS:
            return action.log_user_in
        default:
            return state
    }
}

export default loginReducer;