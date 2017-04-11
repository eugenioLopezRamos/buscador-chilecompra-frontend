import React from 'react';
// mount is unusable for me - Takes about 3 mins to test this component alone...
//import {mount} from 'enzyme';
import {shallow} from 'enzyme';
import {SearchResults} from '../../searchResults/SearchResults';
import {searchResultsMock} from '../../../__mocks__/searchResultsMock';
import {searchQueryValuesMock} from  '../../../__mocks__/searchResultsMock';
import {resultComparerMockData} from '../../../__mocks__/resultComparerMock';
import nock from 'nock';
import localStorageMock from '../../../__mocks__/testLocalStorage';
import ObjectDetails from '../../ObjectDetails';
//import {mockSelectedColumns} from '../../__mocks__/searchResultsMock';
import {pascalCaseToSentenceCase} from '../../../utils/miscUtils';
import {isPrimitive} from '../../../utils/miscUtils';
import {RESULTS_OFFSET_AMOUNT}  from '../../../constants/resultsOffset';
import * as API from '../../../actions/fetchActions';
import * as mockColumns from '../../../__mocks__/mockColumns';

if(!window.localStorage) {
    window.localStorage = localStorageMock();
    localStorage = localStorageMock();
}
process.env.API_HOST= "http://localhost:3000";
function setup() {
    const props = {
        searchQueryValues: searchQueryValuesMock,
        results: searchResultsMock,
        API: {loadChilecompraData: jest.fn()},
        createUserSubscription: jest.fn()
    }

    const wrapper = shallow(<SearchResults {...props}/>);

    return {wrapper, props}
}

describe('Component', () => {
            //TODO: This is a bit messy, see some way to refactor this?
    describe('SearchResults', () => {
        let {wrapper, props} = setup();
        const instance = wrapper.instance();
        const state = instance.state;

        it('Should render self and subcomponents', () => {

            const runTests = (wrapper) => {
            //root 
                if(!props.results) {
                    expect(wrapper.type()).toEqual(null);
                    return;
                }
                else if(props.results.count === 0) {
                    expect(wrapper.find(`span.${instance.animClass}`)).toEqual(1);
                    return;
                }
                else {
                    expect(wrapper.find('div.searchResults-container-div').length).toEqual(1);
                }

                
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
                
                //SearchResultsHeader
                expect(wrapper.find('.title-container').length).toEqual(1);
                const headerComponent = wrapper.find('SearchResultsHeader')
                expect(headerComponent.length).toEqual(1);
        
                // This is a ref to another component.
                instance.resultTitles = headerComponent.at(0);
                expect(headerComponent).toEqual(wrapper.instance().resultTitles);
                expect(headerComponent.props().sortByColumn).toEqual(instance.sortByColumn);
                expect(headerComponent.props().columns).toEqual(instance.state.columns);


                //SearchResultsContent
                const contentComponent = wrapper.find('SearchResultsContent');
                expect(contentComponent.length).toEqual(1);
                expect(contentComponent.props().columns).toEqual(instance.state.columns);
                expect(contentComponent.props().values).toEqual(instance.props.results.values);
                expect(contentComponent.props().handleScroll).toEqual(instance.handleScroll);
                expect(contentComponent.props().showObjectDetail).toEqual(instance.showObjectDetail);
                expect(contentComponent.props().getResultHistory).toEqual(instance.getResultHistory);
                expect(contentComponent.props().showSubscriptionModal).toEqual(instance.showSubscriptionModal);
            }
        
            runTests(wrapper);

            // Try a couple different values from JSONSchemaCheckboxes...
            let newColumns = instance.state.columns.slice(2);

            const JSONSchemaCheckboxes = wrapper.find('JSONSchemaCheckboxes');

            JSONSchemaCheckboxes.props().changeColumns(newColumns);
            runTests(wrapper);

            newColumns = instance.state.columns.slice(2);

            JSONSchemaCheckboxes.props().changeColumns(newColumns);
            runTests(wrapper);

            newColumns = instance.state.columns.concat(mockColumns.tipoPagoEstimacion)
            JSONSchemaCheckboxes.props().changeColumns(newColumns);
            runTests(wrapper);

            //plays a fadein animation when loading new results
            expect(instance.animClass).toEqual('search-results-ul1');
            wrapper = wrapper.setProps({results: null});
            props.results = null;
            expect(instance.animClass).toEqual('search-results-ul2');
            runTests(wrapper);

            props.results = searchResultsMock;
            wrapper = wrapper.setProps({results: searchResultsMock});
            runTests(wrapper);

            expect(instance.animClass).toEqual('search-results-ul1');
            runTests(wrapper);

            newColumns = instance.state.columns.concat(mockColumns.items);
            JSONSchemaCheckboxes.props().changeColumns(newColumns);
            runTests(wrapper);


        });

        it('Should correctly invoke functions', () => {

                const modal = wrapper.find('Modal');
                modal.props().hideModal();
                expect(wrapper.instance().state.showModal).toEqual(false);



                const fullScreenPane = wrapper.find('FullScreenPane');
                expect(wrapper.instance().state.fullScreenPane.show).toEqual(false);

                let column = searchResultsMock.values[0].value.Listado[0].Items;
                wrapper.instance().showObjectDetail(column);
                 expect(wrapper.instance().state.fullScreenPane).toEqual({show:true,
                                                                         component: ObjectDetails,
                                                                         componentProps: {objectData: column},
                                                                         menu: null,
                                                                         menuProps: {}
                                                                        });               

                fullScreenPane.props().hide();
                expect(wrapper.instance().state.fullScreenPane.show).toEqual(false);

                //mocks the response from the server...

                let resultId = props.results.values[0].id;

                const initialHeaders = {
                    'access-token': '111',
                    'uid': 'example@examplemail.com',
                    'client': '53k1237',
                    'content-type':'application/json',
                    'accept':'application/json',
                    'accept-encoding':'gzip,deflate',
                    'user-agent':"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
                    'connection':'close'
                };

                localStorage.setItem("session", JSON.stringify(initialHeaders));
                nock(`${process.env.API_HOST}/api/results/`)
                    .get(`/history?id=${resultId}`)
                    .reply(200,resultComparerMockData); 
            
                // const getResultHistoryButton = wrapper.find('.search.col-xs-3.half button.btn-primary.col-xs-12.result-history-button');
                // getResultHistoryButton.at(0).props().onClick();

                // simulate click on result index 0
                wrapper.instance().getResultHistory(0);
                expect(wrapper.instance().state.fullScreenPane.show).toEqual(true);
                expect(wrapper.instance().state.fullScreenPane.component).toEqual(null);
                expect(wrapper.instance().state.fullScreenPane.componentProps).toEqual({});

                // Not quite sure how to simulate an async update here, so...
                wrapper.setState({
                        fullScreenPane: {
                            show: true,
                            component: 'ResultsComparer',
                            componentProps: {
                                results: resultComparerMockData
                            }
                        }
                    });
    
                expect(wrapper.instance().state.fullScreenPane.show).toEqual(true);
                expect(wrapper.instance().state.fullScreenPane.component).toEqual('ResultsComparer');
                expect(wrapper.instance().state.fullScreenPane.componentProps.results).toEqual(resultComparerMockData);

                const offset = RESULTS_OFFSET_AMOUNT;
                const resultsNavigatorButtons = wrapper.find('ResultsNavigatorButtons').at(0);

                let page = 2;
                expect(props.API.loadChilecompraData.mock.calls.length).toEqual(0);
                //forwards one page...
                resultsNavigatorButtons.props().paginatorButtonClickHandler(props.results.offset + offset);
                expect(props.API.loadChilecompraData.mock.calls.length).toEqual(1);
                //then back again
                resultsNavigatorButtons.props().paginatorButtonClickHandler(props.results.offset + offset);
                expect(props.API.loadChilecompraData.mock.calls.length).toEqual(2);                
                //go to page X
                resultsNavigatorButtons.props().pageButtonClickHandler(page * offset);
                expect(props.API.loadChilecompraData.mock.calls.length).toEqual(3);
        });
    });
});
