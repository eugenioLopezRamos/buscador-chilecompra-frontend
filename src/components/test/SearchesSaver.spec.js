import React from 'react';
import {shallow} from 'enzyme';
import SearchesSaver from '../SearchesSaver';

function setup() {

    const props = {
        handleSearches: jest.fn()
    };

    const wrapper = shallow(<SearchesSaver {...props}/>);

    return {wrapper, props};
}


describe('Component', () => {

    describe('SearchesSaver', () => {

        const {wrapper, props} = setup();
        const instance = wrapper.instance();
        const state = instance.state;

        it('Should render self and subcomponents', () => {

            //root
            expect(wrapper.find('div.col-xs-12.no-gutter.save-search-buttons').length).toEqual(1);
            
            //modal
            const modal = wrapper.find('Modal');
            expect(modal.length).toEqual(1);
            expect(modal.props().isModalShown).toBe(state.showModal);
            expect(modal.props().modalValue).toBe(state.enteredSearchName);
            expect(modal.props().handler).toBe(instance.handleSearches);
            expect(modal.props().hideModal).toBe(instance.hideModal);
            expect(modal.props().onInput).toBe(instance.onSearchNameInput);

            const showModalButton = wrapper.find('button.btn.btn-primary.col-xs-6.col-md-4.col-md-offset-4.allow-wrap');
            expect(showModalButton.length).toEqual(1);
            expect(showModalButton.props().onClick).toEqual(instance.showModal);
            expect(showModalButton.text()).toEqual('Guardar parámetros de búsqueda');

            //state
            expect(state.showModal).toEqual(false);
            expect(state.enteredSearchName).toEqual("");

        });

        it('Should invoke functions correctly', () => {

            const modal = wrapper.find('Modal');  
            const showModalButton = wrapper.find('button.btn.btn-primary.col-xs-6.col-md-4.col-md-offset-4.allow-wrap');

            // should make modal shown

            showModalButton.props().onClick();
            expect(instance.state.showModal).toEqual(true);
            
            //should change enteredSearchName
            let mockEvent = {target: {value: "a new search name value"}};
            modal.props().onInput(mockEvent);
            expect(instance.state.enteredSearchName).toEqual(mockEvent.target.value);

            //handle searches
            expect(props.handleSearches.mock.calls.length).toEqual(0);
            modal.props().handler();
            expect(instance.state.showModal).toEqual(false);
            expect(props.handleSearches.mock.calls.length).toEqual(1);

            //open again...
            showModalButton.props().onClick();
            expect(instance.state.showModal).toEqual(true);
            //then check if it closes correctly
            modal.props().hideModal();
            expect(instance.state.showModal).toEqual(false);


        });


    });
});