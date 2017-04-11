import React from 'react';
// mount is unusable for me - Takes about 3 mins to test this component alone...
//import {mount} from 'enzyme';
import {shallow} from 'enzyme';
import SearchResultsContent from '../SearchResultsContent.js';
import {searchResultsMock} from '../../__mocks__/searchResultsMock';
// These are given as props from the SearchResults component
import {RESULTS_INITIAL_CHECKBOXES} from '../../constants/resultsInitialCheckboxes';
import * as utils from '../../utils/miscUtils';
import * as mockColumns from '../../__mocks__/mockColumns';

function setup() {


    const columns = RESULTS_INITIAL_CHECKBOXES;

    const props = {
        columns,
        values: searchResultsMock.values,
        handleScroll: jest.fn(),
        showObjectDetail: jest.fn(),
        getResultHistory: jest.fn(),
        showSubscriptionModal: jest.fn()
    };

    const wrapper = shallow(<SearchResultsContent {...props}/>);

    return {wrapper, props};
};

describe('Components', () => {

    describe('Search Results Content', () => {
        const {wrapper, props} = setup();
    

        it('Should correctly render self and subcomponents', () => {
            
            
                        // rows container
            const resultsRowsContainer = wrapper.find('.results-li-container');
            expect(resultsRowsContainer.length).toEqual(1);
            expect(resultsRowsContainer.props().onScroll).toEqual(props.handleScroll);
            
            //rows
            const rows = wrapper.find('.search-results');
            //one row per searchResult
            expect(rows.length).toEqual(searchResultsMock.count);
            // expect state.columns.length + 2 (historia + suscribirse) amount of columns
            // divide by searchResultsMock.count because rows.find(...) will be columns * rows;
            expect(rows.find('.search.col-xs-3').length/searchResultsMock.count).toEqual((props.columns.length + 2))

            let columns = [];
            // for clarity => state.columns.length (to be gotten the searchResults) + 2 ("Historia", "Suscribirse")
            // - 1 (becomes zero indexed);
            let maxColumns = props.columns.length + 2 - 1; 
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
                    let searchResultFieldValue = props.columns[columnIndex]
                                            .reduce((accumulator, currentKey, index, array) => {
                                                if(index === array.length - 1 && !utils.isPrimitive(accumulator[currentKey])){
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
        });


        it('Should correctly invoke functions', () => {

            wrapper.setProps({columns: props.columns.concat(mockColumns.items)});
            wrapper.update();
            const showObjectDetail = wrapper.find('span.search.col-xs-3 a');

            expect(props.showObjectDetail.mock.calls.length).toEqual(0);
            showObjectDetail.at(0).props().onClick({preventDefault: () => undefined});
            expect(props.showObjectDetail.mock.calls.length).toEqual(1);


            const subscriptionButton = wrapper.find('.search.col-xs-3.half button.btn-primary.col-xs-12.subscription-button');
            //mocks the value used on the function

            let index = 0;
            expect(props.showSubscriptionModal.mock.calls.length).toEqual(0);
            subscriptionButton.at(0).props().onClick();
            expect(props.showSubscriptionModal.mock.calls.length).toEqual(1);

            const getResultHistoryButton = wrapper.find('.search.col-xs-3.half button.btn-primary.col-xs-12.result-history-button');
            expect(props.getResultHistory.mock.calls.length).toEqual(0);
            getResultHistoryButton.at(0).props().onClick();
            expect(props.getResultHistory.mock.calls.length).toEqual(1);


            const resultsRowsContainer = wrapper.find('.results-li-container').at(0);

            expect(props.handleScroll.mock.calls.length).toEqual(0);
            resultsRowsContainer.props().onScroll();
            expect(props.handleScroll.mock.calls.length).toEqual(1);

        });
    });
});

