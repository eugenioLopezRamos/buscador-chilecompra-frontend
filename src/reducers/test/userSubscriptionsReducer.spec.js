import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import {userSubscriptionsReducer as reducer} from '../userSubscriptionsReducer';


describe('Reducers', () => {

    describe('user subscriptions reducer', () => {

        it('Should return the correct state', () => {

            let initialValue = initialState.userSubscriptions;
            let expectedValue = initialValue;
            let action = {type: undefined, value: undefined};
            let mockValue;

            expect(expectedValue).toEqual(reducer(undefined, action));

            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS};
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue = {"Suscrip1": 111, "suscrip2": 222};
            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS, value: mockValue};
            expectedValue = objectAssign({}, initialValue, mockValue);
            expect(expectedValue).toEqual(reducer(undefined, action));


            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue["suscript3"] = 333;
            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, value: {subscriptions: mockValue}};
            expectedValue = action.value.subscriptions;
            expect(expectedValue).toEqual(reducer(undefined, action));

            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            mockValue["suscript3"] = 777;
            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value: {subscriptions: mockValue}};
            expectedValue = action.value.subscriptions;
            expect(expectedValue).toEqual(reducer(undefined, action));

            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            delete mockValue["Suscrip1"];
            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value:{subscriptions: mockValue}};
            expectedValue = mockValue;
            expect(expectedValue).toEqual(reducer(undefined, action));
        });
    });

});