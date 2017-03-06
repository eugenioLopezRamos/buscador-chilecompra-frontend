import initialState from './initialState';
import objectAssign from 'object-assign';
import * as types from '../constants/actionTypes';

export const userSubscriptionsReducer = (state = initialState.userSubscriptions, action) => {

    switch(action.type) {

        case types.USER_GET_RESULT_SUBSCRIPTIONS:
            //TODO: add loading anim
            return state;
        
        case types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS:
            return objectAssign({}, state, action.value);

        case types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE:
            return state;

        case types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS:
            return action.value.subscriptions;
        case types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE:
            return state;
        
        // USER_CREATE... doesnt case here since it only returns a message, that goes into the messages reducer

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS:
            return action.value.subscriptions;

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE:
            return state;

        case types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS:
            return action.value.subscriptions;

        case types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE:
            return action.value.subscriptions;
        case types.USER_LOGOUT_SUCCESS:
            return initialState.userSubscriptions;



        default:
            return state;
    }
}