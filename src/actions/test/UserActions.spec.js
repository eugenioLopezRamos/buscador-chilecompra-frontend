import * as types from '../../constants/actionTypes';
import * as actions from '../UserActions';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import nock from 'nock';
import fetch from 'isomorphic-fetch';

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

    afterEach(() => {
        nock.cleanAll();
        localStorage.clear();
    })

    it('should modify user\'s profile data successfully', () => {

        const initialHeaders = {
            "access-token": "111",
            "uid": "example@examplemail.com",
            "client": "53k1237",
        };

        localStorage.setItem("session", JSON.stringify(initialHeaders));

        let modifiedUserData = {
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
        
        nock(`${process.env.API_HOST}`)
            .put('/api/auth/', JSON.stringify(requestModifiedUserData))
            .reply(200, expectedResponse);

        const store = mockStore();
        const requestBody = JSON.stringify(modifiedUserData);

        const expectedActions = [
            {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS}
        ];

        return store.dispatch(actions.modifyUserProfileData(modifiedUserData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
    });
})



// MODIFIY USER DATA API CALLS

// export const modifyUserProfileDataSuccess = (value) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS, value}
// };

// export const modifyUserProfileDataFailure = (error) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, error}
// };

// export const modifyUserProfileData = () => {
//     return (dispatch, getState) => {
//         let state = {getState}.getState().modifiedUserData;
//         let body = {
//                     name: state.name,
//                     email: state.email,
//                     current_password: state.currentPassword,
//                     password: state.password,
//                     password_confirmation: state.passwordConfirmation,
//                     image: state.image
//         }

//         userApi.updateUserInfo(body)
//             .then(response => {
//                 //TODO
//                 let headers = utils.headerToObject(response);
//                 utils.saveToStorage(headers);
//                 if(response.status >= 200 && response.status < 300) {
//                     return dispatch(modifyUserProfileDataSuccess(response.json()));
//                 }else {
//                     return dispatch(modifyUserProfileDataFailure(response));
//                 };
//             })
//             .catch(error => {dispatch(modifyUserProfileDataFailure(error))});

//     };
// };


// // MODIFY USER DATA INPUTS

// export const modifyUserProfileDataInputName = (value) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NAME, value};
// }

// export const modifyUserProfileDataInputImage = (value) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_IMAGE, value};
// }

// export const modifyUserProfileDataInputEmail = (value) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_EMAIL, value};
// }
// export const modifyUserProfileDataInputCurrentPassword = (value) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD, value }
// }

// export const modifyUserProfileDataInputPassword = (value) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD, value};
// }

// export const modifyUserProfileDataInputPasswordConfirmation = (value) => {
//     return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION, value}
// }

// // // CRUD RESULTS
// //     //GET A LIST OF STORED RESULTS (JUST IDs)
// export const getUserSubscriptionsSuccess = (value) => {
//     return {type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS, value}
// };

// export const getUserSubscriptionsFailure = (value) => {
//     return {type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE, value}
// };

// export const getUserSubscriptions = () => {

//     return (dispatch) => {
//         dispatch({type: types.USER_GET_RESULT_SUBSCRIPTIONS });

//         userApi.getSubscriptions().then(response => {
//                                 dispatch(getUserSubscriptionsSuccess(response));
//                                 })

//                             .catch(error => {
//                                 dispatch(getUserSubscriptionsFailure(error));
//                             });
//     }
// };

// export const createUserSubscriptionSuccess = (value) => {
//     return {type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, value}
// };

// export const createUserSubscriptionFailure = (value) => {
//     return {type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE, value}
// };

// export const createUserSubscription = (result_id, name) => {
    
//     return (dispatch) => {
//         let create_subscription = {result_id, name}
//         dispatch({type: types.USER_CREATE_RESULT_SUBSCRIPTION });
//         userApi.createSubscription({create_subscription}).then(response => {
//                                 dispatch(createUserSubscriptionSuccess(response));
//                                 })
//                             .catch(error => {
//                                 dispatch(createUserSubscriptionFailure(error));
//                             });
//     }
// };

//     // UPDATE RESULTS (PUT)
// export const updateUserSubscriptionSuccess = (value) => {
//     return {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value};
// };

// export const updateUserSubscriptionFailure = (value) => {
//     return {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE, value};
// };

// export const updateUserSubscription = (old_name, name) => {


//     return (dispatch) => {
//         dispatch({type: types.USER_UPDATE_RESULT_SUBSCRIPTION})
//         userApi.updateSubscription({update_subscription: {old_name, name}}).then(response => {
//                                     dispatch(updateUserSubscriptionSuccess(response));
//                                 })
//                             .catch(error => {
//                                 dispatch(updateUserSubscriptionFailure(error));
//                             });
//     }
// };
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