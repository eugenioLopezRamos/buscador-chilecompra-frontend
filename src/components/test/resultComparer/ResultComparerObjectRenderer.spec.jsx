import React, {PropTypes} from 'react';
import {shallow} from 'enzyme';
import ResultComparerObjectRenderer from '../../resultComparer/ResultComparerObjectRenderer';

function setupPrimitive() {

    const primitiveProps = {
        object: "A primitive",
        keyName: "a name"
    }

    const primitiveWrapper = shallow(<ResultComparerObjectRenderer {...primitiveProps}/>);

    return {primitiveWrapper, primitiveProps};

}

function setupArray() {
    const arrayProps = {
        object: ["an", "array"],
        keyName: "a name",
        handleToggleOpen: jest.fn()
    }
    const arrayWrapper = shallow(<ResultComparerObjectRenderer {...arrayProps}/>);

    return {arrayWrapper, arrayProps};
}

function setupPOJO() {
    const POJOProps = {
        object: {a: "POJO"},
        keyName: "a name",
        handleToggleOpen: jest.fn()
    }
    const POJOWrapper = shallow(<ResultComparerObjectRenderer {...POJOProps}/>);

    return {POJOWrapper, POJOProps};
}


describe('Result Comparer Object Renderer', () => {

    const {primitiveWrapper, primitiveProps} = setupPrimitive();
    const {arrayWrapper, arrayProps} = setupArray();
    const {POJOWrapper, POJOProps} = setupPOJO();

    it('Should render ResultComparerPrimitive', () => {

        const wrapper = primitiveWrapper.find('ResultComparerPrimitive');
        const wrapperProps = wrapper.props();

        expect(wrapper.length).toEqual(1);
        expect(wrapperProps.keyName).toEqual(primitiveProps.keyName);
        expect(wrapperProps.value).toEqual(primitiveProps.object);
    });


    it('Should render ResultComparerArray', () => {

        const wrapper = arrayWrapper.find('ResultComparerArray');
        const wrapperProps = wrapper.props();

        expect(wrapper.length).toEqual(1);
        expect(Number.isFinite(wrapperProps.number)).toEqual(true);
        expect(wrapperProps.keyName).toEqual(arrayProps.keyName);
        expect(wrapperProps.toggleOpen).toEqual(arrayProps.handleToggleOpen);
        expect(wrapperProps.object).toEqual(arrayProps.object);
        expect(wrapperProps.renderer).toEqual(ResultComparerObjectRenderer);
    });



    it('Should render ResultComparerPOJO', () => {
        const wrapper = POJOWrapper.find('ResultComparerPOJO');
        const wrapperProps = wrapper.props();

        expect(wrapper.length).toEqual(1);
        expect(Number.isFinite(wrapperProps.number)).toEqual(true);
        expect(wrapperProps.keyName).toEqual(POJOProps.keyName);
        expect(wrapperProps.toggleOpen).toEqual(POJOProps.handleToggleOpen);
        expect(wrapperProps.object).toEqual(POJOProps.object);
        expect(wrapperProps.renderer).toEqual(ResultComparerObjectRenderer);
    });


    it('Should correctly invoke functions (ResultComparerPrimitive)', () => {

        //No handler => no functions => automatically true;
        expect(true).toEqual(true)

    });


    it('Should correctly invoke functions (ResultComparerArray)', () => {

        const wrapper = arrayWrapper.find('ResultComparerArray');
        const wrapperProps = wrapper.props();

        expect(arrayProps.handleToggleOpen.mock.calls.length).toEqual(0);
        wrapperProps.toggleOpen();
        expect(arrayProps.handleToggleOpen.mock.calls.length).toEqual(1);

    });


    it('Should correctly invoke functions (ResultComparerPOJO)', () => {

        const wrapper = POJOWrapper.find('ResultComparerPOJO');
        const wrapperProps = wrapper.props();

        expect(POJOProps.handleToggleOpen.mock.calls.length).toEqual(0);
        wrapperProps.toggleOpen();
        expect(POJOProps.handleToggleOpen.mock.calls.length).toEqual(1);


    });

});