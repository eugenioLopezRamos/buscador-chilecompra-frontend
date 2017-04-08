import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import messagesReducer from '../messagesReducer';


describe('Reducers', () => {
 
    describe('messagesReducer', () => {

        it('Should make expectedValue === states correctly', () => {
            let action = {type: undefined, value: undefined};
            let initialErrors = initialState.messages.Errores;
            let initialInfo = initialState.messages.Info;

            const compareResults = (action, expectedValue) => {
                expect(expectedValue).toEqual(messagesReducer(undefined, action));
            };

            const setExpectedValue = () => {

                if(action.value && action.value.message) {
                    let Info = action.value.message.info ? action.value.message.info : initialInfo;
                    let Errores = action.value.message.errors ? action.value.message.errors : initialErrors;

                    return {Info, Errores};
                }
                else {
                    return {Info: initialInfo, Errores: initialErrors};
                }
            };
            
            //Should expectedValue =   initialState (default case):

            compareResults(action, initialState.messages);

            //Should also expectedValue =  initialState
            action = {type: types.MESSAGES_DELETE_MESSAGES};
            compareResults(action, initialState.messages);

            // ONLOAD FETCHERS

            action = {type: types.ONLOAD_FETCH_EST_LIC_FAILURE };
            let expectedValue = {Errores: "Hubo un error al obtener datos de estados licitación desde el servidor, intenta de nuevo", Info: []};
            compareResults(action, expectedValue)

            action = {type: types.ONLOAD_FETCH_ORG_PUB_FAILURE };
            expectedValue = {Errores: "Hubo un error al obtener datos de organismos públicos desde el servidor, intenta de nuevo", Info: []};
            compareResults(action, expectedValue);

            //FETCH CHILECOMPRA DATA
            action = {type: types.FETCH_CHILECOMPRA_DATA_START };
            expectedValue = objectAssign({}, initialState.messages, {Info: "Cargando..."});
            compareResults(action, expectedValue);

            action = {type: types.FETCH_CHILECOMPRA_DATA_SUCCESS};
            expectedValue = initialState.messages;
            compareResults(action, expectedValue);

            action = {type: types.FETCH_CHILECOMPRA_DATA_FAILURE};
            expectedValue = objectAssign({}, initialState.messages, {Errores: "Lo sentimos, no se pudo obtener esa información. Por favor espera un poco e intenta de nuevo"});
            compareResults(action, expectedValue);

            //SIGNUP
            action = {type: types.USER_SEND_SIGNUP_INFO };
            expectedValue = objectAssign({}, initialState.messages, {Info: "Enviando información"});
            compareResults(action, expectedValue);


            action = {type: types.USER_SEND_SIGNUP_INFO_SUCCESS };
            expectedValue = objectAssign({}, initialState.messages, {Info: "Registrado exitosamente! Revisa tu email para confirmar tu cuenta."});
            compareResults(action, expectedValue);

            action = {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: "Error al inscribirse"};
            expectedValue = objectAssign({}, initialState.messages, {Errores: action.message});
            compareResults(action, expectedValue);

            //LOGOUT
            action = {type: types.USER_LOGOUT_FAILURE };
            expectedValue = objectAssign({}, initialState.messages, {Errores: "No pudimos sacarte de la aplicación, intenta nuevamente"});
            compareResults(action, expectedValue);

            // VALIDATE TOKEN
            action = {type: types.USER_VALIDATE_TOKEN_FAILURE };
            expectedValue = objectAssign({}, initialState.messages, {Errores: "No se pudo validar tu sesión, por favor vuelve a ingresar"});
            compareResults(action, expectedValue);


            //PROFILE
                //PROFILE DATA
            action = {type: types.USER_MODIFY_PROFILE_DATA };
            expectedValue = objectAssign({}, initialState.messages, {Info: "Modificando perfil..."});
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS, value: {message: {info: "Datos actualizados exitosamente"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, value: {message: {errors: "No se pudo modificar los datos de perfil"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);


                //SUBSCRIPTIONS

                //GET
            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS};
            expectedValue = {Info: initialInfo, Errores: initialErrors};
            compareResults(action, expectedValue);

            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE, value: {message: {errors: "No se pudo obtener subscripciones"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //CREATE
            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION };
            expectedValue = objectAssign({}, initialState.messages, {Info: "Creando suscripción..."});
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: "Suscripción creada con éxito!"}}};
            expectedValue = {Info: action.value.message.info, Errores: initialErrors};
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE, value: {message: {errors: "Error al crear suscripción"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);
                
                //UPDATE
            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION };
            expectedValue = objectAssign({}, initialState.messages, {Info: "Actualizando información de suscripción"});
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: "Suscripcion actualizada con éxito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE, value: {message: {errors: "Fallo al actualizar suscripción"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //DELETE
            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION };
            expectedValue = objectAssign({}, initialState.messages, {Info: "Eliminando suscripción"});
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: "Suscripción borrada exitosamente"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {errors: "Fallo al borrar suscripción"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);


                //SEARCHES
                //CREATE
            action = {type: types.USER_CREATE_SEARCHES};
            expectedValue = objectAssign({}, initialState.messages, {Info: "Guardando parámetros de búsqueda..."});
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_SEARCHES_SUCCESS, value: {message: {info: "Busqueda creada con éxito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_SEARCHES_FAILURE, value: {message: {info: "Fallo al crear busqueda"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);
                //UPDATE
            action = {type: types.USER_UPDATE_SEARCHES};
            expectedValue = objectAssign({}, initialState.messages, {Info: "Actualizando información de búsqueda almacenada..."});
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_SEARCHES_SUCCESS, value: {message: {info: "Busqueda actualizada con exito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_SEARCHES_FAILURE, value: {message: {errors: "Fallo al actualizar busqueda"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //DELETE
            action = {type: types.USER_DELETE_SEARCHES};
            expectedValue = objectAssign({}, initialState.messages, {Info: "Borrando búsqueda almacenada..."});
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_SEARCHES_SUCCESS, value: {message: {info: "Busqueda borrada con exito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_SEARCHES_FAILURE, value: {message: {errors: "Error al borrar busqueda"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //NOTIFICATIONS
                //GET
            action = {type: types.USER_GET_NOTIFICATIONS_SUCCESS, value: {message: {info: "Notificaciones solicitadas con éxito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_GET_NOTIFICATIONS_FAILURE, value: {message: {errors: "Error al intentar obtener notificaciones"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //DELETE
            action = {type: types.USER_DELETE_NOTIFICATION};
            expectedValue = objectAssign({}, initialState.messages, {Info: "Borrando notificación..."});
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_NOTIFICATION_SUCCESS, value: {message: {info: "Notificacion eliminada"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_NOTIFICATION_FAILURE, value: {message: {errors: "Error al intentar borrar notificacion"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

        });

    });
});