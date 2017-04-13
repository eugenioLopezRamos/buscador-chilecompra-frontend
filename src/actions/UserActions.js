import * as types from '../constants/actionTypes';
import userApi from '../api/userApi';
import utils from '../utils/authUtils';
import objectAssign from 'object-assign';

// INITIAL USER DATA LOAD
export const initialUserDataLoadSuccess = (data) => {
    return {type: types.INITIAL_USER_DATA_LOAD_SUCCESS, data};
};

export const initialUserDataLoadFailure = () => {

    return {type: types.INITIAL_USER_DATA_LOAD_FAILURE};
};

export const initialUserDataLoad = () => {

    return dispatch => {
        dispatch({type: types.INITIAL_USER_DATA_LOAD});
        return userApi.initialDataLoad()
            .then(response => {
                let headers = utils.headerToObject(response);
                utils.saveToStorage(headers);
                if(response && response.status >= 200 && response.status < 300) {
             
                    return response.json().then(response => dispatch(initialUserDataLoadSuccess(response)));
                }else {
                    throw response;
                }
            })
            .catch(error => {
                return error.json().then(() => {
                    dispatch(initialUserDataLoadFailure());
                });
            });
    };

};

// MODIFIY USER DATA API CALLS

export const modifyUserProfileDataSuccess = (response) => {
     
    return {
            type: types.USER_MODIFY_PROFILE_DATA_SUCCESS,
            value: {message: {info: "Datos actualizados exitosamente"}},
            userData: response.data 
           };
};

export const modifyUserProfileDataFailure = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, value};
};

export const modifyUserProfileData = (modifiedUserData) => {

    return (dispatch) => {
        dispatch({type: types.USER_MODIFY_PROFILE_DATA});
        let body = {
                    name: modifiedUserData.name,
                    email: modifiedUserData.email,
                    current_password: modifiedUserData.currentPassword,
                    password: modifiedUserData.password,
                    password_confirmation: modifiedUserData.passwordConfirmation,
                    image: modifiedUserData.image
        };

        return userApi.updateUserInfo(body)
            .then(response => {
                let headers = utils.headerToObject(response);
                utils.saveToStorage(headers);

                if(response && response.status >= 200 && response.status < 300) {
             
                    return response.json().then((response) => dispatch(modifyUserProfileDataSuccess(response)));
                }else {
                    throw response;
                }
            })
            .catch(error => {
                return error.json().then(response => {
                    dispatch(modifyUserProfileDataFailure(response));
                });
            });

    };
};


// MODIFY USER DATA INPUTS

export const modifyUserProfileDataInputName = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NAME, value};
};

export const modifyUserProfileDataInputImage = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_IMAGE, value};
};

export const modifyUserProfileDataInputEmail = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_EMAIL, value};
};
export const modifyUserProfileDataInputCurrentPassword = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD, value };
};

export const modifyUserProfileDataInputPassword = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD, value};
};

export const modifyUserProfileDataInputPasswordConfirmation = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION, value};
};

// // CRUD RESULTS
//     //GET A LIST OF STORED RESULTS (JUST IDs)
export const getUserSubscriptionsSuccess = (value) => {
    return {type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS, value};
};

export const getUserSubscriptionsFailure = (value) => {
    return {type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE, value};
};

export const getUserSubscriptions = () => {

    return (dispatch) => {

        dispatch({type: types.USER_GET_RESULT_SUBSCRIPTIONS });

        return userApi.getSubscriptions().then(response => {
                                dispatch(getUserSubscriptionsSuccess(response));
                                })

                            .catch(error => {
                                dispatch(getUserSubscriptionsFailure(error));
                            });
    };
};

export const createUserSubscriptionSuccess = (value) => {
    return {type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, value};
};

export const createUserSubscriptionFailure = (value) => {
    return {type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE, value};
};

export const createUserSubscription = (result_id, name) => {

    return (dispatch) => {
        dispatch({type: types.USER_CREATE_RESULT_SUBSCRIPTION});
        let create_subscription = {result_id, name};

        return userApi.createSubscription({create_subscription}).then(response => {
                                dispatch(createUserSubscriptionSuccess(response));
                                })
                            .catch(error => {
                                dispatch(createUserSubscriptionFailure(error));
                            });
    };
};

    // UPDATE RESULTS (PUT)
export const updateUserSubscriptionSuccess = (value) => {
    return {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value};
};

export const updateUserSubscriptionFailure = (value) => {
    return {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE, value};
};

export const updateUserSubscription = (old_name, name) => {


    return (dispatch) => {
        dispatch({type: types.USER_UPDATE_RESULT_SUBSCRIPTION});
        return userApi.updateSubscription({update_subscription: {old_name, name}}).then(response => {
                                    dispatch(updateUserSubscriptionSuccess(response));
                                })
                            .catch(error => {
                                dispatch(updateUserSubscriptionFailure(error));
                            });
    };
};
    // DELETE RESULTS
export const deleteUserSubscriptionSuccess = (value) => {
    return {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value};
};
export const deleteUserSubscriptionFailure = (value) => {
    return {type: types.USER_DELETE_RESULT_SUBSCRIPTION_FAILURE, value};
};

export const deleteUserSubscription = (name) => {

    return (dispatch) => {
        dispatch({type: types.USER_DELETE_RESULT_SUBSCRIPTION});
        return userApi.deleteSubscription({destroy_subscription: {name}}).then(response => {
                                    dispatch(deleteUserSubscriptionSuccess(response));
                                })
                            .catch(error => {
                                dispatch(deleteUserSubscriptionFailure(error));
                            });
    };

};

//CRUD SEARCHES

    //GET SEARCHES
export const getUserSearchesSuccess = (value) => {
    return {type: types.USER_GET_SEARCHES_SUCCESS, value};
};

export const getUserSearchesFailure = (value) => {
    return {type: types.USER_GET_SEARCHES_FAILURE, value};
};

export const getUserSearches = () => {

    return (dispatch) => {
        dispatch({type: types.USER_GET_SEARCHES});
        return userApi.getSearches().then(response => {
                                    dispatch(getUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(getUserSearchesFailure(error));
                            });
    };
};

    // CREATE SEARCHES (POST) 
export const createUserSearchesSuccess = (value) => {
    return {type: types.USER_CREATE_SEARCHES_SUCCESS, value};
};

export const createUserSearchesFailure = (value) => {
    return {type: types.USER_CREATE_SEARCHES_FAILURE, value};
};

export const createUserSearches = (state, name) => {
    return (dispatch) => {
        dispatch({type: types.USER_CREATE_SEARCHES});
        let value = objectAssign({}, state);
        delete value.organismosPublicosFilteredSubset;
        let search = {value, name};

        return userApi.createSearches({search}).then(response => {
                                    dispatch(createUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(createUserSearchesFailure(error));
                            });
    };
};

    // UPDATE SEARCHES (PUT)
export const updateUserSearchesSuccess = (value) => {
    return {type: types.USER_UPDATE_SEARCHES_SUCCESS, value};
};

export const updateUserSearchesFailure = (value) => {
    return {type: types.USER_UPDATE_SEARCHES_FAILURE, value};
};

export const updateUserSearches = (values, searchId, searchName) => {

    return (dispatch) => {
        dispatch({type: types.USER_UPDATE_SEARCHES});

        let newValues = objectAssign({}, values);
        delete newValues.organismosPublicosFilteredSubset;
        let search = {
            newValues,
            searchId,
            searchName
        };

       return  userApi.updateSearches({search}).then(response => {
                                    dispatch(updateUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(updateUserSearchesFailure(error));
                            });
    };
};

    //DESTROY SEARCHES (DELETE)

export const deleteUserSearchesSuccess = (value) => {
    return {type: types.USER_DELETE_SEARCHES_SUCCESS, value};
};
export const deleteUserSearchesFailure = (value) => {
    return {type: types.USER_DELETE_SEARCHES_FAILURE, value};
};
export const deleteUserSearches = (id) => {
  
    return (dispatch) => {
        dispatch({type: types.USER_DELETE_SEARCHES});
        //gets the id of the UserSearch that was clicked according to its index, from the redux store
      // let id = Object.values({getState}.getState().userSearches.fetched.id)[index]
       return userApi.deleteSearches({search: {id}})
                            .then(response => {
                                    dispatch(deleteUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(deleteUserSearchesFailure(error));
                            });
    };
};

export const getResultHistorySuccess = (value) => {
    return {type: types.GET_RESULT_HISTORY_SUCCESS, value};
};

export const getResultHistoryFailure = (value) => {
    return {type: types.GET_RESULT_HISTORY_FAILURE, value};
};

export const getResultHistory = (resultId) => {

    return (dispatch) => {
        
        dispatch({type: types.GET_RESULT_HISTORY});

        return userApi.getResultHistory(resultId)
            .then(response => {
                dispatch(getResultHistorySuccess(response));
            })
            .catch(error => {
                dispatch(getResultHistoryFailure(error));
            });

    };

};

export const getUserNotificationsSuccess = (value) => {
    return {type: types.USER_GET_NOTIFICATIONS_SUCCESS, value};
};
export const getUserNotificationsFailure = (value) => {
    return {type: types.USER_GET_NOTIFICATIONS_FAILURE, value};
};

export const getUserNotifications = () => {
    return (dispatch) => {
        dispatch({type: types.USER_GET_NOTIFICATIONS});
        return userApi.getNotifications()
            .then(response => {
                dispatch(getUserNotificationsSuccess(response));
                })
            .catch(error => {
                    dispatch(getUserNotificationsFailure(error));
                });
    };
};


export const deleteUserNotificationSuccess = (value) => {
    return {type: types.USER_DELETE_NOTIFICATION_SUCCESS, value};
};

export const deleteUserNotificationFailure = (value) => {
    return {type: types.USER_DELETE_NOTIFICATION_FAILURE, value};
}; 

export const deleteUserNotification = (id) => {

    let notification = {
        notification_id: id
    };

    return dispatch => {
        dispatch({type: types.USER_DELETE_NOTIFICATION});
        
        return userApi.deleteNotification({notification})
            .then(response => {
                dispatch(deleteUserNotificationSuccess(response));
            })
            .catch(error => {
                dispatch(deleteUserNotificationFailure(error));
            });
    };


};