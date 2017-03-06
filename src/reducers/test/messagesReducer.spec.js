import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import messagesReducer from '../messagesReducer';


describe('Reducers', () => {
 
    describe('messagesReducer', () => {

        it('Should return states correctly', () => {
            let action = {type: undefined, value: undefined}
            let initialErrors = initialState.messages.Errores;
            let initialInfo = initialState.messages.Info;

            const compareResults = (action, expectedValue) => {
                expect(expectedValue).toEqual(messagesReducer(undefined, action));
            }

            const setExpectedValue = () => {

                if(action.value && action.value.message) {
                    let Info = action.value.message.info ? action.value.message.info : initialInfo;
                    let Errores = action.value.message.errors ? action.value.message.errors : initialErrors;

                    return {Info, Errores};
                }
                else {
                    return {Info: initialInfo, Errores: initialErrors};
                }
            }
            
            //Should return  initialState (default case):

            compareResults(action, initialState.messages);

            //Should also return initialState
            action = {type: types.MESSAGES_DELETE_MESSAGES};
            compareResults(action, initialState.messages);


                //PROFILE DATA
            action = {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS, value: {message: {info: "Datos actualizados exitosamente"}}}
            let expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, value: {message: {errors: "No se pudo modificar los datos de perfil"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);


                //SUBSCRIPTIONS
            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS};
            expectedValue = {Info: initialInfo, Errores: initialErrors};
            compareResults(action, expectedValue);

            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE, value: {message: {errors: "No se pudo obtener subscripciones"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: "Suscripción creada con éxito!"}}};
            expectedValue = {Info: action.value.message.info, Errores: initialErrors};
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE, value: {message: {errors: "Error al crear suscripción"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: "Suscripcion actualizada con éxito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE, value: {message: {errors: "Fallo al actualizar suscripción"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: "Suscripción borrada exitosamente"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {errors: "Fallo al borrar suscripción"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);


                //SEARCHES
            action = {type: types.USER_CREATE_SEARCHES_SUCCESS, value: {message: {info: "Busqueda creada con éxito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_SEARCHES_FAILURE, value: {message: {info: "Fallo al crear busqueda"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_SEARCHES_SUCCESS, value: {message: {info: "Busqueda actualizada con exito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_SEARCHES_FAILURE, value: {message: {errors: "Fallo al actualizar busqueda"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_SEARCHES_SUCCESS, value: {message: {info: "Busqueda borrada con exito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_SEARCHES_FAILURE, value: {message: {errors: "Error al borrar busqueda"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //NOTIFICATIONS
            action = {type: types.USER_GET_NOTIFICATIONS_SUCCESS, value: {message: {info: "Notificaciones solicitadas con éxito"}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_GET_NOTIFICATIONS_FAILURE, value: {message: {errors: "Error al intentar obtener notificaciones"}}};
            expectedValue = setExpectedValue();
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