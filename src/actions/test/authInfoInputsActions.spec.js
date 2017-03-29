import * as types from '../../constants/actionTypes';
import * as actions from '../authInfoInputsActions';

describe('it tests that the inputs for the login component work', () => {

    it('should register input on the email input box', () => {
        const email = "email@example.com";
        const expectedActionsInput = {type: types.USER_LOGIN_EMAIL_INPUT, value: email};
        expect(actions.loginInputEmail(email)).toEqual(expectedActionsInput);

    });

    it('should register input on the password input box', () => {
        const password = "xtrasecret";
        const expectedActionsPassword = {type: types.USER_LOGIN_PASSWORD_INPUT, value: password};

        expect(actions.loginInputPassword(password)).toEqual(expectedActionsPassword);
    });
});
