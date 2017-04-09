import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import {userNotificationsReducer} from '../userNotificationsReducer';
import {notificationMock} from '../../__mocks__/notificationMock';
import {initialDataLoadMock} from '../../__mocks__/initialDataLoadMock';

describe('Reducers', () => {

    describe('User notifications', () => {

        it('Should return the correct states', () => {
            const reducer = userNotificationsReducer;

            let initialValue = initialState.userNotifications;
            let action = {type: undefined, value: undefined};
            let mockValue = notificationMock;
            let expectedValue;
            //return default
            expect(initialValue).toEqual(reducer(undefined, action));
            
            // get notifs from initial load
            action = {type: types.INITIAL_USER_DATA_LOAD_SUCCESS, data: initialDataLoadMock};
            expectedValue = objectAssign({}, initialValue, action.data.notifications);
            expect(expectedValue).toEqual(reducer(undefined, action));


            // get notifs
            action = {type: types.USER_GET_NOTIFICATIONS_SUCCESS, value: {notifications: mockValue}};
            expectedValue = objectAssign({}, initialValue, action.value);
            expect(expectedValue).toEqual(reducer(undefined, action));

            action = {type: types.USER_GET_NOTIFICATIONS_FAILURE};
            expectedValue = objectAssign({}, initialValue);
            expect(expectedValue).toEqual(reducer(undefined, action));       

            //delete notifs
            mockValue = {1: "Notification 1"};
            action = {type: types.USER_DELETE_NOTIFICATION_SUCCESS, value: {notifications: mockValue}};
            expectedValue = action.value.notifications;
            expect(expectedValue).toEqual(reducer(undefined, action));              

            action = {type: types.USER_DELETE_NOTIFICATION_FAILURE};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));       

            //logout
            action = {type: types.USER_LOGOUT_SUCCESS};
            expectedValue = initialValue;
            expect(expectedValue).toEqual(reducer(undefined, action));            

        });
    });
});