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
    //GET A LIST OF STORED RESULTS (JUST IDs)
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


    //GET THE DETAIL OF ONE OF THE IDs
export const getStoredResultsSuccess = (value) => {
    return {type: types.USER_GET_STORED_RESULTS_SUCCESS, value}
};

export const getStoredResultsFailure = (value) => {
    return {type: types.USER_GET_STORED_RESULTS_FAILURE, value}
};

export const getStoredUserResults = (resultName) => {

    return function(dispatch) {
        return userAPI.getStoredResults(resultName)
    }.then(response => {
                        dispatch(getStoredResultsSuccess(response)
                        )}
        )
     .catch(error => {
                        dispatch(getStoredResultsFailure(error)
                        )}
            )
}
    //used on the user's profile, no need to pass through redux since its
    //merely presentational and irrelevant to the rest of the app
export const noReduxGetStoredUserResults = (resultName) => {

   // return (dispatch) => {
   //     console.log("resultname2", resultName);
        return userAPI.getStoredResults(resultName)
    //}
}

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
    // DELETE RESULTS
export const deleteUserResultsSuccess = (value) => {
    return {type: types.USER_DELETE_RESULTS_SUCCESS, value};
}
export const deleteUserResultsFailure = (value) => {
    return {type: types.USER_DELETE_RESULTS_FAILURE, value};
}

export const deleteUserResults = (index) => {

    return (dispatch, getState) => {
        let name = Object.keys({getState}.getState().userResults.fetched)[index]
       // let resultValues = {getState}.getState().userResults.delete;

    

        userAPI.deleteResults({results: {name}}).then(response => {
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
    return {type: types.USER_UPDATE_SEARCHES_SUCCESS, value};
}

export const updateUserSearchesFailure = (value) => {
    return {type: types.USER_UPDATE_SEARCHES_FAILURE, value};
}

export const updateUserSearches = (newValues, searchId, searchName) => {
           // props.updateSearch(this.state, props.searchId, props.searchName);
    return (dispatch, getState) => {
        let search = {
            newValues,
            searchId,
            searchName
        }
        userAPI.updateSearches({search}).then(response => {
                                    dispatch(updateUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(updateUserSearchesFailure(error));
                            });
    }
}

    //DESTROY SEARCHES (DELETE)

export const deleteUserSearchesSuccess = (value) => {
    return {type: types.USER_DELETE_SEARCHES_SUCCESS, value};
}
export const deleteUserSearchesFailure = (value) => {
    return {type: types.USER_DELETE_SEARCHES_FAILURE, value};
}
export const deleteUserSearches = (index) => {
  
    return (dispatch, getState) => {
        //gets the id of the UserSearch that was clicked according to its index, from the redux store
       let id = Object.values({getState}.getState().userSearches.fetched.id)[index]
        userAPI.deleteSearches({search: {id}}).then(response => {
                                    dispatch(deleteUserSearchesSuccess(response));
                                })
                            .catch(error => {
                                dispatch(deleteUserSearchesFailure(error));
                            });
    }
}