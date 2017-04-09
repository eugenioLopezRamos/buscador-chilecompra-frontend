import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import {userSubscriptionsReducer as reducer} from '../userSubscriptionsReducer';
import {subscriptionsMock} from '../../__mocks__/subscriptionsMock';
import {initialDataLoadMock} from '../../__mocks__/initialDataLoadMock';

describe('Reducers', () => {

    describe('user subscriptions reducer', () => {

        it('Should return the correct state', () => {

            let initialValue = initialState.userSubscriptions;
            let expectedValue = initialValue;
            let action = {type: undefined, value: undefined};
            let mockValue = subscriptionsMock;

            expect(expectedValue).toEqual(reducer(undefined, action));

            //get subs from initial Load
            action = {type: types.INITIAL_USER_DATA_LOAD_SUCCESS, data: initialDataLoadMock};
            expectedValue = objectAssign({}, initialValue, action.data.subscriptions);
            expect(expectedValue).toEqual(reducer(undefined, action));

            // get subs success
            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_SUCCESS, value: mockValue};
            expectedValue = objectAssign({}, initialValue, mockValue);
            expect(expectedValue).toEqual(reducer(undefined, action));

            // get subs failure
            action = {type: types.USER_GET_RESULT_SUBSCRIPTIONS_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            // create sub
            mockValue["suscript3"] = 333;
            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_SUCCESS, value: {subscriptions: mockValue}};
            expectedValue = action.value.subscriptions;
            expect(expectedValue).toEqual(reducer(undefined, action));

            // create sub failure
            action = {type: types.USER_CREATE_RESULT_SUBSCRIPTION_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            // update sub success
            mockValue["suscript3"] = 777;
            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_SUCCESS, value: {subscriptions: mockValue}};
            expectedValue = action.value.subscriptions;
            expect(expectedValue).toEqual(reducer(undefined, action));

            // update sub failure
            action = {type: types.USER_UPDATE_RESULT_SUBSCRIPTION_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));

            //destroy sub
            delete mockValue["Suscrip1"];
            action = {type: types.USER_DELETE_RESULT_SUBSCRIPTION_SUCCESS, value:{subscriptions: mockValue}};
            expectedValue = mockValue;
            expect(expectedValue).toEqual(reducer(undefined, action));
        });
    });

});