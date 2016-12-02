import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fetchTestReducer(state = initialState.searchResults, action){
    switch(action.type) {
        case types.FETCH_TEST_SUCCESS:
           // let newState;
            // newState = Object.assign({}, state, {test: action.test});
            // return newState;
            return action.test
        default:
            return state

    }
}

//export default fetchTestReducer;