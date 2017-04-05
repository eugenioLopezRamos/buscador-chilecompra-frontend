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
            let expectedInfo = initialState.signup.info;
            let mockValue;
            let existingInput;

            expect(initialValue).toEqual(reducer(undefined, action));

            //INPUTS
            mockValue = "signupname-111";
            action = {type: types.USER_SIGNUP_INPUT_NAME, value: mockValue};
            expectedInfo.name = mockValue;
            expectedValue = objectAssign({}, initialValue, {info: expectedInfo});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "email@email.com";
            action = {type: types.USER_SIGNUP_INPUT_EMAIL, value: mockValue};
            expectedInfo.email = mockValue;
            expectedValue = objectAssign({}, initialValue, {info: expectedInfo});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "secret-password";
            action = {type: types.USER_SIGNUP_INPUT_PASSWORD, value: mockValue};
            expectedInfo.password = mockValue;
            expectedValue = objectAssign({}, initialValue, {info: expectedInfo});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "secret-password";
            action = {type: types.USER_SIGNUP_INPUT_PASSWORD_CONFIRMATION, value: mockValue};
            expectedInfo.password_confirmation = mockValue;
            expectedValue = objectAssign({}, initialValue, {info: expectedInfo});
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = "success";
            action = {type: types.USER_SEND_SIGNUP_INFO_SUCCESS, message: "Successfully signed up!", value: mockValue};
                //simulates the user having entered data into the form
            existingInput = objectAssign({}, initialValue, {info: expectedInfo})
                // form data is cleared after succesful send
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(existingInput, action));

            mockValue = "failure";
            action = {type: types.USER_SEND_SIGNUP_INFO_FAILURE, message: "Error while trying to sign up", value: mockValue};
            // data should not be cleared if user fails to register.
            expectedValue = objectAssign({}, initialValue, {info: expectedInfo});
            expect(expectedValue).toEqual(reducer(existingInput, action));          

        });
    });
});