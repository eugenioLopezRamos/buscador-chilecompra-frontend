import React, {PropTypes} from 'react';
import {shallow} from 'enzyme';
import ResultComparer from '../ResultComparer';
import {resultComparerMockData, emptyResultComparerMockData} from '../../__mocks__/resultComparerMock';
import {objectComparer, searchInObject} from '../../utils/miscUtils';

//results Comparere has a bug when clicking the results to ttoggle their display
// UPDATE: Seems fixed with stopPropagation()

//TODO: Change the yellow onHover message it looks awful

function setupWithComparison() {

    const comparisonProps = {
        results: resultComparerMockData
    };
    const comparisonWrapper = shallow(<ResultComparer {...comparisonProps}/>);
    return {comparisonWrapper, comparisonProps}
}

function setupEmptyComparison() {

    const emptyComparisonProps = {
        results: emptyResultComparerMockData
    };
    const emptyComparisonWrapper = shallow(<ResultComparer {...emptyComparisonProps}/>);
    return {emptyComparisonWrapper, emptyComparisonProps}

}


describe('Component', () => {

    describe('ResultComparer', () => {
        const {comparisonWrapper, comparisonProps} = setupWithComparison();
        const {emptyComparisonWrapper, emptyComparisonProps} = setupEmptyComparison();

        it('Should correctly render self and subcomponents', () => {

            function checkCommonElements(currentWrapper) {
                expect(currentWrapper.find('.result-comparer-root').length).toEqual(1);
                expect(currentWrapper.find('.result-comparer-main-title').length).toEqual(1);
                expect(currentWrapper.find('.result-comparer-main-title').text()).toEqual('Variaciones del resultado');
                expect(currentWrapper.find('.main-result-comparer-container').length).toEqual(1);
                expect(currentWrapper.find('.original-result-container').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-container').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-title').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-title .detail').text()).toEqual('Detalle de variaciones');
                expect(currentWrapper.find('.all-differences-title-note').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-title-note').text()).toEqual('En caso de haber variaciones sólo de FechaCreacion, estas se han obviado')
                expect(currentWrapper.find('.all-differences-each').length).toEqual(1);
                expect(currentWrapper.find('.single-difference-container').length).toEqual(1);
            }


            //With no comparison (that is, there have been no changes to a results info)
     
            checkCommonElements(emptyComparisonWrapper);

            expect(emptyComparisonWrapper.find('.single-difference-container').text()).toEqual('Sin variaciones');


          
            checkCommonElements(comparisonWrapper);
            //.difference-item is one per property of the base object (Using our mock, one for the differences 
            //in "Listado" and one for the differences in "FechaCreacion")
            expect(comparisonWrapper.find('.difference-item').length).toEqual(2);
            // differences can be either POJO or array - These are just the containers
            expect(comparisonWrapper.find('.difference-item .object-data-container').length).toEqual(18);
            //get the amount of values (so, the primitives)
            expect(comparisonWrapper.find('.difference-item .object-data-container .primitive').length).toEqual(25);

            // check that the values are correctly
            const primitiveValues = comparisonWrapper.find('.difference-item .object-data-container .primitive');

            const baseValue = resultComparerMockData[0];
            const nextValue = resultComparerMockData[1];

            const comparedValues = objectComparer(baseValue, nextValue);
            //instance.differences are the same as objectComparer?
            expect(comparisonWrapper.instance().differences()).toEqual([comparedValues]);

        });

        it('Should invoke functions correctly', () => {
            const instance = comparisonWrapper.instance();
            //These are hideable;
            const objectDataContainers = comparisonWrapper.find('.difference-item .object-container-name');
            // Was random (code is commented out) - Chose the middle as a compromise since it failed randomly due to 
            // randomNumber not existing
            let randomNumber = Math.floor(objectDataContainers.length / 2); //Math.floor(Math.random() * objectDataContainers.length - 2);

            const originalToggleOpen = instance.toggleOpen.bind({});

            instance.toggleOpen = jest.fn();

            expect(instance.toggleOpen.mock.calls.length).toBe(0);
     
            objectDataContainers.at(randomNumber).props().onClick();
            // TODO: see some way to test this more strictly? 
            expect(instance.toggleOpen.mock.calls.length).toBe(1);
        })
    });
});