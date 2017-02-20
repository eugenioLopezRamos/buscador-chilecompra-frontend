import * as types from '../../constants/actionTypes';
import * as actions from '../signupInputsActions';

describe('Tests signup input actions', () => {

    it('should give the new value for signup name', () => {
        const expectedAction  = {type: types.USER_SIGNUP_INPUT_NAME, value: "user's name"}
        expect(actions.signupInputsName("user's name")).toEqual(expectedAction);
    });

    it('should give the new value for signup email', () => {
        const expectedAction = {type: types.USER_SIGNUP_INPUT_EMAIL, value: "email@example.com"}
        expect(actions.signupInputsEmail("email@example.com")).toEqual(expectedAction);
    });

    it('should give the new value for signup password', () => {
        const expectedAction = {type: types.USER_SIGNUP_INPUT_PASSWORD, value: "password"}
        expect(actions.signupInputsPassword("password")).toEqual(expectedAction);
    });
    it('should give the new value for signup password confirmation', () => {
        const expectedAction = {type: types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION, value: "password"}
        expect(actions.signupInputsPasswordConf("password")).toEqual(expectedAction);
    });
})
