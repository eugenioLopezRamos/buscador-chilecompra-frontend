import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import {userSearchesReducer as reducer} from '../userSearchesReducer';
import {searchesMock} from '../../__mocks__/searchesMock';
import {initialDataLoadMock} from '../../__mocks__/initialDataLoadMock';


describe('reducer', () => {
    describe('user searches reducer', () => {
        it('Should return the correct states', () => {
            
            let action = {type: undefined, value: undefined};
            let initialValue = initialState.userSearches;
            let expectedValue;
            let mockValue = searchesMock;

            expect(initialValue).toEqual(reducer(undefined, action));

            //get searches from initialLoad
            action = {type: types.INITIAL_USER_DATA_LOAD_SUCCESS, data: initialDataLoadMock};
            expectedValue = objectAssign({}, initialValue, action.data.searches);
            expect(expectedValue).toEqual(reducer(undefined, action));


            action = {type: types.USER_GET_SEARCHES_SUCCESS, value: {searches: mockValue}};
            expectedValue = action.value.searches;

            expect(expectedValue).toEqual(reducer(undefined, action));

            action = {type: types.USER_GET_SEARCHES_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue.name.push("ddd");
            mockValue.value.push({key1: "123", key2: "321"});
            mockValue.id.push(4);

            action = {type: types.USER_CREATE_SEARCHES_SUCCESS, value: {searches: mockValue}};
            expectedValue = action.value.searches;
            expect(expectedValue).toEqual(reducer(undefined, action));

            action = {type: types.USER_CREATE_SEARCHES_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue.name = mockValue.name.slice(1);
            mockValue.value = mockValue.value.slice(1);
            mockValue.id = mockValue.id.slice(1);

            action = {type: types.USER_DELETE_SEARCHES_SUCCESS, value: {searches: mockValue}};
            expectedValue = action.value.searches;
            expect(expectedValue).toEqual(reducer(undefined, action));


            action = {type: types.USER_DELETE_SEARCHES_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            action = {type: types.USER_LOGOUT_SUCCESS};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));
        });
    });
});