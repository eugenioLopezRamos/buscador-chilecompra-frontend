import React from 'react';
import {shallow} from 'enzyme';
import JSONSchemaCheckBoxes from '../JSONSchemaCheckboxes';
import {chileCompraResponseExample} from '../../utils/objectSchemaExamples';
import {isPrimitive} from '../../utils/miscUtils';
import {RESULTS_INITIAL_CHECKBOXES} from '../../constants/resultsInitialCheckboxes';
import {getObjectSchema} from '../../utils/miscUtils';
import objectAssign from 'object-assign';

function setup() {

    const props = {
        changeColumns: jest.fn()
    }

    const wrapper = shallow(<JSONSchemaCheckBoxes {...props}/>);

    return {wrapper, props};
}

function countObjectProps(object){
    let propsAmount = 0;

    Object.keys(object).map((key) => {
        if(key === "Items") {
                // add 1 for "Cantidad" + 1 for "Listado"
                // because "Listado" is not rendered as checkboxes (since each licitacion)
                // has a different amount of Listado items with different amount of keys etc etc
                // it is rendered as a link to be displayed in a <ObjectDetails /> component
                propsAmount += 2;
        }
        else if(!isPrimitive(object[key])) {
            propsAmount += countObjectProps(object[key]);
        }
        else {
            propsAmount += 1  
        }

    });

    return propsAmount

}

describe('Component', () => {

    describe('JSONSchemaCheckBoxes', () => {
        const {wrapper, props} = setup();
        const instance = wrapper.instance();
        const state = instance.state;
        const checkboxAmount = countObjectProps(chileCompraResponseExample);
     


        it('Should render self and subcomponents', () => {

            //root
            expect(wrapper.find('div.fixed-size-searchTab-container').length).toEqual(1);
            //action guide
            expect(wrapper.find('h4').length).toEqual(1);
            expect(wrapper.find('h4').text()).toEqual('Filtrar columnas');
            //checkboxes container
            expect(wrapper.find('div.schema-object-container').length).toEqual(1);

            //renders the correct amount of checkboxes
            expect(wrapper.find('input[type="checkbox"]').length).toEqual(checkboxAmount);
            //The correct number of checkboxes are checked at the beginnning
            expect(wrapper.find('input[type="checkbox"][checked=true]').length).toEqual(RESULTS_INITIAL_CHECKBOXES.length)

            //loads the initial checked checkboxes state
            expect(state.picked).toEqual(RESULTS_INITIAL_CHECKBOXES);
            expect(instance.objectSchema).toEqual(getObjectSchema(chileCompraResponseExample));

        });

        it('Should invoke functions correctly', () => {
            
            const functionChangesState = (target, action, actionArgs, expectedStateChange) => {
                const initialState = instance.state;
                target.props()[action](actionArgs);
    

                expect(instance.state).toEqual(objectAssign(instance.state, expectedStateChange));
            }

            // Will pick a random checkbox index
            const randomNumber = Math.floor(Math.random() * checkboxAmount); 

            const checkboxes = wrapper.find('input[type="checkbox"]')
            const testCheckbox = checkboxes.at(randomNumber);

            let mockTag = instance.tags[randomNumber];
            let isAlreadyChecked = () => {
                // If state.picked includes our mockTag, it is checked (picked)
                if(JSON.stringify(instance.state.picked).includes(JSON.stringify(mockTag))) {
                    return true;
                }
                return false;
            };


            let expectedStateChange;
            function createExpectedStateChange() {
                if(isAlreadyChecked()) {
                    let pickedCopy = instance.state.picked.slice();
                    expectedStateChange = {
                        picked: utils.removeArrayFromArray(mockTag, pickedCopy)
                    }
                    
                }else {
                    expectedStateChange = {
                        picked: instance.state.picked.concat(mockTag)
                    }
                }
            }
            createExpectedStateChange();
            //checks if prop function fires
            expect(props.changeColumns.mock.calls.length).toEqual(0);
            //if checked => unchecks (and viceversa)
            functionChangesState(testCheckbox, "onChange", {target: testCheckbox.props()}, expectedStateChange);
            //checks if prop function fires
            expect(props.changeColumns.mock.calls.length).toEqual(1);
            createExpectedStateChange();
            // if unchecked => checks (and viceversa)
            functionChangesState(testCheckbox, "onChange", {target: testCheckbox.props()}, expectedStateChange);
            //checks if prop function fires
            expect(props.changeColumns.mock.calls.length).toEqual(2);           
            
        });

    });


});