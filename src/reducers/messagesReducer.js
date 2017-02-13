import * as types from '../actions/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const messagesReducer = (state = initialState.messages, action) => {
    let newState = objectAssign({}, state);
    let newMessages;
    let info = state.info;
    let errors = state.errors;

    if(action.value && action.value.message) {
        info = action.value.message.info || state.info;
        errors = action.value.message.errors || state.errors;
    }
    //TODO: There has to be a way to simplify all this boilerplate...
    // maybe just with
    // case types.TYPE_1:
    // case types.TYPE_2:
    // ...
    // case types.TYPE_N;
    // case types.TYPE_NPLUS1:
    // return objectAssign(...);
    //TODO: DRY this with case fallthrough I guesss....
    switch(action.type) {
        //MESSAGES
        case types.MESSAGES_ADD_MESSAGES:
            //TODO: make this comply to the new "standard"
            //TO BE IMPLEMENTED.... since errors do not always follow the same format...
            newMessages = action.error.errors.full_messages;
            return objectAssign({}, state, {info: newMessages});

        case types.MESSAGES_DELETE_MESSAGES:
            return objectAssign({}, state, initialState.messages);

            //PROFILE
        case types.USER_MODIFY_PROFILE_DATA_SUCCESS:
            return objectAssign({}, state, {info: ["Datos actualizados exitosamente"]});

        case types.USER_MODIFY_PROFILE_DATA_FAILURE:
           // newMessages = action.error.errors.full_messages;
            return objectAssign({}, state, {errors: newMessages});
            
            //SUBSCRIPTIONS
        case types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS:
            return objectAssign({}, state, {info, errors});

        case types.USER_GET_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {info, errors});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {info, errors});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {info, errors});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {info, errors});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {info, errors});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {info, errors});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {info, errors});



            //SEARCHES
        case types.USER_CREATE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {info, errors});

        case types.USER_CREATE_SEARCHES_FAILURE:
            return objectAssign({}, state, {info, errors});
        
        case types.USER_UPDATE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {info, errors});

        case types.USER_UPDATE_SEARCHES_FAILURE:
            return objectAssign({}, state, {info, errors});

        case types.USER_DELETE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {info, errors});  

        case types.USER_DELETE_SEARCHES_FAILURE:
            return objectAssign({}, state, {info, errors});

            //NOTIFICATIONS
        case types.USER_GET_NOTIFICATIONS_SUCCESS:
            return objectAssign({}, state, {info, errors});
        case types.USER_GET_NOTIFICATIONS_FAILURE:
            return objectAssign({}, state, {info, errors});
        case types.USER_DELETE_NOTIFICATION_SUCCESS:
            return objectAssign({}, state, {info, errors});
        case types.USER_DELETE_NOTIFICATION_FAILURE:
            return objectAssign({}, state, {info, errors});

               

        default:
            return state;

    }
}

export default messagesReducer;




