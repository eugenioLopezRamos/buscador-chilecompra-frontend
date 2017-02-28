import React from 'react'
import {shallow} from 'enzyme';
import Login from '../Login';


function setup() {

    const props = {
        handleChangeEmail: jest.fn(),
        handleChangePassword: jest.fn(),
        handleClickSubmit: jest.fn(),
        loginData: {email: "", password: ""}
    }

    const wrapper = shallow(<Login {...props}/>);

    return {wrapper, props}
}

describe('Component', () => {
    const {wrapper, props} = setup();

    describe('Login', () => {

        it('Should render self and subcomponents', () => {
            //root
            expect(wrapper.find('form.navbar-form.navbar-right').length).toEqual(1);
            
            expect(wrapper.find('span.login-span').length).toEqual(1);
            expect(wrapper.find('span.login-span').text()).toEqual("Tienes cuenta? Ingresa:");

            expect(wrapper.find('div.form-group').length).toEqual(2);
            const inputs = wrapper.find('input.form-control');
            expect(inputs.length).toEqual(2);
            
            expect(inputs.at(0).props().type).toEqual("text");
            expect(inputs.at(0).props().placeholder).toEqual("Email");
            expect(typeof inputs.at(0).props().onChange).toEqual("function")

            expect(inputs.at(1).props().type).toEqual("password");
            expect(inputs.at(1).props().placeholder).toEqual("Contraseña");
            expect(typeof inputs.at(1).props().onChange).toEqual("function");

            const submitButton = wrapper.find('button.btn.btn-success')
            expect(submitButton.length).toEqual(1);
            expect(typeof submitButton.props().onSubmit).toEqual("function");
            expect(typeof submitButton.props().onClick).toEqual("function");

        });

        it('Should invoke functions', () => {

            const callFunctionFromProps = (target, action, actionArgs, propFunction) => {

                expect(propFunction.mock.calls.length).toEqual(0);
                target.props()[action](actionArgs);
                expect(propFunction.mock.calls.length).toEqual(1);

            };
            const inputs = wrapper.find('input.form-control');
            const emailInput = inputs.at(0);
            const passwordInput = inputs.at(1);
            const submitButton = wrapper.find('button.btn.btn-success');

            callFunctionFromProps(emailInput, "onChange", {target: {value:"aaa@example.com"}}, props.handleChangeEmail);
            callFunctionFromProps(passwordInput, "onChange", {target: {value:"s3cr3tp4ssw0rd"}}, props.handleChangePassword);
            callFunctionFromProps(submitButton, "onClick", {preventDefault: () => undefined}, props.handleClickSubmit);
            expect(submitButton.props().onSubmit({preventDefault: () => undefined})).toEqual(null);

        });

    });

});