import React from 'react';
import {shallow} from 'enzyme';
import ObjectDetails from '../ObjectDetails';
import {chileCompraResponseExample} from '../../utils/objectSchemaExamples';
import * as utils from '../../utils/miscUtils';

// Object Details is used to display the Items property on Licitaciones
function setup() {

    const props = {
        objectData: chileCompraResponseExample.Listado[0].Items.Listado
    };
    const wrapper = shallow(<ObjectDetails {...props}/>);

    return {wrapper, props};
}

function countPropsPerTypes(object) {

    let primitivesCount = 0;
    let objectsCount = 0;


    Object.keys(object).map(key => {

        if(utils.isPrimitive(object[key])) {
            primitivesCount += 1;
        } 
        else {
            let result  = countPropsPerTypes(object[key]);
            let primitivesSubCount = result.primitivesCount;
            let objectsSubCount = result.objectsCount;
            primitivesCount += primitivesSubCount;
            //+1 because it was an object, but might return zero it's something like {key1: "value1"}
            objectsCount += objectsSubCount + 1;
        }
    });

    return {primitivesCount, objectsCount};
}

describe('Component', () => {

    const {wrapper, props} = setup();
    const {primitivesCount, objectsCount} = countPropsPerTypes(props.objectData);


    describe('ObjectDetails', () => {

        it('Should render self and subcomponents', () => {

            expect(wrapper.find('ul.object-details-root').length).toEqual(1);
            expect(wrapper.find('.object-details-primitive').length + wrapper.find('.object-details-root-primitive').length).toEqual(primitivesCount);
            expect(wrapper.find('.object-details-root-subObject').length + wrapper.find('.object-details-subObject').length).toEqual(objectsCount);

        });


    });


});