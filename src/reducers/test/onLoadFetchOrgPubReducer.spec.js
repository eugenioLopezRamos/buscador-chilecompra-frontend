import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import onLoadFetchOrgPubReducer from '../onLoadFetchOrgPubReducer';


describe('Reducers', () => {

    describe('Fetch organismos publicos reducer', () => {

        it('Shoud return correct states', () => {
            const reducer = onLoadFetchOrgPubReducer;

            let action = {type: undefined, value: undefined};
            let initialValue = initialState.organismosPublicos;

            expect(initialValue).toEqual(reducer(undefined, action))

            let mockValue = {1111: "Organismo publico 1"}
            action = {type: types.ONLOAD_FETCH_ORG_PUB_SUCCESS, value: mockValue};
            let expectedValue = mockValue;

            expect(expectedValue).toEqual(reducer(undefined, action))

        });
    });
});