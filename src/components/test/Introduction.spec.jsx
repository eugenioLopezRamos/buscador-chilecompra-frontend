import React from 'react';
import {shallow} from 'enzyme';
import {Introduction} from '../Introduction';

function setup() {
    //TODO: Make signup use message from the base store
    const props = {
        isAuthenticated: false,
        signupResult: {message: null, result: null},
        signupInfo: {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        },
        signupInputActions: {
            signupInputsName: jest.fn(),
            signUpInputsEmail: jest.fn(),
            signupInputsPassword: jest.fn(),
            signupInputsPasswordConf: jest.fn()
        },
        signupResultsActions:{
            sendSignUpDate: jest.fn()
        }
    }

    const wrapper = shallow(<Introduction {...props}/>);

    return {wrapper, props};
}


describe('Component', () => {

    describe('Introduction', () =>{
        const {wrapper, props} = setup();
        it('Should render self and subcomponents', () => {
            //root
            expect(wrapper.find('.container.jumbotron').length).toEqual(1);
            const h2 = wrapper.find('h2.text-center')
            expect(h2.length).toEqual(1);
            expect(h2.text()).toEqual('¿Qué es buscador ChileCompra?');
            const introductionText = wrapper.find('div.text-center');
            expect(introductionText.length).toEqual(1);
            expect(introductionText.text()).toEqual('Buscador Chilecompra es una app que te permite informarte fácilmente de las licitaciones que te interesan. Busca, guarda, y recibe notificaciones cuando aparecen nuevas licitaciones.')
            
            const signupForm = wrapper.find('SignupForm');
            expect(signupForm.length).toEqual(1);
            expect(signupForm.props().inputActions).toEqual(props.signupInputActions);
            expect(signupForm.props().signupResult).toEqual(props.signupResult);
            expect(signupForm.props().signupInfo).toEqual(props.signupInfo);
            expect(signupForm.props().resultsActions).toEqual(props.signupResultsActions);

        });
    });


});