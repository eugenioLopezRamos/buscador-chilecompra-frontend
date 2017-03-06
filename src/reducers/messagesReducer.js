import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

const messagesReducer = (state = initialState.messages, action) => {

    let info;
    let errors;

    if(action.value && action.value.message) {
       info = action.value.message.info ? action.value.message.info : state.Info;
       errors = action.value.message.errors ? action.value.message.errors : state.Errores;
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

        case types.MESSAGES_DELETE_MESSAGES:
            return initialState.messages;
            
            //PROFILE
        case types.USER_MODIFY_PROFILE_DATA_SUCCESS:
        //TODO: Probably will have to move this constants off here
            return objectAssign({}, state, {Info: ["Datos actualizados exitosamente"]});

        case types.USER_MODIFY_PROFILE_DATA_FAILURE:
            return objectAssign({}, state, {Errores: errors});
            
            //SUBSCRIPTIONS
        case types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS:
            return state;

        case types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state,  {Info: info, Errores: errors});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});



            //SEARCHES
        case types.USER_CREATE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_CREATE_SEARCHES_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});
        
        case types.USER_UPDATE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_UPDATE_SEARCHES_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_SEARCHES_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

            //NOTIFICATIONS
        case types.USER_GET_NOTIFICATIONS_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});
        case types.USER_GET_NOTIFICATIONS_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});
        case types.USER_DELETE_NOTIFICATION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});
        case types.USER_DELETE_NOTIFICATION_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

        default:
            return state;

    }
}

export default messagesReducer;




