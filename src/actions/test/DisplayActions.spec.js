import * as types from '../../constants/actionTypes';
import * as actions from '../DisplayActions';


describe('Tests the display actions', () => {

    it('should toggle the navbar visibility status', () => {
        let action = actions.toggleNavbarDisplay();
        expect({type: types.TOGGLE_NAVBAR_VISIBILITY}).toEqual(action);
    })

    it('should toggle the notifications visibility status', () => {
        let action = actions.toggleNotificationsDisplay();
        expect({type: types.TOGGLE_NOTIFICATIONS_VISIBILITY}).toEqual(action);
    })




})


