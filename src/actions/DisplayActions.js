import * as types from '../constants/actionTypes';


export const toggleNavbarDisplay = () => {
    return {type: types.TOGGLE_NAVBAR_VISIBILITY};
};

export const toggleNotificationsDisplay = () => {
    return {type: types.TOGGLE_NOTIFICATIONS_VISIBILITY};
};