import React from 'react';
// mount is unusable for me - Takes about 3 mins to test this component alone...
//import {mount} from 'enzyme';
import {shallow} from 'enzyme';
import {SearchResults} from '../SearchResults';
import {searchResultsMock} from '../../__mocks__/searchResultsMock';
import {searchQueryValuesMock} from  '../../__mocks__/searchResultsMock';
//import {mockSelectedColumns} from '../../__mocks__/searchResultsMock';
import {camelCaseToNormalCase} from '../../utils/miscUtils';
import {isPrimitive} from '../../utils/miscUtils';


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

            const tests = (wrapper) => {
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

            // The part that actually has the results in it
            expect(wrapper.find('.results-data-container').length).toEqual(1);
            
            //Titles/headers
            expect(wrapper.find('.title-container').length).toEqual(1);
            const movableContainer = wrapper.find('span.movable-title-container')
            expect(movableContainer.length).toEqual(1);
       
            //TODO: see some way of testing this with {mount} without it taking 3 minutes per component?
            //this ref is used to make the titles move when scrolling the scrollbar (if the columns don't fit a single screen)
            //And yes, it's...not quite optimal to do it like this...
            instance.resultTitles = movableContainer.at(0);
            expect(movableContainer).toEqual(wrapper.instance().resultTitles);
            
            //titles:
                //These are the selectable ones
            const selectableTitles = wrapper.find('span.search.title.col-xs-3.searchable');
            expect(selectableTitles.length).toEqual(instance.state.columns.length);

            selectableTitles.forEach((title, index) => {
                let stateColumn = instance.state.columns[index];
                expect(title.text()).toEqual(camelCaseToNormalCase(stateColumn[stateColumn.length - 1]));
            });


                // "Historia" and "Suscribirse" - Those are always included
            const defaultTitles = wrapper.find('span.search.title.col-xs-3.half');
            expect(defaultTitles.length).toEqual(2)
            expect(defaultTitles.at(0).text()).toEqual('Historia');
            expect(defaultTitles.at(1).text()).toEqual('Suscribirse');

                // buttons  to sort (chevron up/down) -> equals state.columns.length * 2 because
                // each title has an up and a down button
            const chevrons = wrapper
                                .find('span.search.title.col-xs-3.searchable .glyphicon')
                                .filterWhere(element => !element.hasClass("filler"))
            expect(chevrons.length).toEqual(instance.state.columns.length * 2);
            
            chevrons.forEach(chevron => {
                // its an anonymous function that returns a call to instance.sortByColumns
                // so can't test onClick === instance.sortByColumns
                expect(typeof chevron.props().onClick).toEqual("function")
            });

            // rows container
            const resultsRowsContainer = wrapper.find('.results-li-container');
            expect(resultsRowsContainer.length).toEqual(1);
            expect(resultsRowsContainer.props().onScroll).toEqual(instance.handleScroll);
            
            //rows
            const rows = wrapper.find('.search-results');
            //one row per searchResult
            expect(rows.length).toEqual(searchResultsMock.count);
            // expect state.columns.length + 2 (historia + suscribirse) amount of columns
            // divide by searchResultsMock.count because rows.find(...) will be columns * rows;
            expect(rows.find('.search.col-xs-3').length/searchResultsMock.count).toEqual((instance.state.columns.length + 2))

            let columns = [];
            // for clarity => state.columns.length (to be gotten the searchResults) + 2 ("Historia", "Suscribirse")
            // - 1 (becomes zero indexed);
            let maxColumns = instance.state.columns.length + 2 - 1; 
            let count = 0;

            rows.children().map(e => e).forEach((row, index, array) => {
                //sets rows on columns
                //if column doesn't exist, create it, else push the row to it.
                columns[count] ? columns[count].push(row) : columns[count] = [row];
                count++;
                if(count > maxColumns) {
                    count = 0;
                }
            });

            //slice excludes the last two columns (Historia and Suscribirse)
            columns.slice(0, columns.length - 2).forEach((column, columnIndex) => {

                column.forEach((row, rowIndex) => {
                    //bring the value...
                    let searchResultFieldValue = instance.state.columns[columnIndex]
                                            .reduce((accumulator, currentKey, index, array) => {
                                                if(index === array.length - 1 && !isPrimitive(accumulator[currentKey])){
                                                    //This should happen on Listado[0].Items
                                                    return "Ver detalle"
                                                }

                                                return accumulator[currentKey]
                                            },searchResultsMock.values[rowIndex].value);
                                            
                    // is the value in the row equal to the value in the searchResult? - Everything as string
                    expect(row.text()).toEqual(`${searchResultFieldValue}`);
                });
            });
            
            //here we test that the fixed columns ("Historia", "Suscribirse") have the correct values
            expect(columns.slice(columns.length - 2).length).toEqual(2);

            columns.slice(columns.length - 2).forEach((column, columnIndex) => {

                column.forEach((row, rowIndex)=> {
                    if(columnIndex === 0) {
                        expect(row.text()).toEqual("Ver historia");
                    }
                    if(columnIndex === 1) {
                        expect(row.text()).toEqual("Suscribirse");
                    }
                    else if (columnIndex > 1) {
                        throw new Error("More than two fixed columns!");
                    }

                });
            });

        }
        
            tests(wrapper);


            // Try a couple different values from JSONSchemaCheckboxes...
            let newColumns = instance.state.columns.concat([["Listado", "0", "Items"]])
            wrapper.setState({columns: newColumns});
            tests(wrapper);

            newColumns = instance.state.columns.slice(2);
            wrapper.setState({columns: newColumns});
            tests(wrapper);

            newColumns = instance.state.columns.concat([["Listado", "0", "TipoPago"], ["Listado", "0", "Estimacion"]])
            wrapper.setState({columns: newColumns});
            tests(wrapper);

        });

        it('Should correctly invoke functions', () => {


        });
    });
});
