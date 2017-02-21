import * as types from '../../constants/actionTypes';
import * as actions from '../UserActions';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import utils from '../../utils/authUtils';

import localStorageMock from '../../constants/testLocalStorage';

// Mocks localStorage - Since it saves headers info to localStorage
if(!window.localStorage) {
   window.localStorage = localStorageMock();
   localStorage = localStorageMock();
}

// Mocks dev env process.env.API_HOST
process.env.API_HOST = "http://localhost:3000";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests User Actions, such as modifying his/her profile data or fetching his/her data from the backend', () => {
    //TODO: Set all required headers on tests - There must be a way to compare headers between the nock mock request and the
    // actual request without nock throwing...
    afterEach(() => {
        nock.cleanAll();
        localStorage.clear();
        window.localStorage.clear();
    })

    it('Should modify user\'s profile data successfully', () => {

        const initialHeaders = {
            "access-token": "111",
            "uid": "example@examplemail.com",
            "client": "53k1237",
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));

        const modifiedUserData = {
            name: "nuevo nombre",
            email: "example@examplemail.com",
            currentPassword: "correctPassword",
            password: "",
            passwordConfirmation: "",
            image: ""     
        };

        const requestModifiedUserData = {
            name: "nuevo nombre",
            email: "example@examplemail.com",
            current_password: "correctPassword",
            password: "",
            password_confirmation: "",
            image: "" 
        }

        const expectedResponse = {
            "status":"success",
            "data":{
                "id":1,
                "name":"nuevo nombre",
                "email":"example@examplemail2.com",
                "image":"",
                "provider":"email",
                "uid":"example@examplemail2.com",
                "nickname":null,
                "created_at":"2016-12-13T12:42:17.461-03:00",
                "updated_at":"2017-02-20T15:13:07.103-03:00"
            }
        };
        //TODO: See how to add headers?
        nock(`${process.env.API_HOST}`)
            .put('/api/auth/', JSON.stringify(requestModifiedUserData))
            .reply(200, expectedResponse);

        const store = mockStore();

        const expectedActions = [
            {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS}
        ];

        return store.dispatch(actions.modifyUserProfileData(modifiedUserData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
    });

    it('Should modify the user\'s profile page unsuccessfully ', () => {
        const initialHeaders = {
            "access-token": "111",
            "uid": "example@examplemail.com",
            "client": "53k1237",
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));

        const modifiedUserData = {
            name: "nuevo nombre",
            email: "example@examplemail.com",
            currentPassword: "wrongPassword",
            password: "",
            passwordConfirmation: "",
            image: ""     
        };

        const requestModifiedUserData = {
            name: "nuevo nombre",
            email: "example@examplemail.com",
            current_password: "wrongPassword",
            password: "",
            password_confirmation: "",
            image: "" 
        };

        const store = mockStore();

        nock(`${process.env.API_HOST}`)
            .put('/api/auth/', JSON.stringify(requestModifiedUserData))
            .reply(422, {message: {errors: "No se pudo actualizar. Ingresaste tu contraseña?"}});

        const expectedActions = [{
            type: types.USER_MODIFY_PROFILE_DATA_FAILURE,
            value: {message: {errors: "No se pudo actualizar. Ingresaste tu contraseña?"}} 
        }];


        return store.dispatch(actions.modifyUserProfileData(modifiedUserData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });


    it('Should modify User Profile Name on input (client side)', () => {
        const expectedAction = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NAME, value: "nuevo nombre"};
        expect(actions.modifyUserProfileDataInputName("nuevo nombre")).toEqual(expectedAction);
    });

    it('Should modify User Profile Email on input (client side)', () => {
        const expectedAction = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_EMAIL, value: "example@email.com"};
        expect(actions.modifyUserProfileDataInputEmail("example@email.com")).toEqual(expectedAction);
    });

    it('Should modify User Profile Email on input (client side)', () => {
        const expectedAction = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD, value: "currentPassword"};
        expect(actions.modifyUserProfileDataInputCurrentPassword("currentPassword")).toEqual(expectedAction);
    });

    it('Should modify User Profile Current Password on input (client side)', () => {
        const expectedAction = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD, value: "currentPassword"};
        expect(actions.modifyUserProfileDataInputCurrentPassword("currentPassword")).toEqual(expectedAction);
    });

    it('Should modify User Profile New Password on input (client side)', () => {
        const expectedAction = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD, value: "newPassword"};
        expect(actions.modifyUserProfileDataInputPassword("newPassword")).toEqual(expectedAction);        
    });

    it('Should modify User Profile New Password Confirmation on input (client side)', () => {
        const expectedAction = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION, value: "newPassword"};
        expect(actions.modifyUserProfileDataInputPasswordConfirmation("newPassword")).toEqual(expectedAction);        
    });


    it('Should fetch a user\'s subscriptions from the backend successfully', () => {
        const initialHeaders = {
            'access-token': '111',
            'uid': 'example@examplemail.com',
            'client': '53k1237',
            'content-type':'application/json',
            'accept':'application/json',
            'accept-encoding':'gzip,deflate',
            'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            'connection':'close'
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));
        
        const expectedResponse = {"hosptail2":46584,"vialidad":60907,"ejemplo modificaciones":52,"Ionico":60949,"27-diciembre":223,"Suscripcion 14-feb":89502,"otra suscripcion 14feb":89492,"edificio":22527,"hospital":11322}
        
        const store = mockStore();
        nock(`${process.env.API_HOST}/api/`)
            .get('/results/subscriptions')
            .reply(200, expectedResponse);

        const expectedActions = [
            {type: types.USER_GET_RESULT_SUBSCRIPTIONS},
            {
             type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS,
             value: expectedResponse
            }
        ];

        return store.dispatch(actions.getUserSubscriptions()).then(response => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
        
    });

    it('Should fetch a user\'s subscriptions from the backend unsuccessfully', () => {
        const initialHeaders = {
            'access-token': '111',
            'uid': 'example@examplemail.com',
            'client': '53k1237',
            'content-type':'application/json',
            'accept':'application/json',
            'accept-encoding':'gzip,deflate',
            'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            'connection':'close'
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));

        const expectedResponse = {"message":{"errors":"Acceso denegado"}};
        const store = mockStore();

        nock(`${process.env.API_HOST}/api/`)
                .get('/results/subscriptions')
                .reply(401, expectedResponse);

        const expectedActions = [
            {type: types.USER_GET_RESULT_SUBSCRIPTIONS},
            {
             type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE,
             value: expectedResponse
            }          
        ];

        return store.dispatch(actions.getUserSubscriptions()).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });     
    });

    it('Should create a new subscription successfully', () => {

        const initialHeaders = {
            'access-token': '111',
            'uid': 'example@examplemail.com',
            'client': '53k1237',
            'content-type':'application/json',
            'accept':'application/json',
            'accept-encoding':'gzip,deflate',
            'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            'connection':'close'
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));
        const store = mockStore();
        const requestData = {result_id: 105063, name: "nuevo2222"};
        const requestBody = {create_subscription: requestData};
        const expectedResponse = {
            "message":{
                "info":"Suscripción guardada exitosamente"
            },
            "subscriptions":{
                "hosptail2":46584,
                "vialidad":60907,
                "ejemplo modificaciones":52,
                "Ionico":60949,
                "27-diciembre":223,
                "Suscripcion 14-feb":89502,
                "otra suscripcion 14feb":89492,
                "nuevo2222":105063,
                "edificio":22527,
                "hospital":11322
            }
        }

        nock(`${process.env.API_HOST}/api/`)
            .post("/results/subscriptions", requestBody)
            .reply(200, expectedResponse);

        const expectedActions = [
            {type: types.USER_CREATE_RESULT_SUBSCRIPTION},
            {
             type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, 
             value: expectedResponse
            }    
        ]
        return store.dispatch(actions.createUserSubscription(requestData.result_id, requestData.name)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });     
    });

    it('Should create a new subscription unsuccessfully', () => {

        const expectedResponse = {
            "message":{
                "errors":"Ya estás suscrito a la licitacion de código externo 994-3-LE17 (Nombre suscripción: nuevo2222)"
            }
        };
        const initialHeaders = {
            'access-token': '111',
            'uid': 'example@examplemail.com',
            'client': '53k1237',
            'content-type':'application/json',
            'accept':'application/json',
            'accept-encoding':'gzip,deflate',
            'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            'connection':'close'
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));
        const store = mockStore();
        const requestData = {result_id: 105063, name: "nuevo2222"};
        const requestBody = {create_subscription: requestData};

        nock(`${process.env.API_HOST}/api/`)
            .post("/results/subscriptions", requestBody)
            .reply(422, expectedResponse);  

        const expectedActions = [
            {type: types.USER_CREATE_RESULT_SUBSCRIPTION},
            {
             type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE, 
             value: expectedResponse
            }    
        ];

        return store.dispatch(actions.createUserSubscription(requestData.result_id, requestData.name)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });    
    });

    it('Should update a user\'s subscription to a result successfully', () => {
        const initialHeaders = {
            'access-token': '111',
            'uid': 'example@examplemail.com',
            'client': '53k1237',
            'content-type':'application/json',
            'accept':'application/json',
            'accept-encoding':'gzip,deflate',
            'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            'connection':'close'
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));
        const store = mockStore();

        const requestData = {old_name: "hosptail2", name: "hospital2"};
        const requestBody = {update_subscription: requestData};
        const expectedResponse = {"message":{"info":"Actualizado exitosamente"},"subscriptions":{"vialidad":60907,"ejemplo modificaciones":52,"Ionico":60949,"27-diciembre":223,"Suscripcion 14-feb":89502,"otra suscripcion 14feb":89492,"nuevo2222":105063,"hospital2":46584,"edificio":22527,"hospital":11322}};
        const expectedActions = [
            {type: types.USER_UPDATE_RESULT_SUBSCRIPTION},
            {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value: expectedResponse}
        ];

        nock(`${process.env.API_HOST}/api/`)
            .put("/results/subscriptions", requestBody)
            .reply(200, expectedResponse);

        return store.dispatch(actions.updateUserSubscription(requestData.old_name, requestData.name)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });   

    });

    it('Should update a user\'s subscription to a result unsuccessfully', () => {

        const initialHeaders = {
            'access-token': '111',
            'uid': 'example@examplemail.com',
            'client': '53k1237',
            'content-type':'application/json',
            'accept':'application/json',
            'accept-encoding':'gzip,deflate',
            'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            'connection':'close'
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));
        const store = mockStore();

        const requestData = {old_name: "hosptail2", name: "hospital2"};
        const requestBody = {update_subscription: requestData};
        const expectedResponse = {message: {errors: "Error, este nombre ya existe"}};
        const expectedActions = [
            {type: types.USER_UPDATE_RESULT_SUBSCRIPTION},
            {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE, value: expectedResponse}
        ];

        nock(`${process.env.API_HOST}/api/`)
            .put("/results/subscriptions", requestBody)
            .reply(422, expectedResponse);

        return store.dispatch(actions.updateUserSubscription(requestData.old_name, requestData.name)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  
    });

    it('Should delete a user\'s subscription to a result successfully', () => {
        const initialHeaders = {
            'access-token': '111',
            'uid': 'example@examplemail.com',
            'client': '53k1237',
            'content-type':'application/json',
            'accept':'application/json',
            'accept-encoding':'gzip,deflate',
            'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            'connection':'close'
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));
        const store = mockStore();
        const expectedResponse = {
            "message":{
                "info":"Suscripción cancelada exitosamente"
            },
            "subscriptions":{
                "vialidad":60907,
                "ejemplo modificaciones":52,
                "Ionico":60949,
                "27-diciembre":223,
                "Suscripcion 14-feb":89502,
                "otra suscripcion 14feb":89492,
                "hospital2":46584,
                "edificio":22527,
                "hospital":11322
            }
        };

        const requestData = {name: "nuevo2222"};
        const requestBody = {destroy_subscription: requestData};
        const expectedActions = [
            {type: types.USER_DELETE_RESULT_SUBSCRIPTION},
            {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value: expectedResponse}
        ];

        nock(`${process.env.API_HOST}/api/`)
            .delete("/results/subscriptions", requestBody)
            .reply(200, expectedResponse);

        return store.dispatch(actions.deleteUserSubscription(requestData.name)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  


    });

    it('Should delete a user\'s subscription to a result unsuccessfully', () => {



    });


})

//     // DELETE RESULTS
// export const deleteUserSubscriptionSuccess = (value) => {
//     return {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value};
// }
// export const deleteUserSubscriptionFailure = (value) => {
//     return {type: types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE, value};
// }

// export const deleteUserSubscription = (name) => {


//     return (dispatch, getState) => {
//         dispatch({type: types.USER_DELETE_RESULT_SUBSCRIPTION});
//         userApi.deleteSubscription({destroy_subscription: {name}}).then(response => {
//                                     dispatch(deleteUserSubscriptionSuccess(response));
//                                 })
//                             .catch(error => {
//                                 dispatch(deleteUserSubscriptionFailure(error));
//                             });
//     }

// }

// //CRUD SEARCHES

//     //GET SEARCHES
// export const getUserSearchesSuccess = (value) => {
//     return {type: types.USER_GET_SEARCHES_SUCCESS, value};
// }

// export const getUserSearchesFailure = (value) => {
//     return {type: types.USER_GET_SEARCHES_FAILURE, value};
// }

// export const getUserSearches = () => {

//     return (dispatch) => {
  
//         userApi.getSearches().then(response => {
//                                     dispatch(getUserSearchesSuccess(response));
//                                 })
//                             .catch(error => {
//                                 dispatch(getUserSearchesFailure(error));
//                             });
//     }
// }

//     // CREATE SEARCHES (POST) 
// export const createUserSearchesSuccess = (value) => {
//     return {type: types.USER_CREATE_SEARCHES_SUCCESS, value};
// }

// export const createUserSearchesFailure = (value) => {
//     return {type: types.USER_CREATE_SEARCHES_FAILURE, value};
// }

// export const createUserSearches = (state, name) => {
//     return (dispatch) => {

//         let value = objectAssign({}, state)
//         delete value.organismosPublicosFilteredSubset;
//         let search = {value, name};

//         userApi.createSearches({search}).then(response => {
//                                     dispatch(createUserSearchesSuccess(response));
//                                 })
//                             .catch(error => {
//                                 dispatch(createUserSearchesFailure(error));
//                             });
//     }
// }

//     // UPDATE SEARCHES (PUT)
// export const updateUserSearchesSuccess = (value) => {
//     return {type: types.USER_UPDATE_SEARCHES_SUCCESS, value};
// }

// export const updateUserSearchesFailure = (value) => {
//     return {type: types.USER_UPDATE_SEARCHES_FAILURE, value};
// }

// export const updateUserSearches = (newValues, searchId, searchName) => {
//            // props.updateSearch(this.state, props.searchId, props.searchName);
//     return (dispatch, getState) => {
//         let search = {
//             newValues,
//             searchId,
//             searchName
//         }
//         userApi.updateSearches({search}).then(response => {
//                                     dispatch(updateUserSearchesSuccess(response));
//                                 })
//                             .catch(error => {
//                                 dispatch(updateUserSearchesFailure(error));
//                             });
//     }
// }

//     //DESTROY SEARCHES (DELETE)

// export const deleteUserSearchesSuccess = (value) => {
//     return {type: types.USER_DELETE_SEARCHES_SUCCESS, value};
// }
// export const deleteUserSearchesFailure = (value) => {
//     return {type: types.USER_DELETE_SEARCHES_FAILURE, value};
// }
// export const deleteUserSearches = (id) => {
  
//     return (dispatch) => {
//         //gets the id of the UserSearch that was clicked according to its index, from the redux store
//       // let id = Object.values({getState}.getState().userSearches.fetched.id)[index]
//         userApi.deleteSearches({search: {id}})
//                             .then(response => {
//                                     dispatch(deleteUserSearchesSuccess(response));
//                                 })
//                             .catch(error => {
//                                 dispatch(deleteUserSearchesFailure(error));
//                             });
//     }
// }

// export const getResultHistorySuccess = (value) => {
//     return {type: types.GET_RESULT_HISTORY_SUCCESS, value};
// }

// export const getResultHistoryFailure = (value) => {
//     return {type: types.GET_RESULT_HISTORY_FAILURE, value};
// }

// export const getResultHistory = (resultId) => {

//     return (dispatch) => {
        
//         dispatch({type: types.GET_RESULT_HISTORY});

//         userApi.getResultHistory(resultId)
//             .then(response => {
//                 dispatch(getResultHistorySuccess(response));
//             })
//             .catch(error => {
//                 dispatch(getResultHistoryFailure(error));
//             })

//     }

// }

// export const getUserNotificationsSuccess = (value) => {
//     return {type: types.USER_GET_NOTIFICATIONS_SUCCESS, value};
// }
// export const getUserNotificationsFailure = (value) => {
//     return {type: types.USER_GET_NOTIFICATIONS_FAILURE, value};
// }

// export const getUserNotifications = () => {
//     return (dispatch) => {
//         return userApi.getNotifications()
//             .then(response => {
//                 dispatch(getUserNotificationsSuccess(response));
//                 })
//             .catch(error => {
//                     dispatch(getUserNotificationsFailure(error))
//                 });
//     }
// }


// export const deleteUserNotificationSuccess = (value) => {
//     return {type: types.USER_DELETE_NOTIFICATION_SUCCESS, value};
// }

// export const deleteUserNotificationFailure = (value) => {
//     return {type: types.USER_DELETE_NOTIFICATION_FAILURE, value};
// } 

// export const deleteUserNotification = (id) => {

//     let notification = {
//         notification_id: id
//     }

//     return dispatch => {
//         return userApi.deleteNotification({notification})
//             .then(response => {
//                 dispatch(deleteUserNotificationSuccess(response))
//             })
//             .catch(error => {
//                 dispatch(deleteUserNotificationFailure(error))
//             });
//     }


// }