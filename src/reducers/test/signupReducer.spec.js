import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import signupReducer from '../signupReducer';

describe('Reducers', () => {

    describe('signup reducer', () => {
        
        it('Should return the correct states', () => {
            const reducer = signupReducer;

            //default
            let action = {type: undefined, info: undefined, result: undefined};
            let initialValue = initialState.signup;
            let expectedValue;
            let mockValue;

            expect(initialValue).toEqual(reducer(undefined, action));

            //INPUTS
            mockValue = "signupname-111";
            action = {type: types.USER_SIGNUP_INPUT_NAME, value: mockValue};
            expectedValue = objectAssign({}, initialValue, {info: {name: mockValue}});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "email@email.com";
            action = {type: types.USER_SIGNUP_INPUT_EMAIL, value: mockValue};
            expectedValue = objectAssign({}, initialValue, {info: {email: mockValue}});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "secret-password";
            action = {type: types.USER_SIGNUP_INPUT_PASSWORD, value: mockValue};
            expectedValue = objectAssign({}, initialValue, {info: {password: mockValue}});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "secret-password";
            action = {type: types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION, value: mockValue};
            expectedValue = objectAssign({}, initialValue, {info: {password_confirmation: mockValue}});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "success";
            action = {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: "Successfully signed up!", value: mockValue};
            expectedValue = objectAssign({}, initialValue, {result: {message: action.message, result: action.value}});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "failure";
            action = {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: "Error while trying to sign up", value: mockValue};
            expectedValue = objectAssign({}, initialValue, {result: {message: action.message, result: action.value}});
            expect(expectedValue).toEqual(reducer(undefined, action));          

        });
    });
});