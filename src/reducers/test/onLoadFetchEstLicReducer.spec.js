import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import onLoadFetchEstLicReducer from '../onLoadFetchEstLicReducer';

describe('Reducers', () => {

    describe('fetch Estados Licitacion Reducer', () => {
        
        it('Should return correct states', () => {
            const reducer = onLoadFetchEstLicReducer;

            //should return default state
            let expectedValue = initialState.estadosLicitacion;
            let action = {type: undefined, value: undefined};
            expect(expectedValue).toEqual(reducer(undefined, action))


            let mockValue = {1: "Estado Licitacion 1"};
            action = {type: types.ONLOAD_FETCH_EST_LIC_SUCCESS, value: mockValue};
            expectedValue = objectAssign({}, initialState.estadosLicitacion, mockValue);
            expect(expectedValue).toEqual(reducer(undefined, action))


        });
    });
});
