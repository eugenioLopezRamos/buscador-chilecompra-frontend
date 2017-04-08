import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';
import * as messages from '../constants/flashMessages';

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
    //TODO: DRY this with case fallthrough ?

    switch(action.type) {

        case types.MESSAGES_DELETE_MESSAGES:
            return initialState.messages;
            //TODO: Send signup messages from the server?
            //ONLOAD FETCHERS
        case types.FETCH_ESTADOS_LICITACION_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: messages.FETCH_ESTADOS_LICITACION_FAILURE});

        case types.FETCH_ORGANISMOS_PUBLICOS_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: messages.FETCH_ORGANISMOS_PUBLICOS_FAILURE});

            //FETCH CHILECOMPRA DATA
        case types.FETCH_CHILECOMPRA_DATA_START:
            return objectAssign({}, initialState.messages, {Info: messages.FETCH_CHILECOMPRA_DATA_START});

        case types.FETCH_CHILECOMPRA_DATA_SUCCESS:
            return initialState.messages;
        
        case types.FETCH_CHILECOMPRA_DATA_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: messages.FETCH_CHILECOMPRA_DATA_FAILURE});
            
        //SIGNUP
        case types.USER_SEND_SIGNUP_INFO:
            return objectAssign({}, initialState.messages, {Info: messages.USER_SEND_SIGNUP_INFO});

        case types.USER_SEND_SIGNUP_INFO_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: messages.USER_SEND_SIGNUP_INFO_SUCCESS});
        
        case types.USER_SEND_SIGNUP_INFO_FAILURE:
           return objectAssign({}, initialState.messages, {Errores: action.message});

        // LOGIN
        case types.USER_SEND_LOGIN_INFO:
            return objectAssign({}, initialState.messages, {Info: messages.USER_SEND_LOGIN_INFO});
        
        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return initialState.messages;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: action.message});

        //LOGOUT
        case types.USER_LOGOUT:
            return objectAssign({}, initialState.messages, {Info: messages.USER_LOGOUT});

        case types.USER_LOGOUT_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: messages.USER_LOGOUT_SUCCESS});

        case types.USER_LOGOUT_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: messages.USER_LOGOUT_FAILURE});
        // VALIDATE TOKEN
        case types.USER_VALIDATE_TOKEN_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: messages.USER_VALIDATE_TOKEN_FAILURE});
            //PROFILE
        case types.USER_MODIFY_PROFILE_DATA:
            return objectAssign({}, initialState.messages, {Info: messages.USER_MODIFY_PROFILE_DATA});
        
        case types.USER_MODIFY_PROFILE_DATA_SUCCESS:
        //TODO: Probably will have to move this constants off here
            return objectAssign({}, initialState.messages, {Info: info});

        case types.USER_MODIFY_PROFILE_DATA_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: errors});
        
        case types.USER_SEND_RECOVER_ACCOUNT:
            return objectAssign({}, initialState.messages, {Info: messages.USER_SEND_RECOVER_ACCOUNT});

        case types.USER_SEND_RECOVER_ACCOUNT_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: action.value.message});

        case types.USER_SEND_RECOVER_ACCOUNT_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: action.value.errors});

            //SUBSCRIPTIONS
                //GET
        case types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS:
            return state;

        case types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});
                // CREATE
        case types.USER_CREATE_RESULT_SUBSCRIPTION:
            return objectAssign({}, initialState.messages, {Info: messages.USER_CREATE_RESULT_SUBSCRIPTION});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, initialState.messages,  {Info: info, Errores: errors});
                // UPDATE
        case types.USER_UPDATE_RESULT_SUBSCRIPTION:
            return objectAssign({}, initialState.messages, {Info: messages.USER_UPDATE_RESULT_SUBSCRIPTION});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});
                //DELETE
        case types.USER_DELETE_RESULT_SUBSCRIPTION:
            return objectAssign({}, initialState.messages, {Info: messages.USER_DELETE_RESULT_SUBSCRIPTION});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});


            //SEARCHES
                //CREATE
        case types.USER_CREATE_SEARCHES:
            return objectAssign({}, initialState.messages, {Info: messages.USER_CREATE_SEARCHES});

        case types.USER_CREATE_SEARCHES_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

        case types.USER_CREATE_SEARCHES_FAILURE:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});
                //UPDATE
        case types.USER_UPDATE_SEARCHES:
            return objectAssign({}, initialState.messages, {Info: messages.USER_UPDATE_SEARCHES});

        case types.USER_UPDATE_SEARCHES_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

        case types.USER_UPDATE_SEARCHES_FAILURE:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

                //DELETE
        case types.USER_DELETE_SEARCHES:
            return objectAssign({}, initialState.messages, {Info: messages.USER_DELETE_SEARCHES});
        case types.USER_DELETE_SEARCHES_SUCCESS:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

        case types.USER_DELETE_SEARCHES_FAILURE:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

            //NOTIFICATIONS
        case types.USER_GET_NOTIFICATIONS_FAILURE:
            return objectAssign({}, initialState.messages, {Errores: messages.USER_GET_NOTIFICATIONS_FAILURE});

        case types.USER_DELETE_NOTIFICATION_FAILURE:
            return objectAssign({}, initialState.messages, {Info: info, Errores: errors});

        default:
            return state;

    }
};

export default messagesReducer;




