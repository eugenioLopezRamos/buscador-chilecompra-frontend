import React from 'react';
import {shallow} from 'enzyme';
import ResultComparerPrimitive from '../../resultComparer/ResultComparerPrimitive';



function setup() {

    const props = {
        keyName: "my own keyName",
        value: "my own value"
    }

    const wrapper = shallow(<ResultComparerPrimitive {...props}/>);

    return {wrapper, props};
}


describe('Result Comparer Primitive', () => {

    const {wrapper, props} = setup();

    it('Should correctly render self and subcomponents', () => {

        const mainSpan = wrapper.find('span.primitive');
        expect(mainSpan.length).toEqual(1);

        const primitiveKey = mainSpan.find('.inPrimitive-key');
        expect(primitiveKey.length).toEqual(1);
        expect(primitiveKey.text()).toEqual(props.keyName + ":");

        const primitiveValue = mainSpan.find('.inPrimitive-value');       
        expect(primitiveValue.length).toEqual(1);
        expect(primitiveValue.text()).toEqual(" " + props.value);

    });


});

