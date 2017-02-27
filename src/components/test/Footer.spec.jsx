import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../Footer';

function setup() {

    return {wrapper: shallow(<Footer/>)};

}


describe('Component', () => {
    const {wrapper} = setup();

    describe('Footer', () => {

        it('Should correctly render self and subcomponents', () => {

            expect(wrapper.find('.navbar.navbar-inverse.navbar-footer.footer').length).toEqual(1);
            expect(wrapper.find('span.text-center.col-xs-12').length).toEqual(1);
            expect(wrapper.find('span.text-center.col-xs-12').text()).toEqual('Desarrollado por Eugenio López');
            expect(wrapper.find('span.text-center.col-xs-12 a').props().href).toEqual("https://github.com/eugenioLopezRamos/");

        });
    });

});