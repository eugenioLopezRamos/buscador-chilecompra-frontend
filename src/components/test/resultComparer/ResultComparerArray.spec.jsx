import React from 'react';
import {shallow} from 'enzyme';
import ResultComparerArray from '../../resultComparer/ResultComparerArray';
import ResultComparerObjectRenderer from '../../resultComparer/ResultComparerObjectRenderer';

function setup() {

    const props = {
        keyName: "my own keyName",
        object: ["a", "b", {c: "c value"}],
        toggleOpen: jest.fn(),
        renderer: ResultComparerObjectRenderer
    }

    const wrapper = shallow(<ResultComparerArray {...props}/>);

    return {wrapper, props};
}


describe('Result Comparer Array', () => {
    const {wrapper, props} = setup();

    it('Should correcly render self and subcomponents', () => {

        const root = wrapper.find(".object-data-container.type-array");
        expect(root.length).toEqual(1);

        const title = wrapper.find('ResultComparerTitle');
        expect(title.length).toEqual(1);
        expect(title.props().type).toEqual("array");
        expect(title.props().keyName).toEqual(props.keyName);

        //TODO: Can't really test these functions with shallowWrapper :/ see what to do
        expect(typeof title.props().handler).toEqual('function');

        const subRenderers = wrapper.find('ResultComparerObjectRenderer');
        expect(subRenderers.length).toEqual(props.object.length);

        //primitives are renderLater'd so => 3, 1, 2 is the expected order
        expect(subRenderers.at(0).props().keyName).toEqual("3)");
        expect(subRenderers.at(0).props().object).toEqual(props.object[2]);
        expect(subRenderers.at(0).props().handleToggleOpen).toEqual(props.toggleOpen);     


        expect(subRenderers.at(1).props().keyName).toEqual("1)");
        expect(subRenderers.at(1).props().object).toEqual(props.object[0]);
        expect(subRenderers.at(1).props().handleToggleOpen).toEqual(props.toggleOpen);    

        expect(subRenderers.at(2).props().keyName).toEqual("2)");
        expect(subRenderers.at(2).props().object).toEqual(props.object[1]);
        expect(subRenderers.at(2).props().handleToggleOpen).toEqual(props.toggleOpen);    
    });



    it('Should correctly invoke functions', () => {

        const subRenderers = wrapper.find('ResultComparerObjectRenderer');

        expect(props.toggleOpen.mock.calls.length).toEqual(0);
        subRenderers.at(0).props().handleToggleOpen();
        expect(props.toggleOpen.mock.calls.length).toEqual(1);

        subRenderers.at(1).props().handleToggleOpen();
        expect(props.toggleOpen.mock.calls.length).toEqual(2);

        subRenderers.at(2).props().handleToggleOpen();
        expect(props.toggleOpen.mock.calls.length).toEqual(3);

    });


});













                                    // key={`array${number}`}
                                    // number={number}
                                    // keyName={props.keyName}
                                    // toggleOpen={props.handleToggleOpen}
                                    // object={props.object}
                                    // renderer={ResultComparerObjectRenderer}