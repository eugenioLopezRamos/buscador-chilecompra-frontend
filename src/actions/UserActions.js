import * as types from './actionTypes';
import userAPI from '../api/userApi';
import utils from '../utils/authUtils';
// API CALLS

export const modifyUserProfileDataSuccess = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS, value}
};

export const modifyUserProfileDataFailure = (error) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_FAILURE, error}
};

export const modifyUserProfileData = () => {
    return (dispatch, getState) => {
        let state = {getState};
        let body = state.getState().modifiedUserData;
        console.log("MODIFY BODY", body);

        userAPI.updateUserInfo(body)
            .then(response => {
                console.log("RESPONSE MODIFY DATA", response);

                if(response.status >= 200 && response.status < 300) {
                    let headers = utils.headerToObject(response);
                    utils.saveToStorage(headers);
                    return dispatch(modifyUserProfileDataSuccess(response.json()));
                }else {
                    return dispatch(modifyUserProfileDataFailure(response));
                };
            })
            .catch(error => {console.log("error", error);dispatch(modifyUserProfileDataFailure(error))});

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
export const modifyUserProfileDataInputCurrentPassword = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD, value }
}

export const modifyUserProfileDataInputNewPassword = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD, value};
}

export const modifyUserProfileDataInputNewPasswordConfirmation = (value) => {
    return {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION, value}
}