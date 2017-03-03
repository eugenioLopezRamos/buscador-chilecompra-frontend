import React, {PropTypes} from 'react';
import {shallow} from 'enzyme';
import {Root} from '../Root';
import configureMockStore from 'redux-mock-store';
import routes from '../../routes';
import localStorageMock from '../../constants/testLocalStorage';

if(!window.localStorage) {
   window.localStorage = localStorageMock();
}


const mockStore = configureMockStore();


function setup() {


    const store = mockStore();

    //store in this case is passed as prop instead!
    const props = {
        isAuthenticated: false,
        userData: null,
        store,
        actions: {
            getUserSubscriptions: jest.fn(),
            getUserSearches: jest.fn(),
            getUserNotifications: jest.fn(),
            validateToken: jest.fn(),
            getOrganismosPublicos: jest.fn(),
            getEstadosLicitacion: jest.fn()
        },
        history: {}

    }
    const wrapper = shallow(<Root {...props}/>);
    
    return {wrapper, props};
}


describe('Component', () => {
    const {wrapper, props} = setup();
    describe('Root', () => {

        it('Should render self and subcomponents', () => {
            // root
            const provider = wrapper.find('Provider'); 
            expect(provider.length).toEqual(1);
            expect(provider.props().store).toEqual(props.store);
            // router container div
            expect(wrapper.find('div').length).toEqual(1);

            //router
            const router = wrapper.find('Router');
            expect(router.length).toEqual(1);
            expect(router.props().history).toEqual(props.history);
            expect(router.props().routes).toEqual(routes);

        });

        it('Should invoke functions', () => {

            const checkIfPropFunctionsAreCalled = (action, propAction=action) => {

                expect(props.actions[propAction].mock.calls.length).toEqual(0);
                props.actions[action]();
                expect(props.actions[propAction].mock.calls.length).toEqual(1);
            }

            checkIfPropFunctionsAreCalled("validateToken");
            checkIfPropFunctionsAreCalled("getUserNotifications");
            checkIfPropFunctionsAreCalled("getUserSubscriptions");
            checkIfPropFunctionsAreCalled("getUserSearches");
            checkIfPropFunctionsAreCalled("getOrganismosPublicos");
            checkIfPropFunctionsAreCalled("getEstadosLicitacion");
        });

    });
});

