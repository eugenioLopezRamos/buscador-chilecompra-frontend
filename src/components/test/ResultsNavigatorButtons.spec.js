import React from 'react';
import {RESULTS_OFFSET_AMOUNT}  from '../../constants/resultsOffset';
import ResultsNavigatorButtons from '../ResultsNavigatorButtons';
import {shallow} from 'enzyme';


function setup() {

    let props = {
        pages: 8,
        paginatorButtonClickHandler: jest.fn(),
        pageButtonClickHandler: jest.fn(),
        currentPage: 0
    }

    let wrapper = shallow(<ResultsNavigatorButtons {...props}/>);

    return {wrapper, props}
}


describe('Component', () => {
    
    describe('ResultsNavigatorButtons', () => {
        

        it('Should render self and subcomponents', () => {

            let {wrapper, props} = setup();
            const testComponent = (currentWrapper) => {
                expect(currentWrapper.find('.results-navigator-buttons-container').length).toEqual(1);
                expect(currentWrapper.find('label.show-page').length).toEqual(1);
                expect(currentWrapper.find('label.show-page').text()).toEqual('Mostrar página:');
                expect(currentWrapper.find('div.inputs').length).toEqual(1);
                const pickPageInput = currentWrapper.find('div.inputs input');
                expect(pickPageInput.length).toEqual(1);
                expect(pickPageInput.props().type).toEqual("number");
                expect(pickPageInput.props().min).toEqual("1");
                expect(pickPageInput.props().max).toEqual(pages);
                expect(pickPageInput.props().placeholder).toEqual("Página");
                expect(pickPageInput.props().defaultValue).toEqual(null);
                // there are no refs on SFC's using enzyme
                expect(typeof pickPageInput.props().onChange).toEqual("function");


                expect(currentWrapper.find('.page-select-buttons-container').length).toEqual(1);
                expect(currentWrapper.find('button.page-button.prev-next').length).toEqual(2);

                const prevButton = currentWrapper.find('button.page-button.prev-next').at(0);
                expect(typeof prevButton.props().onClick).toEqual("function");
                expect(prevButton.text()).toEqual("<<");
                const nextButton = currentWrapper.find('button.page-button.prev-next').at(1)
                expect(typeof nextButton.props().onClick).toEqual("function");
                expect(nextButton.text()).toEqual(">>");

                // max 8 buttons
                let buttonsAmount;
                let activeButtonIndex;
                if(pages > maxPages){
                    buttonsAmount = maxPages;
                    activeButtonIndex = currentPage > maxPages ? buttonsAmount - 1 : currentPage;
                  //  expect(wrapper.find('.page-select-buttons .page-button').at(activeButtonIndex).hasClass('active')).toEqual(true);
                }
                else {
                    buttonsAmount = pages;
                    activeButtonIndex = currentPage;
                }
                //button at(currentPage) is active
                expect(wrapper.find('.page-select-buttons .page-button').at(activeButtonIndex).hasClass('active')).toEqual(true);
                expect(currentWrapper.find('.page-select-buttons .page-button').length).toEqual(buttonsAmount);
                //only one active button
                expect(currentWrapper.find('.page-select-buttons .page-button.active').length).toEqual(1);

            }
            const maxPages = 8;
            let currentPage = props.currentPage;
            let pages = props.pages;
 

            testComponent(wrapper);

            currentPage = 6;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);
          //  expect(wrapper.find('.page-select-buttons .page-button').at(props.currentPage).hasClass('active')).toEqual(true);
            currentPage = 7;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);
          //  expect(wrapper.find('.page-select-buttons .page-button').at(props.currentPage).hasClass('active')).toEqual(true);
            pages = 10;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);
         //   expect(wrapper.find('.page-select-buttons .page-button').at(props.currentPage).hasClass('active')).toEqual(true);
            currentPage = 3;
            pages = 7;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);
           // expect(wrapper.find('.page-select-buttons .page-button').at(props.currentPage).hasClass('active')).toEqual(true);

        });

        it('Should correctly invoke functions', () => {




        });
    });
});
