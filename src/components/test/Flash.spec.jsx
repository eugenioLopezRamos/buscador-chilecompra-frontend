import React from 'react';
import {shallow} from 'enzyme';
import Flash from '../Flash';
import configureMockStore from 'redux-mock-store';
import * as types from '../../constants/actionTypes';

const mockStore = configureMockStore();
const store = mockStore();

const contextObject = {
    context: {store},
    childContextTypes: {store: React.PropTypes.Object}
}

function setup() {
    const props = {
        messagesHandler: undefined,
        messages: {
            Info: "Mock Info",
            Errores: "Mock Error"
        }
    }


    const wrapper = shallow(<Flash {...props}/>, contextObject)


    return {wrapper, props}
}


describe('Component', () => {

    const {wrapper, props} = setup();

    describe('Flash', () => {

        it('Should render self and subcomponents', () => {

            //renders root
            expect(wrapper.find('.flash-center').length).toEqual(1);
            //renders message wrap
            expect(wrapper.find('.message-wrap').length).toEqual(1);
            //renders body of message
            const messageTypes = Object.keys(props.messages).length;
            //This test assumes that there is one message per type (per flash).
            // as messages are deleted from the flash when hiding it, I take it as a 
            //  reasonable assumption
            expect(wrapper.find('.info').length).toEqual(messageTypes);
            expect(wrapper.find('.message-type').length).toEqual(messageTypes);
            expect(wrapper.find('.message-body').length).toEqual(messageTypes);
            const messageBodies = wrapper.find('.message-body');
            messageBodies.forEach((body, index) => {
                let currentType = Object.keys(props.messages)[index];
                expect(body.text()).toEqual(props.messages[currentType]);
            })


        });
        
        it('Should test that functions are called correctly', () => {

            const componentRoot = wrapper.find('.flash-center');
            const componentRootProps = componentRoot.props();
            const expectedActions = [{type: types.MESSAGES_DELETE_MESSAGES}];

            componentRoot.simulate("click");
            expect(store.getActions()).toEqual(expectedActions);

        });

    });
});

