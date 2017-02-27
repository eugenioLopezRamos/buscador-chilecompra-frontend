import React from 'react';
import {shallow} from 'enzyme';
import FullScreenPane from '../FullScreenPane';

function setup() {
    //using mock as components
    const mockMenu = () => <div className="prop-menu"></div>;
    const mockComponent = () => <div className="prop-component"></div>;

    const props = {
        menu: mockMenu,
        component: mockComponent,
        componentProps: {prop1: "mock prop", prop2: jest.fn()},
        show: true,
        hide: jest.fn()
    }
    const wrapper = shallow(<FullScreenPane {...props}/>);

    return {
        wrapper,
        props
    }
}

describe('Component', () => {

    const {wrapper, props} = setup();
    const checkCallFunctionProps = (action, fn) => {
        expect(fn.mock.calls.length).toEqual(0);
        action();
        expect(fn.mock.calls.length).toEqual(1);
    }
    
    describe('FullScreenPane', () => {

        it('Should render self and subcomponents', () => {
            //render root
            expect(wrapper.find('.prompt-background').length).toEqual(1);
            expect(wrapper.find('.prompt-background-container').length).toEqual(1);
            expect(wrapper.find('mockMenu').length).toEqual(1);
            expect(wrapper.find('mockComponent').length).toEqual(1);
            


        });

        it('Should call functions', () => {

            const subComponent = wrapper.find('mockComponent');
            const subComponentProps = subComponent.props();
            expect(subComponentProps.prop1).toEqual(props.componentProps.prop1);
            expect(subComponentProps.prop2).toEqual(props.componentProps.prop2);
            checkCallFunctionProps(subComponentProps.prop2, props.componentProps.prop2);

            const paneBackground = wrapper.find('.prompt-background');
            const paneBackgroundProps = paneBackground.props();
            //since on stateless functional components you dont have access to refs using shallow
            // we use the default condition, that is, paneBackground = null
            const action = () => {paneBackgroundProps.onClick({target: null})}
            checkCallFunctionProps(action, props.hide);
        
        });
    });
});