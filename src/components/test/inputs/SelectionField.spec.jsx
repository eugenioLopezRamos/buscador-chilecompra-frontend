import React from 'react';
import {shallow} from 'enzyme';
import SelectionField from '../../inputs/SelectionField';

function setup() {

    const props = {
        estadosLicitacion: {
            "Todos": "*",
            "Suspendida": 19,
            "Publicada": 5
        },
        onChange: jest.fn()
    }

    const enzymeWrapper = shallow(<SelectionField {...props}/>);

    return {
        enzymeWrapper,
        props
    }
}

describe('Component', () => {

    describe('SelectionField', () => {
        const {enzymeWrapper, props} = setup();

        it('Should render self and subcomponents', () => {
            expect(enzymeWrapper.find('div').length).toBe(1);
            expect(enzymeWrapper.find('Select').length).toBe(1);

            const select = enzymeWrapper.find('Select').at(0);
            expect(typeof select.props().onChange).toEqual("function");


            const option1 = select.props().options[0];
            const expectedOption1 = {value: "*", key: "Todos", label: "Todos (*)"}
            expect(option1).toEqual(expectedOption1);


            const option2 = select.props().options[1];
            const expectedOption2 = {value: "19", key: "Suspendida", label: "Suspendida (19)"}
            expect(option2).toEqual(expectedOption2);

            const option3 = select.props().options[2];
            const expectedOption3 = {value: "5", key: "Publicada", label: "Publicada (5)"}
            expect(option3).toEqual(expectedOption3);

        });

        it('Should invoke functions passed as props correctly', () => {
            const select = enzymeWrapper.find('Select').at(0);
            expect(props.onChange.mock.calls.length).toBe(0);
            select.simulate("change", {target: {value: "5"}});
            expect(props.onChange.mock.calls.length).toBe(1);


        });
    });
});