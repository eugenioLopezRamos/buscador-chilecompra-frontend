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
        const expectedResponse = {message: {errors: "Error al cancelar la suscripción"}};

        const requestData = {name: "nuevo2222"};
        const requestBody = {destroy_subscription: requestData};
        const expectedActions = [
            {type: types.USER_DELETE_RESULT_SUBSCRIPTION},
            {type: types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE, value: expectedResponse}
        ];

        nock(`${process.env.API_HOST}/api/`)
            .delete("/results/subscriptions", requestBody)
            .reply(422, expectedResponse);

        return store.dispatch(actions.deleteUserSubscription(requestData.name)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  


    });

    it('Should get a user\'s stored searches successfully', () => {
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
        const expectedResponse = {"searches":{"name":["13feb22222","siempre"],"value":[{"offset":0,"endDate":"2017-01-30T13:58:36.000Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-01-30T13:58:36.000Z","rutProveedor":"11111111","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"va","selectedEstadoLicitacion":"","selectedOrganismoPublico":"7016"},{"offset":0,"endDate":"2017-02-13T17:36:21.125Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-13T17:36:21.125Z","rutProveedor":"","alwaysToToday":true,"palabrasClave":"","alwaysFromToday":true,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"}],"id":[114,115]}}
        
        nock(`${process.env.API_HOST}/api/`)
            .get("/searches")
            .reply(200, expectedResponse);

        const expectedActions = [
            {type: types.USER_GET_SEARCHES},
            {type: types.USER_GET_SEARCHES_SUCCESS, value: expectedResponse}
        ]

        return store.dispatch(actions.getUserSearches()).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  

    });

    it('Should get a user\'s stored searches unsuccessfully', () => {
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
        const expectedResponse = {"message":{"errors":"Acceso denegado"}};    

        nock(`${process.env.API_HOST}/api/`)
            .get("/searches")
            .reply(401, expectedResponse);

        const expectedActions = [
            {type: types.USER_GET_SEARCHES},
            {type: types.USER_GET_SEARCHES_FAILURE, value: expectedResponse}
        ]

        return store.dispatch(actions.getUserSearches()).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  

    });

    it('Should create a new stored search successfully', () => {
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
        const requestBody = {"search":{"value":{"organismosPublicosFilter":"","selectedOrganismoPublico":"*","codigoLicitacion":"","startDate":"2017-02-21T21:48:40.889Z","alwaysFromToday":false,"endDate":"2017-02-21T21:48:40.889Z","alwaysToToday":false,"palabrasClave":"","selectedEstadoLicitacion":"","rutProveedor":"","offset":0,"order_by":{"fields":["FechaCreacion"],"order":"descending"}},"name":"MYPARAMS"}}

        const expectedResponse = {"message":{"info":{"guardado con éxito":["MYPARAMS"]},"errors":{"repetidos":[],"errores":[]}},"searches":{"name":["MYPARAMS","13feb22222","siempre"],"value":[{"offset":0,"endDate":"2017-02-21T21:48:40.889Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-21T21:48:40.889Z","rutProveedor":"","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},{"offset":0,"endDate":"2017-01-30T13:58:36.000Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-01-30T13:58:36.000Z","rutProveedor":"11111111","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"va","selectedEstadoLicitacion":"","selectedOrganismoPublico":"7016"},{"offset":0,"endDate":"2017-02-13T17:36:21.125Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-13T17:36:21.125Z","rutProveedor":"","alwaysToToday":true,"palabrasClave":"","alwaysFromToday":true,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"}],"id":[116,114,115]}}
        
        nock(`${process.env.API_HOST}/api/`)
            .post("/searches")
            .reply(200, expectedResponse);
        
        const expectedActions = [
            {type: types.USER_CREATE_SEARCHES},
            {type: types.USER_CREATE_SEARCHES_SUCCESS, value: expectedResponse}
        ]

        return store.dispatch(actions.createUserSearches()).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  

    });

    it('Should create a new stored search unsuccessfully', () => {
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
        const requestBody = {"search":{"value":{"organismosPublicosFilter":"","selectedOrganismoPublico":"*","codigoLicitacion":"","startDate":"2017-02-21T21:48:40.889Z","alwaysFromToday":false,"endDate":"2017-02-21T21:48:40.889Z","alwaysToToday":false,"palabrasClave":"","selectedEstadoLicitacion":"","rutProveedor":"","offset":0,"order_by":{"fields":["FechaCreacion"],"order":"descending"}},"name":"MYPARAMS"}}

        const expectedResponse = {"message":{"errors":"Acceso denegado"}};           
        nock(`${process.env.API_HOST}/api/`)
            .post("/searches")
            .reply(401, expectedResponse);
        
        const expectedActions = [
            {type: types.USER_CREATE_SEARCHES},
            {type: types.USER_CREATE_SEARCHES_FAILURE, value: expectedResponse}
        ]

        return store.dispatch(actions.createUserSearches()).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  

    });

    it('Should update a user\'s search successfully', () => {
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

        const requestBody = {"search":{"newValues":{"offset":0,"endDate":"2017-02-22T14:03:36.762Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-22T14:03:36.761Z","rutProveedor":"","alwaysToToday":true,"palabrasClave":"","alwaysFromToday":true,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},"searchId":116,"searchName":"MYPARAMS"}};

        const expectedResponse = {"message":{"info":{"Modificado exitosamente":["MYPARAMS"]}},"searches":{"name":["MYPARAMS","2017-02-21 19:41:49 -0300","13feb22222","siempre","asdsd"],"value":[{"offset":0,"endDate":"2017-02-22T14:03:36.762Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-22T14:03:36.761Z","rutProveedor":"","alwaysToToday":true,"palabrasClave":"","alwaysFromToday":true,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},{"offset":0,"endDate":"2017-02-21T22:41:27.957Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-21T22:41:27.957Z","rutProveedor":"","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},{"offset":0,"endDate":"2017-01-30T13:58:36.000Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-01-30T13:58:36.000Z","rutProveedor":"11111111","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"va","selectedEstadoLicitacion":"","selectedOrganismoPublico":"7016"},{"offset":0,"endDate":"2017-02-13T17:36:21.125Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-13T17:36:21.125Z","rutProveedor":"","alwaysToToday":true,"palabrasClave":"","alwaysFromToday":true,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},{"offset":0,"endDate":"2017-02-21T22:50:41.492Z","order_by":{"order":"descending","fields":["FechaCreacion"]},"startDate":"2017-02-21T22:50:41.492Z","rutProveedor":"","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"}],"id":[116,117,114,115,118]}}; 
        
        nock(`${process.env.API_HOST}/api/`)
            .put("/searches", JSON.stringify(requestBody))
            .reply(200, expectedResponse);
        
        const expectedActions = [
            {type: types.USER_UPDATE_SEARCHES},
            {type: types.USER_UPDATE_SEARCHES_SUCCESS, value: expectedResponse}
        ]
        let values = requestBody.search.newValues;
        let searchName = requestBody.search.searchName;
        let searchId = requestBody.search.searchId;

        return store.dispatch(actions.updateUserSearches(values, searchId, searchName)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  


    });
    it('Should update a user\'s search unsuccessfully', () => {
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

        const requestBody = {"search":{"newValues":{"offset":0,"endDate":"2017-02-22T14:03:36.762Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-22T14:03:36.761Z","rutProveedor":"","alwaysToToday":true,"palabrasClave":"","alwaysFromToday":true,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},"searchId":116,"searchName":"MYPARAMS"}};

        const expectedResponse = {"message":{"errors":"Acceso denegado"}};

        nock(`${process.env.API_HOST}/api/`)
            .put("/searches", JSON.stringify(requestBody))
            .reply(401, expectedResponse);
        
        const expectedActions = [
            {type: types.USER_UPDATE_SEARCHES},
            {type: types.USER_UPDATE_SEARCHES_FAILURE, value: expectedResponse}
        ]
        let values = requestBody.search.newValues;
        let searchName = requestBody.search.searchName;
        let searchId = requestBody.search.searchId;

        return store.dispatch(actions.updateUserSearches(values, searchId, searchName)).then(response => {
                    expect(store.getActions()).toEqual(expectedActions);
                });  
    });

    it('Should delete a user\'s stored search successfully', () => {
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
        const expectedResponse = {"message":{"info":{"Borrado exitosamente":["MYPARAMS"]}},"searches":{"name":["2017-02-21 19:41:49 -0300","13feb22222","siempre","asdsd"],"value":[{"offset":0,"endDate":"2017-02-21T22:41:27.957Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-21T22:41:27.957Z","rutProveedor":"","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},{"offset":0,"endDate":"2017-01-30T13:58:36.000Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-01-30T13:58:36.000Z","rutProveedor":"11111111","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"va","selectedEstadoLicitacion":"","selectedOrganismoPublico":"7016"},{"offset":0,"endDate":"2017-02-13T17:36:21.125Z","order_by":{"order":"descending","fields":[]},"startDate":"2017-02-13T17:36:21.125Z","rutProveedor":"","alwaysToToday":true,"palabrasClave":"","alwaysFromToday":true,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"},{"offset":0,"endDate":"2017-02-21T22:50:41.492Z","order_by":{"order":"descending","fields":["FechaCreacion"]},"startDate":"2017-02-21T22:50:41.492Z","rutProveedor":"","alwaysToToday":false,"palabrasClave":"","alwaysFromToday":false,"codigoLicitacion":"","organismosPublicosFilter":"","selectedEstadoLicitacion":"","selectedOrganismoPublico":"*"}],"id":[117,114,115,118]}};
        
        const requestBody = {"search":{"id":116}};

        nock(`${process.env.API_HOST}/api/`)
            .delete("/searches", JSON.stringify(requestBody))
            .reply(200, expectedResponse);
        
        let searchId = requestBody.search.id;
        const expectedActions = [
            {type: types.USER_DELETE_SEARCHES},
            {type: types.USER_DELETE_SEARCHES_SUCCESS, value: expectedResponse}
        ]

        return store.dispatch(actions.deleteUserSearches(searchId)).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  




    });

    it('Should delete a user\'s stored search unsuccessfully', () => {
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
        const expectedResponse = {"message":{"errors":"Acceso denegado"}};

        const requestBody = {"search":{"id":116}};

        nock(`${process.env.API_HOST}/api/`)
            .delete("/searches", JSON.stringify(requestBody))
            .reply(401, expectedResponse);
        
        let searchId = requestBody.search.id;
        const expectedActions = [
            {type: types.USER_DELETE_SEARCHES},
            {type: types.USER_DELETE_SEARCHES_FAILURE, value: expectedResponse}
        ]

        return store.dispatch(actions.deleteUserSearches(searchId)).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  
    });

    it('Should get a result\'s history successfully', () => {
        //note that results can only be used with GET
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
        const resultId = 60907;
        //Yes, its gigantic
        const expectedResponse = [{"id":49506,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":null,"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Publicada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-24T18:00:00","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":null,"CodigoEstado":5,"EstadoEtapas":"0","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":107,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"6","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-01-25T19:01:04.577"},"created_at":"2017-01-25T19:01:10.808-03:00","updated_at":"2017-01-25T19:01:10.808-03:00"},{"id":60907,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":null,"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Cerrada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-24T18:00:00","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":null,"CodigoEstado":6,"EstadoEtapas":"0","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-01-31T09:39:39.453"},"created_at":"2017-01-31T09:39:41.771-03:00","updated_at":"2017-01-31T09:39:41.771-03:00"},{"id":61180,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":null,"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Cerrada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-24T18:00:00","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":null,"CodigoEstado":6,"EstadoEtapas":"0","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-01-31T11:00:12.813"},"created_at":"2017-01-31T11:00:13.923-03:00","updated_at":"2017-01-31T11:00:13.923-03:00"},{"id":61700,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":null,"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Cerrada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-24T18:00:00","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":null,"CodigoEstado":6,"EstadoEtapas":"0","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-01-31T15:00:31.333"},"created_at":"2017-01-31T15:00:35.243-03:00","updated_at":"2017-01-31T15:00:35.243-03:00"},{"id":62877,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":null,"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Cerrada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-24T18:00:00","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":null,"CodigoEstado":6,"EstadoEtapas":"0","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-01-31T19:00:37.01"},"created_at":"2017-01-31T19:00:40.238-03:00","updated_at":"2017-01-31T19:00:40.238-03:00"},{"id":89550,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":{"Cantidad":5000.0,"RutProveedor":"3.037.565-3","MontoUnitario":2690.0,"NombreProveedor":"MARCOS ALEJANDRO SEGUICH BARRIENTOS"},"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Adjudicada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-14T11:30:46.207","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":{"Tipo":2,"Fecha":"2017-02-14T00:00:00","Numero":"JP. DV. MAG Nº 42","UrlActa":"http://www.mercadopublico.cl/Procurement/Modules/RFB/StepsProcessAward/PreviewAwardAct.aspx?qs=SJ/HCCyjgAOr9Q5Z3J9R+U3i1VQ4ZbZizsoW5se3ZlE=","NumeroOferentes":1},"CodigoEstado":8,"EstadoEtapas":"1","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-02-14T13:14:10.647"},"created_at":"2017-02-14T13:14:11.986-03:00","updated_at":"2017-02-14T13:14:11.986-03:00"},{"id":89612,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":{"Cantidad":5000.0,"RutProveedor":"3.037.565-3","MontoUnitario":2690.0,"NombreProveedor":"MARCOS ALEJANDRO SEGUICH BARRIENTOS"},"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Adjudicada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-14T11:30:46.207","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":{"Tipo":2,"Fecha":"2017-02-14T00:00:00","Numero":"JP. DV. MAG Nº 42","UrlActa":"http://www.mercadopublico.cl/Procurement/Modules/RFB/StepsProcessAward/PreviewAwardAct.aspx?qs=SJ/HCCyjgAOr9Q5Z3J9R+U3i1VQ4ZbZizsoW5se3ZlE=","NumeroOferentes":1},"CodigoEstado":8,"EstadoEtapas":"1","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-02-14T13:16:58.73"},"created_at":"2017-02-14T13:17:03.371-03:00","updated_at":"2017-02-14T13:17:03.371-03:00"},{"id":89626,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":{"Cantidad":5000.0,"RutProveedor":"3.037.565-3","MontoUnitario":2690.0,"NombreProveedor":"MARCOS ALEJANDRO SEGUICH BARRIENTOS"},"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Adjudicada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-14T11:30:46.207","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":{"Tipo":2,"Fecha":"2017-02-14T00:00:00","Numero":"JP. DV. MAG Nº 42","UrlActa":"http://www.mercadopublico.cl/Procurement/Modules/RFB/StepsProcessAward/PreviewAwardAct.aspx?qs=SJ/HCCyjgAOr9Q5Z3J9R+U3i1VQ4ZbZizsoW5se3ZlE=","NumeroOferentes":1},"CodigoEstado":8,"EstadoEtapas":"1","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-02-14T13:18:08.483"},"created_at":"2017-02-14T13:18:10.563-03:00","updated_at":"2017-02-14T13:18:10.563-03:00"},{"id":90379,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":{"Cantidad":5000.0,"RutProveedor":"3.037.565-3","MontoUnitario":2690.0,"NombreProveedor":"MARCOS ALEJANDRO SEGUICH BARRIENTOS"},"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Adjudicada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-14T11:30:46.207","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":{"Tipo":2,"Fecha":"2017-02-14T00:00:00","Numero":"JP. DV. MAG Nº 42","UrlActa":"http://www.mercadopublico.cl/Procurement/Modules/RFB/StepsProcessAward/PreviewAwardAct.aspx?qs=SJ/HCCyjgAOr9Q5Z3J9R+U3i1VQ4ZbZizsoW5se3ZlE=","NumeroOferentes":1},"CodigoEstado":8,"EstadoEtapas":"1","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-02-14T15:00:19.44"},"created_at":"2017-02-14T15:00:21.122-03:00","updated_at":"2017-02-14T15:00:21.122-03:00"},{"id":91386,"value":{"Listado":[{"Tipo":"LE","Items":{"Listado":[{"Cantidad":5000.0,"Categoria":"Productos derivados de minerales, plantas y animales / Tierra y piedra / Piedras","Correlativo":1,"Descripcion":"Material granular de acuerdo a especificaciones mencionadas en N°9_ \"Requerimientos técnicos y otras cláusulas\" _ BASES TECNICAS. Cotizar precio neto x metro cúbico. ","Adjudicacion":{"Cantidad":5000.0,"RutProveedor":"3.037.565-3","MontoUnitario":2690.0,"NombreProveedor":"MARCOS ALEJANDRO SEGUICH BARRIENTOS"},"UnidadMedida":"Metro Cúbico","CodigoProducto":11111611,"NombreProducto":"Grava","CodigoCategoria":"11111600"}],"Cantidad":1},"Obras":"0","Estado":"Adjudicada","Etapas":1,"Fechas":{"FechaFinal":"2017-01-27T12:00:00","FechaCierre":"2017-01-31T09:30:00","FechaInicio":"2017-01-25T16:00:00","FechaCreacion":"2017-01-23T00:00:00","FechasUsuario":null,"FechaPublicacion":"2017-01-25T15:44:41.37","FechaAdjudicacion":"2017-02-14T11:30:46.207","FechaEstimadaFirma":null,"FechaPubRespuestas":"2017-01-30T09:15:00","FechaSoporteFisico":null,"FechaVisitaTerreno":null,"FechaTiempoEvaluacion":null,"FechaActoAperturaTecnica":"2017-01-31T09:31:00","FechaEntregaAntecedentes":null,"FechaEstimadaAdjudicacion":"2017-02-24T18:00:00","FechaActoAperturaEconomica":"2017-01-31T09:31:00"},"Moneda":"CLP","Nombre":"Extracción de áridos Ruta Y-460","Tiempo":null,"Contrato":"2","TipoPago":"2","Comprador":{"RutUnidad":"61.202.000-0","RutUsuario":"6.136.814-0","CargoUsuario":"Jefe Unidad de Gestión","CodigoUnidad":"2066","ComunaUnidad":"Punta Arenas","NombreUnidad":"Dirección de Vialidad - XII Región - Provincia de Magallanes","RegionUnidad":"Región de Magallanes y de la Antártica","CodigoUsuario":"464781","NombreUsuario":"Misael Crucicevich Mimica","CodigoOrganismo":"7248","DireccionUnidad":"J.J. Perez 05047, Villa Las Nieves","NombreOrganismo":"MOP - Dirección de Vialidad"},"Informada":0,"Modalidad":1,"TomaRazon":"0","CodigoTipo":1,"EsBaseTipo":0,"Estimacion":2,"Descripcion":"Extracción de áridos para efectuar trabajos de recebo en la Ruta Y-460, sector Cruce Fabres (Cruce Ruta 9 Norte altura Km 97 a la Ruta Y-50), entre los km 0 al 22 (Varios Sectores), Provincia de Magallanes y Antártica Chilena.","EsRenovable":0,"FechaCierre":null,"Adjudicacion":{"Tipo":2,"Fecha":"2017-02-14T00:00:00","Numero":"JP. DV. MAG Nº 42","UrlActa":"http://www.mercadopublico.cl/Procurement/Modules/RFB/StepsProcessAward/PreviewAwardAct.aspx?qs=SJ/HCCyjgAOr9Q5Z3J9R+U3i1VQ4ZbZizsoW5se3ZlE=","NumeroOferentes":1},"CodigoEstado":8,"EstadoEtapas":"1","UnidadTiempo":"1","CodigoExterno":"1070-3-LE17","MontoEstimado":16100000.0,"ExtensionPlazo":0,"DireccionVisita":"","SubContratacion":"1","CantidadReclamos":108,"DireccionEntrega":"","TipoConvocatoria":"1","VisibilidadMonto":1,"ObservacionContract":null,"DiasCierreLicitacion":"0","EmailResponsablePago":"osvaldo.barria@mop.gov.cl","FuenteFinanciamiento":"31.02.004","TipoDuracionContrato":" ","NombreResponsablePago":"Osvaldo Barria Oyarzo","ValorTiempoRenovacion":"0","TiempoDuracionContrato":"0","UnidadTiempoEvaluacion":1,"EstadoPublicidadOfertas":1,"FonoResponsableContrato":"56-61-2612090-","JustificacionPublicidad":"","PeriodoTiempoRenovacion":" ","ProhibicionContratacion":"Se prohibe subcontratación debido a que el producto debe ser de buena calidad, lo cual lo garantiza el Proveedor que presente la oferta.","EmailResponsableContrato":"mario.alvarez@mop.gov.cl","NombreResponsableContrato":"Mario Alvarez Gallardo","JustificacionMontoEstimado":"","UnidadTiempoDuracionContrato":1,"UnidadTiempoContratoLicitacion":"1"}],"Version":"v1","Cantidad":1,"FechaCreacion":"2017-02-14T19:00:46.723"},"created_at":"2017-02-14T19:00:47.853-03:00","updated_at":"2017-02-14T19:00:47.853-03:00"}]

        nock(`${process.env.API_HOST}/api/results/`)
            .get(`/history?id=${resultId}`)
            .reply(200, expectedResponse);
        const expectedActions = [
            {type: types.GET_RESULT_HISTORY},
            {type: types.GET_RESULT_HISTORY_SUCCESS, value: expectedResponse}
        ];

        return store.dispatch(actions.getResultHistory(resultId)).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  

    });

    it('Should get a result\'s history unsuccessfully', () => {
        //note that results can only be used with GET
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
        const resultId = 999999999;
        const expectedResponse = {"messages": {"errors": "No se encontró dicho registro."}};

        nock(`${process.env.API_HOST}/api/results/`)
            .get(`/history?id=${resultId}`)
            .reply(404, expectedResponse);
        const expectedActions = [
            {type: types.GET_RESULT_HISTORY},
            {type: types.GET_RESULT_HISTORY_FAILURE, value: expectedResponse}
        ];

        return store.dispatch(actions.getResultHistory(resultId)).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  
    });

    it('Should get a user\'s notifications successfully', () => {
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

        const expectedResponse = {"8":"Cambios en la licitación 1851-3-LE17"}
        const store = mockStore();
        nock(`${process.env.API_HOST}/api/notifications`)
            .get('')
            .reply(200, expectedResponse);
        const expectedActions = [
            {type: types.USER_GET_NOTIFICATIONS},
            {type: types.USER_GET_NOTIFICATIONS_SUCCESS, value: expectedResponse}
        ];

        return store.dispatch(actions.getUserNotifications()).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  
    });

    it('Should get a user\'s notifications successfully', () => {
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

        const expectedResponse = {"8":"Cambios en la licitación 1851-3-LE17"}
        const store = mockStore();
        nock(`${process.env.API_HOST}/api/notifications`)
            .get('')
            .reply(200, expectedResponse);
        const expectedActions = [
            {type: types.USER_GET_NOTIFICATIONS},
            {type: types.USER_GET_NOTIFICATIONS_SUCCESS, value: expectedResponse}
        ];

        return store.dispatch(actions.getUserNotifications()).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  
    });

    it('Should get a user\'s notifications unsuccessfully', () => {
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
        nock(`${process.env.API_HOST}/api/notifications`)
            .get('')
            .reply(401, expectedResponse);
        const expectedActions = [
            {type: types.USER_GET_NOTIFICATIONS},
            {type: types.USER_GET_NOTIFICATIONS_FAILURE, value: expectedResponse}
        ];

        return store.dispatch(actions.getUserNotifications()).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  
    });

    it('Should delete a user\'s notification successfully', () => {
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
        const requestBody = {"notification":{"notification_id":"15"}};
        const expectedResponse = {"message":{"info":"Notificación borrada con éxito"},"notifications":{"8":"Cambios en la licitación 1851-3-LE17"}}

        nock(`${process.env.API_HOST}/api/`)
            .log(console.log)
            .delete('/notifications', requestBody)
            .reply(200, expectedResponse);
        const store = mockStore();
        const expectedActions = [
            {type: types.USER_DELETE_NOTIFICATION},
            {type: types.USER_DELETE_NOTIFICATION_SUCCESS, value: expectedResponse}
        ];
        let notificationId = requestBody.notification.notification_id;

        return store.dispatch(actions.deleteUserNotification(notificationId)).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  
    });

    it('Should delete a user\'s notification unsuccessfully', () => {
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
        const requestBody = {"notification":{"notification_id":"15"}};
        const expectedResponse = {"message":{"errors":"Acceso denegado"}};
        nock(`${process.env.API_HOST}/api/`)
            .log(console.log)
            .delete('/notifications', requestBody)
            .reply(401, expectedResponse);
        const store = mockStore();
        const expectedActions = [
            {type: types.USER_DELETE_NOTIFICATION},
            {type: types.USER_DELETE_NOTIFICATION_FAILURE, value: expectedResponse}
        ];
        let notificationId = requestBody.notification.notification_id;

        return store.dispatch(actions.deleteUserNotification(notificationId)).then(response => {
            expect(store.getActions()).toEqual(expectedActions);
        });  
    });
 
});
