import React from 'react';
import {shallow} from 'enzyme';
import SignupForm from '../SignupForm';


function setup() {

    const props = {
        signupInfo: {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        },
        inputActions: {
            signupInputsName: jest.fn(),
            signupInputsEmail: jest.fn(),
            signupInputsPassword: jest.fn(),
            signupInputsPasswordConf: jest.fn()
        }
    }

    const wrapper = shallow(<SignupForm {...props}/>);

    return {wrapper, props};

}


describe('Component', () => {
    
    const {wrapper, props} = setup();

    describe('SignupForm', () => {
        
        it('Should render self and subcomponents', () => {
            function checkInputPropValues(input, propName) {
                expect(input.props().value).toEqual(props.signupInfo[propName]);
            }

            //root
            expect(wrapper.find('.signup-form.col-xs-12.col-sm-10.col-sm-offset-1').length).toEqual(1);
            //labels
            const labels = wrapper.find('label.signup-label');
            expect(labels.length).toEqual(4);
            const expectedValues = ["Nombre", "Mail", "Contraseña - mínimo 8 caracteres", "Confirmar contraseña"];
            labels.forEach((label, index) => {
                expect(label.text()).toEqual(expectedValues[index])
            });
            //inputs
            const inputs = wrapper.find('input.signup-input');
            expect(inputs.length).toEqual(4);

            const [inputName, inputEmail, inputPassword, inputPasswordConfirmation] = inputs.map(e => e);

            checkInputPropValues(inputName, "name");
            expect(inputName.props().type).toEqual("textarea");
            expect(inputName.props().placeholder).toEqual("Nombre");
            expect(typeof inputName.props().onChange).toEqual("function");

            checkInputPropValues(inputEmail, "email");
            expect(inputEmail.props().type).toEqual("email");
            expect(inputEmail.props().placeholder).toEqual("Email");
            expect(typeof inputEmail.props().onChange).toEqual("function");


            checkInputPropValues(inputPassword, "password");
            expect(inputPassword.props().type).toEqual("password");
            expect(inputPassword.props().placeholder).toEqual("********");
            expect(typeof inputPassword.props().onChange).toEqual("function");

            checkInputPropValues(inputPasswordConfirmation, "password_confirmation");
            expect(inputPasswordConfirmation.props().type).toEqual("password");
            expect(inputPasswordConfirmation.props().placeholder).toEqual("********");
            expect(typeof inputPasswordConfirmation.props().onChange).toEqual("function");

            const submitButton = wrapper.find('button.btn.btn-primary.btn-lg.col-xs-8.col-xs-offset-2.col-sm-6.col-sm-offset-3');
            expect(submitButton.length).toEqual(1);
            expect(typeof submitButton.props().onClick).toEqual("function");
            expect(typeof submitButton.props().onSubmit).toEqual("function");
            expect(submitButton.text()).toEqual("Enviar información");
        });

        it('Should correctly invoke functions', () => {

            const inputs = wrapper.find('input.signup-input');
            const [inputName, inputEmail, inputPassword, inputPasswordConfirmation] = inputs.map(e => e);

            let mockTarget = {target: {value: "mock"}}
            expect(props.inputActions.signupInputsName.mock.calls.length).toEqual(0);
            inputName.props().onChange(mockTarget);
            expect(props.inputActions.signupInputsName.mock.calls.length).toEqual(1);        

            expect(props.inputActions.signupInputsEmail.mock.calls.length).toEqual(0);
            inputEmail.props().onChange(mockTarget);
            expect(props.inputActions.signupInputsEmail.mock.calls.length).toEqual(1);    

            expect(props.inputActions.signupInputsPassword.mock.calls.length).toEqual(0);
            inputPassword.props().onChange(mockTarget);
            expect(props.inputActions.signupInputsPassword.mock.calls.length).toEqual(1);    

            expect(props.inputActions.signupInputsPasswordConf.mock.calls.length).toEqual(0);
            inputPasswordConfirmation.props().onChange(mockTarget);
            expect(props.inputActions.signupInputsPasswordConf.mock.calls.length).toEqual(1);

            const submitButton = wrapper.find('button.btn.btn-primary.btn-lg.col-xs-8.col-xs-offset-2.col-sm-6.col-sm-offset-3');
            
            expect(submitButton.props().onSubmit({preventDefault: () => null})).toEqual("handle submit");


        });
    });
});