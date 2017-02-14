import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';


export const displayActionsReducer = (state = initialState.display, action) => {
    switch(action.type) {
        case types.TOGGLE_NAVBAR_VISIBILITY:
            return objectAssign({}, state, {showNavbar: !state.showNavbar });
        
        case types.NAVBAR_OFF:
            return objectAssign({}, state, {showNavbar: false});

        case types.USER_SEND_LOGIN_INFO_SUCCESS:
            return objectAssign({}, state, {showNavbar: false, showNotifications: false});
        
        case types.USER_LOGOUT_SUCCESS:
            return objectAssign({}, state, {showNavbar: false, showNotifications: false});

        case types.TOGGLE_NOTIFICATIONS_VISIBILITY:
            return objectAssign({}, state, {showNotifications: !state.showNotifications});
        
        case types.HIDE_ALL:
            return objectAssign({}, state, {showNavbar: false, showNotifications: false})
        default:
            return state;
    };
};



// export function searchTypeReducer(state = initialState.searchType, action) {
//     switch(action.type) {
//         case types.CHANGE_SEARCH_TYPE:
//             return action.value;
//         default: 
//             return state;
//     };
// };