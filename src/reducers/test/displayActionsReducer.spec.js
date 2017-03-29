import * as types from '../../constants/actionTypes';
import initialState from '../initialState';
import objectAssign from 'object-assign';
import displayActionsReducer from '../displayActionsReducer';


describe('Reducer', () => {

    describe('DisplayActions reducer', () => {

        it('Should correctly return default state', () => {
            expect(displayActionsReducer(undefined, {type: undefined})).toEqual(initialState.display);
        });

        it('Should correctly return state according to action', () => {
            function compareResults(action, expectedResult) {
                expect(expectedResult).toEqual(displayActionsReducer(undefined, action));
            }
            
            let action = {type: undefined};
            let expectedResult = initialState.display;

            action.type = types.TOGGLE_NAVBAR_VISIBILITY;
            expectedResult = objectAssign({}, expectedResult, {showNavbar: !expectedResult.showNavbar});
            compareResults(action, expectedResult);

            action.type = types.NAVBAR_OFF;
            expectedResult = objectAssign({}, expectedResult, {showNavbar: false});
            compareResults(action, expectedResult);

            action.type = types.USER_SEND_LOGIN_INFO_SUCCESS;
            expectedResult = objectAssign({}, expectedResult, {showNavbar: false, showNotifications: false});
            compareResults(action, expectedResult);

            action.type = types.USER_LOGOUT_SUCCESS;
            expectedResult = objectAssign({}, expectedResult, {showNavbar: false, showNotifications: false});
            compareResults(action, expectedResult);

            action.type = types.TOGGLE_NOTIFICATIONS_VISIBILITY;
            expectedResult = objectAssign({}, expectedResult, {showNavbar: false, showNotifications: !initialState.showNotifications});
            compareResults(action, expectedResult);


            action.type = types.HIDE_ALL;
            expectedResult = objectAssign({}, expectedResult, {showNavbar: false, showNotifications: false});
            compareResults(action, expectedResult);

        });


    });
});