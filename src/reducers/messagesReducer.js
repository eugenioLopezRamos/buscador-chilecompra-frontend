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
    //TODO: DRY this with case fallthrough ?

    switch(action.type) {

        case types.MESSAGES_DELETE_MESSAGES:
            return initialState.messages;
            //TODO: Send signup messages from the server?
            //ONLOAD FETCHERS
        case types.ONLOAD_FETCH_EST_LIC_FAILURE:
            return objectAssign({}, state, {Errores: "Hubo un error al obtener datos de estados licitación desde el servidor, intenta de nuevo"});

        case types.ONLOAD_FETCH_ORG_PUB_FAILURE:
            return objectAssign({}, state, {Errores: "Hubo un error al obtener datos de organismos públicos desde el servidor, intenta de nuevo"});

            //FETCH CHILECOMPRA DATA
        case types.FETCH_CHILECOMPRA_DATA_START:
            return objectAssign({}, state, {Info: "Cargando..."});

        case types.FETCH_CHILECOMPRA_DATA_SUCCESS:
            return initialState.messages;
        
        case types.FETCH_CHILECOMPRA_DATA_FAILURE:
            return objectAssign({}, state, {Errores: "Lo sentimos, no se pudo obtener esa información. Por favor espera un poco e intenta de nuevo"});
            
        //SIGNUP
        case types.USER_SEND_SIGNUP_INFO:
            return objectAssign({}, state, {Info: "Enviando información"});

        case types.USER_SEND_SIGNUP_INFO_SUCCESS:
            return objectAssign({}, state, {Info: "Registrado exitosamente! Revisa tu email para confirmar tu cuenta."});
        
        case types.USER_SEND_SIGNUP_INFO_FAILURE:
            return objectAssign({}, state, {Errores: action.message});

        // LOGIN
        case types.USER_SEND_LOGIN_INFO:
            return objectAssign({}, state, {Info: "Ingresando..."});
        
        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return initialState.messages;

        case types.USER_SEND_LOGIN_INFO_FAILURE:
            return objectAssign({}, state, {Errores: "No se pudo ingresar a la aplicación, por favor intentalo de nuevo"});

        //LOGOUT
        case types.USER_LOGOUT:
            return objectAssign({}, state, {Info: "Cerrando sesión..."});

        case types.USER_LOGOUT_SUCCESS:
            return objectAssign({}, state, {Info: "Has salido de la aplicación"});

        case types.USER_LOGOUT_FAILURE:
            return objectAssign({}, state, {Errores: "No pudimos sacarte de la aplicación, intenta nuevamente"});
        // VALIDATE TOKEN
        case types.USER_VALIDATE_TOKEN_FAILURE:
            return objectAssign({}, state, {Errores: "No se pudo validar tu sesión, por favor vuelve a ingresar"});
            //PROFILE
        case types.USER_MODIFY_PROFILE_DATA:
            return objectAssign({}, state, {Info: "Modificando perfil..."});
        
        case types.USER_MODIFY_PROFILE_DATA_SUCCESS:
        //TODO: Probably will have to move this constants off here
            return objectAssign({}, state, {Info: info});

        case types.USER_MODIFY_PROFILE_DATA_FAILURE:
            return objectAssign({}, state, {Errores: errors});
        
        case types.USER_SEND_RECOVER_ACCOUNT:
            return objectAssign({}, state, {Info: "Enviando información..."});

        case types.USER_SEND_RECOVER_ACCOUNT_SUCCESS:
            return objectAssign({}, state, {Info: action.value.message});

        case types.USER_SEND_RECOVER_ACCOUNT_FAILURE:
            return objectAssign({}, state, {Errores: action.value.errors});

            //SUBSCRIPTIONS
                //GET
        case types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS:
            return state;

        case types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});
                // CREATE
        case types.USER_CREATE_RESULT_SUBSCRIPTION:
            return objectAssign({}, state, {Info: "Creando suscripción..."});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state,  {Info: info, Errores: errors});
                // UPDATE
        case types.USER_UPDATE_RESULT_SUBSCRIPTION:
            return objectAssign({}, state, {Info: "Actualizando información de suscripción"});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});
                //DELETE
        case types.USER_DELETE_RESULT_SUBSCRIPTION:
            return objectAssign({}, state, {Info: "Eliminando suscripción"});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});


            //SEARCHES
                //CREATE
        case types.USER_CREATE_SEARCHES:
            return objectAssign({}, state, {Info: "Guardando parámetros de búsqueda..."});

        case types.USER_CREATE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_CREATE_SEARCHES_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});
                //UPDATE
        case types.USER_UPDATE_SEARCHES:
            return objectAssign({}, state, {Info: "Actualizando información de búsqueda almacenada..."});

        case types.USER_UPDATE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_UPDATE_SEARCHES_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

                //DELETE
        case types.USER_DELETE_SEARCHES:
            return objectAssign({}, state, {Info: "Borrando búsqueda almacenada..."});
        case types.USER_DELETE_SEARCHES_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_SEARCHES_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

            //NOTIFICATIONS
        case types.USER_GET_NOTIFICATIONS_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_GET_NOTIFICATIONS_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_NOTIFICATION:
            return objectAssign({}, state, {Info: "Borrando notificación..."});

        case types.USER_DELETE_NOTIFICATION_SUCCESS:
            return objectAssign({}, state, {Info: info, Errores: errors});

        case types.USER_DELETE_NOTIFICATION_FAILURE:
            return objectAssign({}, state, {Info: info, Errores: errors});

        default:
            return state;

    }
};

export default messagesReducer;




