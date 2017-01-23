import initialState from './initialState';
import objectAssign from 'object-assign';
import * as types from '../actions/actionTypes';

export const userNotificationsReducer = (state = initialState.userNotifications, action) => {
    switch(action.type) {
        case types.USER_GET_NOTIFICATIONS_SUCCESS: 
            return objectAssign({}, state, action.value);
        case types.USER_GET_NOTIFICATIONS_FAILURE:
            return objectAssign({}, state);
        case types.USER_DELETE_NOTIFICATIONS_SUCCESS:
            return objectAssign({}, state, action.value);
        case types.USER_DELETE_NOTIFICATIONS_FAILURE:
            return objectAssign({}, state);
        default:
            return state;
    }



}