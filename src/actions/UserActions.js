import * as types from './actionTypes';

// API CALLS

export const modifyUserProfileDataSuccess = () => {
    return {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS}
};

export const modifyUserProfileDataFailure = (error) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, error}
};

export const modifyUserProfileData = () => {
    return (dispatch, {state}) => {

        let body = state.getState().updateUser

        userAPI.updateUserInfo()
            .then(response => {
                if(response.status >= 200 && response.status < 300) {
                    return dispatch(modifyUserProfileDataSuccess());
                }else {
                    return dispatch(modifyUserProfileDataFailure(response.status));
                };
            })
            .catch(error => {dispatch(modifyUserProfileDataFailure(error))});

    };
};


// INPUTS

export const modifyUserProfileDataInputName = (value) => {
    console.log("value", value);
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NAME, value};
}

export const modifyUserProfileDataInputImage = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_IMAGE, value};
}

export const modifyUserProfileDataInputEmail = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_EMAIL, value};
}

export const modifyUserProfileDataInputPassword = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_PASSWORD, value};
}

export const modifyUserProfileDataInputPasswordConfirmation = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_PASSWORD_CONFIRMATION, value}
}