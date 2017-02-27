import React from 'react';
import Header from '../Header';
import {shallow} from 'enzyme';

import {CollapsibleNavBar} from '../CollapsibleNavBar.jsx';
import {Link} from 'react-router';


function setup() {

  const wrapper = shallow(<Header />);

  return {
    wrapper
  }
}

describe('Component', () => {

    describe('Header', () => {
        const {wrapper} = setup();

        it('Should render self and subcomponents', () => {
        expect(wrapper.find('nav.navbar.navbar-inverse.navbar-fixed-top').length).toEqual(1);
        expect(wrapper.find('div.container').length).toEqual(1);
        expect(wrapper.find('div.navbar-header').length).toEqual(1);
        expect(wrapper.find('Link').length).toEqual(1);
        // CollapsibleNavBar is a connected component, so we have to test it like this
        expect(wrapper.find('Connect(CollapsibleNavBar)').length).toEqual(1);
        

        const link = wrapper.find('Link');
        expect(link.props().to).toEqual("/");
        expect(link.props().className).toEqual('navbar-brand');
        expect(link.dive().find('.navbar-brand').text()).toEqual('Buscador Chilecompra');


        });
    });
});