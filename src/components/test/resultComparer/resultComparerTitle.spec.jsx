import React from 'react';
import {shallow} from 'enzyme';
import ResultComparerTitle from '../../resultComparer/ResultComparerTitle';



function setup() {

    const props = {
        keyName: "my own keyName",
        type: "array",
        handler: jest.fn()
    }

    const wrapper = shallow(<ResultComparerTitle {...props}/>);

    return {wrapper, props};
}

function nullSetup() {
    const nullProps = {
        type: "object",
        handler: jest.fn()
    }

    const nullWrapper = shallow(<ResultComparerTitle {...nullProps}/>);

    return {nullWrapper, nullProps};
}

describe('Result Comparer Title', () => {

    const {wrapper, props} = setup();
    const {nullWrapper, nullProps} = nullSetup();

    it('Should render self and subcomponents (with keyName)', () => {

        const root = wrapper.find(`.object-container-name.type-${props.type}.open`);
        expect(root.length).toEqual(1);
        expect(root.text()).toEqual(props.keyName);
        expect(wrapper.find('.glyphicon.glyphicon-triangle-right').length).toEqual(1);
        expect(wrapper.find('.glyphicon.glyphicon-triangle-bottom').length).toEqual(1);

    });

    it('Should render self and subcomponents (no keyName => will render null)', () => {

        expect(nullWrapper.html()).toEqual(null);

    });

    it('Should correctly invoke functions (with keyName)', () => {
        const root = wrapper.find(`.object-container-name.type-${props.type}.open`);

        expect(props.handler.mock.calls.length).toEqual(0);
        root.props().onClick();
        expect(props.handler.mock.calls.length).toEqual(1);
    });

});