import React from 'react';
import {shallow} from 'enzyme';
import UpdateSearchMenu from '../UpdateSearchMenu';

function setup() {
    const props = {
        handleSearches: jest.fn()
    }

    const wrapper = shallow(<UpdateSearchMenu {...props}/>)

    return {wrapper, props};
}

describe('Component', () => {
    const {wrapper, props} = setup();

    describe('UpdateSearchMenu', () => {
        it('Should render self and subcomponents', () => {

            //root
            expect(wrapper.find('div.prompt-buttons-container').length).toEqual(1);
            const button = wrapper.find('button.btn.btn-primary.prompt-menu-button');

            //button
            expect(button.length).toEqual(1);
            expect(typeof button.props().onClick).toEqual("function");
            expect(button.text()).toEqual("Guardar cambios");

        });

        it('Should invoke functions', () => {

            const button = wrapper.find('button.btn.btn-primary.prompt-menu-button'); 
            expect(props.handleSearches.mock.calls.length).toEqual(0);
            button.props().onClick()
            expect(props.handleSearches.mock.calls.length).toEqual(1);

        });
    });
});
