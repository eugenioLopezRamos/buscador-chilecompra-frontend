import * as types from './actionTypes';
import userAPI from '../api/userApi';
import utils from '../utils/authUtils';
import objectAssign from 'object-assign';
// MODIFIY USER DATA API CALLS

export const modifyUserProfileDataSuccess = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS, value}
};

export const modifyUserProfileDataFailure = (error) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, error}
};

export const modifyUserProfileData = () => {
    return (dispatch, getState) => {
        let state = {getState}.getState().modifiedUserData;
        let body = {
                    name: state.name,
                    email: state.email,
                    current_password: state.currentPassword,
                    password: state.password,
                    password_confirmation: state.passwordConfirmation,
                    image: state.image
        }

        userAPI.updateUserInfo(body)
            .then(response => {
                //TODO
                if(response.status >= 200 && response.status < 300) {
                    let headers = utils.headerToObject(response);
                    utils.saveToStorage(headers);
                    return dispatch(modifyUserProfileDataSuccess(response.json()));
                }else {
                    return dispatch(modifyUserProfileDataFailure(response));
                };
            })
            .catch(error => {dispatch(modifyUserProfileDataFailure(error))});

    };
};


// MODIFY USER DATA INPUTS

export const modifyUserProfileDataInputName = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NAME, value};
}

export const modifyUserProfileDataInputImage = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_IMAGE, value};
}

export const modifyUserProfileDataInputEmail = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_EMAIL, value};
}
export const modifyUserProfileDataInputCurrentPassword = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD, value }
}

export const modifyUserProfileDataInputPassword = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD, value};
}

export const modifyUserProfileDataInputPasswordConfirmation = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION, value}
}

// CRUD RESULTS
    //GET RESULTS
export const getUserResultsSuccess = (value) => {
    return {type: types.USER_GET_RESULTS_SUCCESS, value}
};

export const getUserResultsFailure = (value) => {
    return {type: types.USER_GET_RESULTS_FAILURE, value}
};

export const getUserResults = () => {

    return (dispatch) => {
        dispatch({type: types.USER_GET_RESULTS});
        userAPI.getResults().then(response => {
                                dispatch(getUserResultsSuccess(response));
                                })
                            .catch(error => {
                                dispatch(getUserResultsFailure(error));
                            });
    }
};

    //CREATE RESULTS (POST)
export const createUserResultsSuccess = (value) => {
    return {type: types.USER_CREATE_RESULTS_SUCCESS, value}
};


export const createUserResultsFailure = (value) => {


    return {type: types.USER_CREATE_RESULTS_FAILURE, value}
};

export const createUserResults = (name) => {

    return (dispatch, getState) => {
        
        let results = {getState}.getState().searchResults.map(e => {return JSON.parse(e).id});

        userAPI.createResults({results, name}).then(response => {
                                    dispatch(createUserResultsSuccess(response));
                                })
                            .catch(error => {
                                dispatch(createUserResultsFailure(error));
                            });
    }
};

    // UPDATE RESULTS (PUT)
export const updateUserResultsSuccess = (value) => {
    return {type: types.USER_UPDATE_RESULTS_SUCCESS, value};
};

export const updateUserResultsFailure = (value) => {
    return {type: types.USER_UPDATE_RESULTS_FAILURE, value};
};

export const updateUserResults = () => {

    return (dispatch, getState) => {
        let result = {getState}.getState().userResults.update;
        userAPI.updateResults(result).then(response => {
                                    dispatch(updateUserResultsSuccess(response));
                                })
                            .catch(error => {
                                dispatch(updateUserResultsFailure(error));
                            });
    }
};
    // DESTROY RESULTS (DELETE)
export const destroyUserResultsSuccess = (value) => {
    return {type: types.USER_DELETE_RESULTS_SUCCESS, value};
}
export const destroyUserResultsFailure = (value) => {
    return {type: types.USER_DELETE_RESULTS_FAILURE, value};
}

export const deleteUserResults = () => {

    return (dispatch, getState) => {
        let resultValues = {getState}.getState().userResults.delete;

        let result = {results: resultValues};

        userAPI.updateResults(result).then(response => {
                                    dispatch(deleteUserResultsSuccess(response));
                                })
                            .catch(error => {
                                dispatch(deleteUserResultsFailure(error));
                            });
    }

}

//CRUD SEARCHES

    //GET SEARCHES
export const getUserSearchesSuccess = (value) => {
    return {type: types.USER_GET_SEARCHES_SUCCESS, value};
}

export const getUserSearchesFailure = (value) => {
    return {type: types.USER_GET_SEARCHES_FAILURE, value};
}

export const getUserSearches = () => {

    return (dispatch) => {
  
        userAPI.getSearches().then(response => {
                                    dispatch(getUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(getUserSearchesFailure(error));
                            });
    }
}

    // CREATE SEARCHES (POST) 
export const createUserSearchesSuccess = (value) => {
    return {type: types.USER_CREATE_SEARCHES_SUCCESS, value};
}

export const createUserSearchesFailure = (value) => {
    return {type: types.USER_CREATE_SEARCHES_FAILURE, value};
}

export const createUserSearches = (name) => {
    return (dispatch, getState) => {

        let value = objectAssign({}, {getState}.getState().inputFieldValues)
        delete value.organismosPublicosFilteredSubset;
        let search = {value, name};

        userAPI.createSearches({search}).then(response => {
                                    dispatch(createUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(createUserSearchesFailure(error));
                            });
    }
}

    // UPDATE SEARCHES (PUT)
export const updateUserSearchesSuccess = (value) => {
    return {type: types.USER_UPDATE_RESULTS_SUCCESS, value};
}

export const updateUserSearchesFailure = (value) => {
    return {type: types.USER_UPDATE_RESULTS_FAILURE, value};
}

export const updateUserSearches = () => {

    return (dispatch, getState) => {
        let searches = {getState}.getState().userSearches.update;
        userAPI.updateSearches(searches).then(response => {
                                    dispatch(updateUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(updateUserSearchesFailure(error));
                            });
    }
}

    //DESTROY SEARCHES (DELETE)

export const deleteUserSearchesSuccess = (value) => {
    return {type: types.USER_DELETE_RESULTS_SUCCESS, value};
}
export const deleteUserSearchesFailure = (value) => {
    return {type: types.USER_DELETE_RESULTS_FAILURE, value};
}
export const deleteUserSearches = () => {
    return (dispatch, getState) => {
        let searches = {getState}.getState().userSearches.delete;
        userAPI.deleteSearches(searches).then(response => {
                                    dispatch(deleteUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(deleteSearchesFailure(error));
                            });
    }
}