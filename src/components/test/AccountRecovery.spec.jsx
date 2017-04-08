import React from 'react';
import {shallow} from 'enzyme';
import {AccountRecovery} from '../AccountRecovery.jsx';

function setup() {

    const props = {
        sendRecoverAccount: jest.fn()
    };

    const wrapper = shallow(<AccountRecovery {...props}/>);

    return {wrapper, props};
}

describe('Components', () => {

    const {wrapper, props} = setup();

    it('should correctly render self and subcomponents', () => {

        //root is rendered
        expect(wrapper.find('.introduction.container.jumbotron').length).toEqual(1);

        //label is rendered
        expect(wrapper.find('.recovery-description').length).toEqual(1);
        expect(wrapper.find('.recovery-description').at(0).text()).toEqual("Ingresa tu email para poder reestablecer tu contraseña:");

        //email label
        expect(wrapper.find('.signup-label').length).toEqual(1);
        expect(wrapper.find('.signup-label').at(0).text()).toEqual("Email");

        //button
        const buttons = wrapper.find('button.btn.btn-primary.col-xs-8.col-xs-offset-2.col-sm-3.col-sm-offset-3');
        expect(buttons.length).toEqual(1);
        expect(buttons.at(0).text()).toEqual("Enviar información");

    });

    it('Should correctly invoke functions', () => {
        const buttons = wrapper.find('button.btn.btn-primary.col-xs-8.col-xs-offset-2.col-sm-3.col-sm-offset-3');
        
        //submit default is prevented
        let mockEvent = {preventDefault: () => {}}
        expect(buttons.at(0).props().onSubmit(mockEvent)).toEqual("default prevented");

        //click fn works
        expect(props.sendRecoverAccount.mock.calls.length).toEqual(0);
        buttons.at(0).props().onClick();
        expect(props.sendRecoverAccount.mock.calls.length).toEqual(1);

        expect(wrapper.instance().state).toEqual({email: ""});

        // input works
        let input = wrapper.find('input').at(0);
        let exampleEmail = "example@example.com";
        input.props().onChange({
            target: {
                value: exampleEmail
            }
        });
 
        expect(wrapper.update().instance().state).toEqual({email: exampleEmail})
    });


});