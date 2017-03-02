import React from 'react';
import {shallow} from 'enzyme';
import {SearchResults} from '../SearchResults';
import {searchResultsMock} from '../../__mocks__/searchResultsMock';
import {searchQueryValuesMock} from  '../../__mocks__/searchResultsMock';
//import {mockSelectedColumns} from '../../__mocks__/searchResultsMock';

function setup() {
    const props = {
        searchQueryValues: searchQueryValuesMock,
        results: searchResultsMock
    }

    const wrapper = shallow(<SearchResults {...props}/>);

    return {wrapper, props}
}

describe('Component', () => {

    describe('SearchResults', () => {
        const {wrapper, props} = setup();
        const instance = wrapper.instance();
        const state = instance.state;

        it('Should render self and subcomponents', () => {

            //root 
            expect(wrapper.find('div.searchResults-container-div').length).toEqual(1);
            
            // JSONschemacheckboxes
            const JSONSchemaCheckboxes = wrapper.find('JSONSchemaCheckboxes')
            expect(JSONSchemaCheckboxes.length).toEqual(1);
            expect(JSONSchemaCheckboxes.props().changeColumns).toEqual(instance.changeColumns);

            //Modal
            const modal = wrapper.find('Modal');
            expect(modal.length).toEqual(1);
            expect(modal.props().isModalShown).toEqual(state.showModal);
            expect(modal.props().modalValue).toEqual(state.enteredSubscriptionName);
            expect(modal.props().handler).toEqual(instance.handleSubscription);
            expect(modal.props().hideModal).toEqual(instance.hideSubscriptionModal);
            expect(modal.props().onInput).toEqual(instance.onSubscriptionNameInput);

            //FullScreenPane
            const fullScreenPane = wrapper.find('FullScreenPane');
            expect(fullScreenPane.length).toEqual(1);
            expect(fullScreenPane.props().show).toEqual(state.fullScreenPane.show);
            expect(fullScreenPane.props().hide).toEqual(instance.hideFullScreenPane);
            expect(fullScreenPane.props().component).toEqual(state.fullScreenPane.component);
            expect(fullScreenPane.props().componentProps).toEqual(state.fullScreenPane.componentProps);
            expect(fullScreenPane.props().menu).toEqual(state.menu);

            const resultsAmountDivs = wrapper.find('div.results-amount');
            expect(resultsAmountDivs.length).toEqual(2);
            expect(resultsAmountDivs.at(0).text()).toEqual(`Se encontraron ${props.results.count} resultados: `);
            expect(resultsAmountDivs.at(1).text()).toEqual(`Mostrando resultados desde el ${parseInt(props.results.offset + 1)} al ${Math.min(props.results.offset + props.results.limit, props.results.count)}`);

            expect(wrapper.find('div.searchResults-container-div > ul').hasClass(instance.animClass)).toBe(true);
            expect(wrapper.find(`div.searchResults-container-div ul.${instance.animClass}`).length).toEqual(1);

            //Result nav buttons
            const resultsNavigatorButtons = wrapper.find('ResultsNavigatorButtons');
            expect(resultsNavigatorButtons.length).toEqual(2);
            expect(resultsNavigatorButtons.at(0)).toEqual(resultsNavigatorButtons.at(1));
            expect(resultsNavigatorButtons.at(0).props().pages).toEqual(parseInt(props.results.count/props.results.limit)+1);
            expect(resultsNavigatorButtons.at(0).props().paginatorButtonClickHandler).toEqual(instance.offsetChangeHandler);
            expect(resultsNavigatorButtons.at(0).props().pageButtonClickHandler).toEqual(instance.setOffsetHandler);
            expect(resultsNavigatorButtons.at(0).props().currentPage).toEqual(parseInt(props.results.offset/props.results.limit));




        });

        it('Should correctly invoke functions', () => {


        });
    });
});
