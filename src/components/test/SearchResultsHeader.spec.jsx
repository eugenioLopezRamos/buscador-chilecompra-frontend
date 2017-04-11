import React from 'react';
// mount is unusable for me - Takes about 3 mins to test this component alone...
//import {mount} from 'enzyme';
import {shallow} from 'enzyme';
import SearchResultsHeader from '../SearchResultsHeader.js';
import {RESULTS_INITIAL_CHECKBOXES} from '../../constants/resultsInitialCheckboxes';
import {mockColumns} from '../../__mocks__/mockColumns';
import * as utils from '../../utils/miscUtils';


function setup() {
    const columns = RESULTS_INITIAL_CHECKBOXES;

    const props = {
        sortByColumn: jest.fn(),
        columns,
    };

    const wrapper = shallow(<SearchResultsHeader {...props}/>);

    return {wrapper, props};
};

describe('Components', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();


    describe('Search Results Header', () => {


        it('Should correctly render self and subcomponents', () => {

                const movableTitle = wrapper.find('.movable-title-container');
                expect(movableTitle.length).toEqual(1);


                //titles:
                    //These are the selectable ones
                const selectableTitles = wrapper.find('span.search.title.col-xs-3.searchable');
                expect(selectableTitles.length).toEqual(props.columns.length);

                selectableTitles.forEach((title, index) => {
                    let stateColumn = props.columns[index];
                    expect(title.text()).toEqual(utils.pascalCaseToSentenceCase(stateColumn[stateColumn.length - 1]));
                });


                    // "Historia" and "Suscribirse" - Those are always included
                const defaultTitles = wrapper.find('span.search.title.col-xs-3.half');
                expect(defaultTitles.length).toEqual(2)
                expect(defaultTitles.at(0).text()).toEqual('Historia');
                expect(defaultTitles.at(1).text()).toEqual('Suscribirse');

                    // buttons  to sort (chevron up/down) -> equals state.columns.length * 2 because
                    // each title has an up and a down button
                const chevrons = wrapper.find('span.search.title.col-xs-3.searchable .glyphicon')
                                        .filterWhere(element => !element.hasClass("filler"))

                expect(chevrons.length).toEqual(props.columns.length * 2);
                
                chevrons.forEach(chevron => {
                    // its an anonymous function that returns a call to instance.sortByColumns
                    // so can't test onClick === instance.sortByColumns
                    expect(typeof chevron.props().onClick).toEqual("function")
                });
        });


        it('Should correctly invoke functions', () => {

                // sort buttons
                //mock for the functions below (its called on the onClick handler);
                let index = 0; 

                const sortDescending = wrapper.find('span.glyphicon.glyphicon-chevron-down');
                const sortAscending = wrapper.find('span.glyphicon.glyphicon-chevron-up');

                expect(props.sortByColumn.mock.calls.length).toEqual(0);
                const clickDescending = sortDescending.at(index).props().onClick();
                expect(clickDescending).toEqual("descending");
                expect(props.sortByColumn.mock.calls.length).toEqual(1);

                const clickAscending = sortAscending.at(index).props().onClick();
                expect(clickAscending).toEqual("ascending");
                expect(props.sortByColumn.mock.calls.length).toEqual(2);
                
                // movable-title-container test (does it move?)
                const movableTitle = wrapper.find('.movable-title-container');
                expect(movableTitle.props().style.transform).toEqual("translate(-0px, 0)");

                wrapper.setState({rootTransform: 75});
                wrapper.update();
                const newMovableTitle = wrapper.find('.movable-title-container');
                expect(newMovableTitle.props().style.transform).toEqual(`translate(-${wrapper.instance().state.rootTransform}px, 0)`);

        });
    });
});

