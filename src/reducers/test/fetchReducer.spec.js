import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import fetchReducer from '../fetchReducer';


describe('Reducers', () => {

    describe('fetch reducer', () => {

        it('Should return states correctly', () => {
            function compareResults(action, expectedValue) {
                expect(expectedValue).toEqual(fetchReducer(undefined, action));
            }

            let action = {type: undefined};
            compareResults(action, initialState.searchResults);

            action.data = {data: "Here's some data"};
            action.type = types.FETCH_CHILECOMPRA_DATA_SUCCESS;
            compareResults(action, action.data);

            action.error = {error: "mistakes were made"};
            action.type = types.FETCH_CHILECOMPRA_DATA_FAILURE;
            compareResults(action, action.error);


        });


    })


})