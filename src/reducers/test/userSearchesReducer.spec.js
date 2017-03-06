import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import {userSearchesReducer as reducer} from '../userSearchesReducer';


describe('reducer', () => {
    describe('user searches reducer', () => {
        it('Should return the correct states', () => {
            
            let action = {type: undefined, value: undefined};
            let initialValue = initialState.userSearches;
            let expectedValue;
            let mockValue;

            expect(initialValue).toEqual(reducer(undefined, action));

            mockValue = {
                         name: ["aaa", "bbb", "ccc"],
                         value: [{key1: "aaa", key2: "bbb"}, {key1: "zzz", key2: "yyy"}, {key1: "mmm", key2: "nnn"}],
                         id: [1,2,3]
            }
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