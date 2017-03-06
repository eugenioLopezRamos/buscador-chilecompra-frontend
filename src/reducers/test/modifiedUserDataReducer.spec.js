import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import modifiedUserDataReducer from '../modifiedUserDataReducer';


describe('Reducers', () => {

    describe('modifiedUserDataReducer', () => {

        it('Should correctly return states', () => {
            let action = {type: undefined, value: undefined}
            let initialValue = initialState.modifiedUserData;
            let expectedValue = initialValue;

            const compareResults = (action, expectedValue) => {
                expect(expectedValue).toEqual(modifiedUserDataReducer(undefined, action));
            };

            // returns default
            compareResults(action, expectedValue)
                // INPUTS
            action = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NAME, value: "my name is <NAME>"};
            expectedValue = objectAssign({}, initialValue, {name: action.value});
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_IMAGE, value: "www.image.com/img/image.jpg"};
            expectedValue = objectAssign({}, initialValue, {image: action.value});
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_EMAIL, value: "email@freeemail.com"};
            expectedValue = objectAssign({}, initialValue, {email: action.value});
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_CURRENT_PASSWORD, value: "current-Password-1234"};
            expectedValue = objectAssign({}, initialValue, {currentPassword: action.value});
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD, value: "new-password-4321"};
            expectedValue = objectAssign({}, initialValue, {password: action.value});
            compareResults(action, expectedValue);

            action = {type: types.USER_MODIFY_PROFILE_DATA_INPUT_NEW_PASSWORD_CONFIRMATION, value: "new-password-4321"};
            expectedValue = objectAssign({}, initialValue, {passwordConfirmation: action.value});
            compareResults(action, expectedValue);


                //RESPONSES
            action = {type: types.USER_SEND_LOGIN_INFO_SUCCESS, response: {name: "pedro-perez", email: "aaa@bbb.cl", image: "imgurl.fake/img.jpg"}}
            expectedValue = objectAssign({}, initialValue, action.response);
            compareResults(action, expectedValue);


            let response = {
                body: {
                    data: {
                        name: "username-111",
                        currentPassword: "",
                        password: "",
                        passwordConfirmation: "",
                        email: "email@example.com",
                        image: "imageurl.com/imgs/img.jpg"
                    }
                }
            }
            action  = {type: types.USER_VALIDATE_TOKEN_SUCCESS, response};
            expectedValue = objectAssign({}, initialValue, response.body.data);
            compareResults(action, expectedValue);

            action  = {type: types.USER_VALIDATE_TOKEN_FAILURE};
            expectedValue = objectAssign({}, initialValue, {currentPassword: ""});
            compareResults(action, expectedValue);            

            action  = {type: types.USER_MODIFY_PROFILE_DATA_SUCCESS};
            expectedValue = objectAssign({}, initialValue, {currentPassword: ""});
            compareResults(action, expectedValue);       


            action  = {type: types.USER_MODIFY_PROFILE_DATA_FAILURE};
            expectedValue = initialState.modifiedUserData;
            compareResults(action, expectedValue);       

        });
    });
});