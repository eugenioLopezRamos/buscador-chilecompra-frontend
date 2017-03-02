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
                expect(currentWrapper.find('button.go-to-result-button').length).toEqual(1);

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
    
                    let pagesDiff = pages - currentPage;
                    //maxPages is a number (1...maxPages)
                    // currentPage is an index
                    activeButtonIndex = currentPage >= maxPages - 1 ? buttonsAmount - pagesDiff  : currentPage;
                    if(currentPage >= pages) {
                        // will render just 1 button
                        activeButtonIndex = 0;
                    }       
                }
                else {
                    buttonsAmount = pages;
                    activeButtonIndex = currentPage;
    
                }
                //button at(currentPage) is active
                expect(wrapper.find('.page-select-buttons .page-button').at(activeButtonIndex).hasClass('active')).toEqual(true);
                //if currentPage > pages -> will render only one button, so:
                if(currentPage > pages) {
                    expect(currentWrapper.find('.page-select-buttons .page-button').length).toEqual(1);  
                }else {
                    expect(currentWrapper.find('.page-select-buttons .page-button').length).toEqual(buttonsAmount);
                }

                //there must be only one active button
                expect(currentWrapper.find('.page-select-buttons .page-button.active').length).toEqual(1);
            }

            const maxPages = 8;
            let currentPage = props.currentPage;
            let pages = props.pages;
 

            testComponent(wrapper);

            currentPage = 6;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);

            currentPage = 7;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);

            pages = 10;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);

            currentPage = 3;
            pages = 7;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);

            currentPage = 9;
            pages = 10;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);

            currentPage = 15000;
            wrapper.setProps({currentPage, pages});
            testComponent(wrapper);              

        });

        it('Should correctly invoke functions', () => {
            let {wrapper, props} = setup();
            const pagePickerButtons = wrapper.find('.page-select-buttons .page-button');
            const goToPageInput = 

            expect(props.pageButtonClickHandler.mock.calls.length).toEqual(0);
            pagePickerButtons.forEach((element, index) => {
                element.props().onClick(index)
            });

            expect(props.pageButtonClickHandler.mock.calls.length).toEqual(pagePickerButtons.length);


            // For these two another (mildly annoying option) would be to rewrite the input + button
            // into a Component...

            //TODO: See how to test the onChange event on the <input/>, it involves using a ref in a stateless functional component...
            // const pickPageInput = currentWrapper.find('div.inputs input');
            
            //TODO: See how to test this, it uses the ref...
            // const goToButton = wrapper.find('button.go-to-result-button');
            // goToButton.props().onClick()

            // expect(props.pageButtonClickHandler.mock.calls.length).toEqual(pagePickerButtons.length + 1);

        });
    });
});
