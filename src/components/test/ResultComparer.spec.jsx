import React, {PropTypes} from 'react';
import {shallow} from 'enzyme';
import ResultComparer from '../ResultComparer';
import {resultComparerMockData, emptyResultComparerMockData} from '../../__mocks__/resultComparerMock';

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

            function checkCommonElements() {
                expect(currentWrapper.find('.result-comparer-root').length).toEqual(1);
                expect(currentWrapper.find('.result-comparer-main-title').length).toEqual(1);
                expect(currentWrapper.find('.result-comparer-main-title').text()).toEqual('Variaciones del resultado');
                expect(currentWrapper.find('.main-result-comparer-container').length).toEqual(1);
                expect(currentWrapper.find('.original-result-container').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-container').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-title').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-title .detalle').text()).toEqual('Detalle de variaciones');
                expect(currentWrapper.find('.all-differences-title-note').length).toEqual(1);
                expect(currentWrapper.find('.all-differences-title-note').text()).toEqual('En caso de haber variaciones sólo de FechaCreacion, estas se han obviado')
                expect(currentWrapper.find('.all-differences-each').length).toEqual(1);
            }

            let currentWrapper;
            //With no comparison (that is, there have been no changes to a results info)
            currentWrapper = emptyComparisonWrapper;
            checkCommonElements();



        });
    });
});