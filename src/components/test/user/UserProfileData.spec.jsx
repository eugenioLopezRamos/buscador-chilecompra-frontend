import React from 'react';
import {shallow} from 'enzyme';
import {UserProfileData} from '../../user/UserProfileData';

function setup() {

    const props = {
        //modifiedUserData is set when logging in a user
        // as the data that comes from the server
        modifiedUserData: {
            id: 1,
            provider: "email",
            uid: "email@example.com",
            name: "test-user",
            nickname: null,
            image: "",
            email: "email@example.com",
            created_at: "2016-12-22T12:42:17.461-03:00",
            updated_at: "2017-02-23T17:14:03.002-03:00"
        },
        userProfileActions: {
            modifyUserProfileDataInputName: jest.fn(),
            modifyUserProfileDataInputImage: jest.fn(),
            modifyUserProfileDataInputEmail: jest.fn(),
            modifyUserProfileDataInputCurrentPassword: jest.fn(),
            modifyUserProfileDataInputPassword: jest.fn(),
            modifyUserProfileDataInputPasswordConfirmation: jest.fn(),
            modifyUserProfileData: jest.fn()
        }
    }

    const wrapper = shallow(<UserProfileData {...props}/>);

    return {
        wrapper,
        props
    }
}


describe('Container', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();

    describe('User Profile Data', () => {
        it('Should render self and subcomponents', () => {
            // component root
            expect(wrapper.find('.jumbotron.text-center').length).toEqual(1);

            // Description label
            expect(wrapper.find('label.user-profile-description').length).toEqual(1);
            expect(wrapper.find('label.user-profile-description').text()).toEqual('Aquí puedes editar los datos de tu perfil');
            // User Data
            expect(wrapper.find('.user-profile-data-update-container').length).toEqual(1);
            expect(wrapper.find('.user-profile-data-field').length).toEqual(instance.showParams.length);
            expect(wrapper.find('label.title.full-width').length).toEqual(instance.showParams.length);
            expect(wrapper.find('input.user-profile-field-input').length).toEqual(instance.showParams.length);
            
            //3 password fields => Current Password, New password, Confirm New Password
            expect(wrapper.find('input[type="password"]').length).toBe(3);
            const inputs = wrapper.find('input.user-profile-field-input');

            inputs.forEach((inputField, index, array) => {
      
                let fieldName = Object.keys(instance.showParams[index])[0];
   
                expect(inputField.props().value).toEqual(props.modifiedUserData[fieldName]);
                expect(typeof inputField.props().onChange).toEqual("function");

                let isPasswordOrEmail = fieldName.match(/password|email/i);

                if(isPasswordOrEmail) {
                    // if its a password or an email, check that the type attribute/prop
                    // changes correctly
                    expect(inputField.props().type).toEqual(isPasswordOrEmail[0].toLowerCase());
                }else {
                    expect(inputField.props().type).toEqual("input");
                };


            });
            // Enviar datos button
            expect(wrapper.find('button.btn.btn-primary.info').length).toEqual(1);
            expect(typeof wrapper.find('button.btn.btn-primary.info').props().onClick).toEqual("function");


        });

        it('Should correctly invoke functions passed as props', () => {
            //TODO: 
            // Add verification on newPassword === confirmNewPassword 
            // Add email REGEX ?

            const inputs = wrapper.find('input.user-profile-field-input');
            const [nameInput, imageInput,
                  emailInput, currentPasswordInput,
                  newPasswordInput, confirmNewPasswordInput] = inputs.map(e => e);

            const isFunctionPropCalled = (functionProp, target, action, actionArgs) => {
                expect(props.userProfileActions[functionProp].mock.calls.length).toEqual(0);

                if(Array.isArray(actionArgs)) {
                    target.simulate.call(null, action, ...actionArgs);
                }else {
                    target.simulate(action, actionArgs);
                }

                expect(props.userProfileActions[functionProp].mock.calls.length).toEqual(1);
            }

            const mockValue = (newValue) => {return {target:{value: newValue}}};
            isFunctionPropCalled("modifyUserProfileDataInputName", nameInput, "change", mockValue("new name"));
            isFunctionPropCalled("modifyUserProfileDataInputImage", imageInput, "change", mockValue("new image"));
            isFunctionPropCalled("modifyUserProfileDataInputEmail", emailInput, "change", mockValue("newemail@email.com"));
            isFunctionPropCalled("modifyUserProfileDataInputCurrentPassword", currentPasswordInput, "change", mockValue("current password"));
            isFunctionPropCalled("modifyUserProfileDataInputPassword", newPasswordInput, "change", mockValue("new password"));
            isFunctionPropCalled("modifyUserProfileDataInputPasswordConfirmation", confirmNewPasswordInput, "change", mockValue("new password"));

        });
    });
});