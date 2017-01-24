import * as types from './actionTypes';


export const toggleNavbarDisplay = () => {
    return {type: types.TOGGLE_NAVBAR_VISIBILITY};
}

// export const changeSearchType = (value) => {
//     return {type: types.CHANGE_SEARCH_TYPE, value}
// }

export const toggleNotificationsDisplay = () => {
    return {type: types.TOGGLE_NOTIFICATIONS_VISIBILITY};
}