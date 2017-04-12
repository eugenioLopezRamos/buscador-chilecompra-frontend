import React from 'react';
import {shallow} from 'enzyme';
import ResultsNavigatorButtonsRenderer from '../ResultsNavigatorButtonsRenderer';

function activeSetup() {

    const activeProps = {
        element: 1,
        setOffset: jest.fn(),
        isActive: true
    }

    const activeWrapper = shallow(<ResultsNavigatorButtonsRenderer {...activeProps}/>);

    return {activeWrapper, activeProps};
}

function inactiveSetup() {

    const inactiveProps = {
        element: 1,
        setOffset: jest.fn(),
        isActive: false
    }

    const inactiveWrapper = shallow(<ResultsNavigatorButtonsRenderer {...inactiveProps}/>);

    return {inactiveWrapper, inactiveProps};
}

describe("Component", () => {

    const {activeWrapper, activeProps} = activeSetup();
    const {inactiveWrapper, inactiveProps} = inactiveSetup();

    it('Should correctly render self and subcomponents', () => {

        expect(activeWrapper.find('button').length).toEqual(1);
        expect(activeWrapper.find('button').filterWhere(button => button.hasClass('active')).length).toEqual(1);



        expect(inactiveWrapper.find('button').length).toEqual(1);
        expect(inactiveWrapper.find('button').filterWhere(button => button.hasClass('active')).length).toEqual(0);

 
    });

    it('Should correctly invoke functions', () => {

        expect(activeProps.setOffset.mock.calls.length).toEqual(0);
        activeWrapper.props().onClick({mock: "mock object"});
        expect(activeProps.setOffset.mock.calls.length).toEqual(1);

        expect(inactiveProps.setOffset.mock.calls.length).toEqual(0);
        inactiveWrapper.props().onClick({mock: "mock object"});
        expect(inactiveProps.setOffset.mock.calls.length).toEqual(1);    

    });



});


