import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';
import {AuthorizationWrapper} from '../AuthorizationWrapper';
import {Introduction} from '../Introduction';
import Header from '../Header';
import Footer from '../Footer';
import configureMockStore from 'redux-mock-store';
import * as types from '../../constants/actionTypes';

const mockStore = configureMockStore();
const store = mockStore({display: {showNavbar: true, showNotifications: true}});
const contextObject = {
  context: {
   store: store
  },
  childContextTypes: {
    store: React.PropTypes.Object
  }
};

function setup() {
 //   const authorizationWrapper = <AuthorizationWrapper />;
    const introduction = <Introduction key="intro-mock-key" />;

    const props = {
        children:  [
          introduction          
        ],
        
    }


    const wrapper = shallow(<App {...props}/>, contextObject);

    return {
        props,
        wrapper,
    }
}

function altSetup() {
    // tries another child


    const authorizationWrapper = <AuthorizationWrapper key="auth-mock-key" />;
    const altProps = {
        children:  [
            authorizationWrapper,
        ]
    }

    const altWrapper = shallow(<App {...altProps}/>, contextObject);

    return {
        altProps,
        altWrapper
    }
}

describe('Container', () => {

    const {wrapper, props} = setup();
    const {altWrapper, altProps} = altSetup();
    

    describe('App', () => {
        it('Should render self and subcomponents', () => {
            //Index Route
            expect(wrapper.find('#app-component-root').length).toEqual(1);
            expect(wrapper.find('Header').length).toEqual(1);
            expect(wrapper.find('Footer').length).toEqual(1);
            expect(wrapper.find('Introduction').length).toEqual(1);

            // Auth wrapper
            expect(altWrapper.find('#app-component-root').length).toEqual(1);
            expect(altWrapper.find('Header').length).toEqual(1);
            expect(altWrapper.find('Footer').length).toEqual(1);
            expect(altWrapper.find('AuthorizationWrapper').length).toEqual(1);

        });

        it('Should call functions correctly', () => {

            const expectedActions = {type: types.HIDE_ALL}
            

            const root = wrapper.find('#app-component-root').at(0);
            root.simulate("click")
            expect(store.dispatch({type: types.HIDE_ALL})).toEqual(expectedActions);
            


        });
    });
});
