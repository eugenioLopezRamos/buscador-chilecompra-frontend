import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import messagesReducer from '../messagesReducer';
import * as messages from '../../constants/flashMessages';
import * as backendMessages from '../../__mocks__/messagesFromBackendMocks';
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

            // fetch initail user data failure

            action = {type: types.INITIAL_USER_DATA_LOAD_FAILURE};
            expectedValue = objectAssign({}, initialState.messages, {Errores: messages.INITIAL_USER_DATA_LOAD_FAILURE});
            compareResults(action, expectedValue)
            // ONLOAD FETCHERS

            action = {type: types.FETCH_ESTADOS_LICITACION_FAILURE };
            let expectedValue = objectAssign({}, initialState.messages, {Errores: messages.FETCH_ESTADOS_LICITACION_FAILURE});
            compareResults(action, expectedValue)

            action = {type: types.FETCH_ORGANISMOS_PUBLICOS_FAILURE };
            expectedValue = objectAssign({}, initialState.messages, {Errores: messages.FETCH_ORGANISMOS_PUBLICOS_FAILURE});
            compareResults(action, expectedValue);

            //FETCH CHILECOMPRA DATA
            action = {type: types.FETCH_CHILECOMPRA_DATA_START };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.FETCH_CHILECOMPRA_DATA_START});
            compareResults(action, expectedValue);

            action = {type: types.FETCH_CHILECOMPRA_DATA_SUCCESS};
            expectedValue = initialState.messages;
            compareResults(action, expectedValue);

            action = {type: types.FETCH_CHILECOMPRA_DATA_FAILURE};
            expectedValue = objectAssign({}, initialState.messages, {Errores: messages.FETCH_CHILECOMPRA_DATA_FAILURE});
            compareResults(action, expectedValue);

            //SIGNUP
            action = {type: types.USER_SEND_SIGNUP_INFO };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_SEND_SIGNUP_INFO});
            compareResults(action, expectedValue);


            action = {type: types.USER_SEND_SIGNUP_INFO_SUCCESS };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_SEND_SIGNUP_INFO_SUCCESS});
            compareResults(action, expectedValue);

            action = {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: messages.USER_SEND_SIGNUP_INFO_FAILURE};
            expectedValue = objectAssign({}, initialState.messages, {Errores: action.message});
            compareResults(action, expectedValue);

            //LOGIN

            action = {type: types.USER_SEND_LOGIN_INFO };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_SEND_LOGIN_INFO});
            compareResults(action, expectedValue);

            action = {type: types.USER_SEND_LOGIN_INFO_SUCCESS };
            expectedValue = initialState.messages;
            compareResults(action, expectedValue);

            action = {type: types.USER_SEND_LOGIN_INFO_FAILURE, message: backendMessages.USER_SEND_LOGIN_INFO_FAILURE};
            expectedValue = objectAssign({}, initialState.messages, {Errores: action.message});
            compareResults(action, expectedValue);

            //LOGOUT
            action = {type: types.USER_LOGOUT};
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_LOGOUT});
            compareResults(action, expectedValue);

            action = {type: types.USER_LOGOUT_SUCCESS};
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_LOGOUT_SUCCESS});
            compareResults(action, expectedValue);

            action = {type: types.USER_LOGOUT_FAILURE };
            expectedValue = objectAssign({}, initialState.messages, {Errores: messages.USER_LOGOUT_FAILURE});
            compareResults(action, expectedValue);

            // VALIDATE TOKEN
            action = {type: types.USER_VALIDATE_TOKEN_FAILURE };
            expectedValue = objectAssign({}, initialState.messages, {Errores: messages.USER_VALIDATE_TOKEN_FAILURE});
            compareResults(action, expectedValue);


            //PROFILE
                //PROFILE DATA
            action = {type: types.USER_MODIFY_PROFILE_DATA };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_MODIFY_PROFILE_DATA });
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS, value: {message: {info: messages.USER_MODIFY_PROFILE_DATA_SUCCESS}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, value: {message: {errors: messages.USER_MODIFY_PROFILE_DATA_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);


                //SUBSCRIPTIONS

                //GET
            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS};
            expectedValue = {Info: initialInfo, Errores: initialErrors};
            compareResults(action, expectedValue);

            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE, value: {message: {errors: backendMessages.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //CREATE
            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_CREATE_RESULT_SUBSCRIPTION });
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: backendMessages.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS}}};
            expectedValue = {Info: action.value.message.info, Errores: initialErrors};
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE, value: {message: {errors: messages.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);
                
                //UPDATE
            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_UPDATE_RESULT_SUBSCRIPTION });
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: backendMessages.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE, value: {message: {errors: backendMessages.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //DELETE
            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION };
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_DELETE_RESULT_SUBSCRIPTION});
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value: {message: {info: backendMessages.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE, value: {message: {errors: backendMessages.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);


                //SEARCHES
                //CREATE
            action = {type: types.USER_CREATE_SEARCHES};
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_CREATE_SEARCHES});
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_SEARCHES_SUCCESS, value: {message: {info: backendMessages.USER_CREATE_SEARCHES_SUCCESS}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_CREATE_SEARCHES_FAILURE, value: {message: {info: backendMessages.USER_CREATE_SEARCHES_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);
                //UPDATE
            action = {type: types.USER_UPDATE_SEARCHES};
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_UPDATE_SEARCHES});
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_SEARCHES_SUCCESS, value: {message: {info: backendMessages.USER_UPDATE_SEARCHES_SUCCESS}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_UPDATE_SEARCHES_FAILURE, value: {message: {errors: backendMessages.USER_UPDATE_SEARCHES_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //DELETE
            action = {type: types.USER_DELETE_SEARCHES};
            expectedValue = objectAssign({}, initialState.messages, {Info: messages.USER_DELETE_SEARCHES});
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_SEARCHES_SUCCESS, value: {message: {info: backendMessages.USER_DELETE_SEARCHES_SUCCESS}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

            action = {type: types.USER_DELETE_SEARCHES_FAILURE, value: {message: {errors: backendMessages.USER_DELETE_SEARCHES_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

                //NOTIFICATIONS
                //GET
            action = {type: types.USER_GET_NOTIFICATIONS_FAILURE};
            expectedValue = objectAssign({}, initialState.messages, {Errores: messages.USER_GET_NOTIFICATIONS_FAILURE});
            compareResults(action, expectedValue);

                //DELETE
            action = {type: types.USER_DELETE_NOTIFICATION_FAILURE, value: {message: {errors: backendMessages.USER_DELETE_NOTIFICATION_FAILURE}}};
            expectedValue = setExpectedValue();
            compareResults(action, expectedValue);

        });

    });
});