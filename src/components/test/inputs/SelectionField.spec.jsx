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
            expect(enzymeWrapper.find('.col-xs-12.col-md-10.col-lg-4.no-gutter').length).toBe(1);
            expect(enzymeWrapper.find('option').length).toBe(Object.keys(props.estadosLicitacion).length)

            const select = enzymeWrapper.find('select.col-xs-12.col-md-10.col-lg-4.no-gutter').at(0);
            expect(typeof select.props().onChange).toEqual("function");


            const option1 = enzymeWrapper.find('option').at(0);
            expect(option1.props().value).toBe("*");
            expect(option1.text()).toBe("Todos (*)");

            const option2 = enzymeWrapper.find('option').at(1);
            expect(option2.props().value).toBe("19");
            expect(option2.text()).toBe("Suspendida (19)");

            const option3 = enzymeWrapper.find('option').at(2);
            expect(option3.props().value).toBe("5");
            expect(option3.text()).toBe("Publicada (5)");

        });

        it('Should invoke functions passed as props correctly', () => {
            const select = enzymeWrapper.find('select.col-xs-12.col-md-10.col-lg-4.no-gutter').at(0);
            expect(props.onChange.mock.calls.length).toBe(0);
            select.simulate("change", {target: {value: "5"}});
            expect(props.onChange.mock.calls.length).toBe(1);


        });
    });
});