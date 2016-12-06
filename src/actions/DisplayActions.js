import * as types from './actionTypes';


export const toggleNavbarDisplay = () => {
    return {type: types.TOGGLE_VISIBILITY};
}

export const changeSearchType = (value) => {
    return {type: types.CHANGE_SEARCH_TYPE, value}
}

