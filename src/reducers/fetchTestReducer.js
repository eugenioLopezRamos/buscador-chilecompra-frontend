import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fetchTestReducer(state = initialState, action){
    switch(action.type) {
        case types.FETCH_TEST_SUCCESS:
            console.log("ac test", action.test);
            return action.test
        default:
            return state

    }
}

//export default fetchTestReducer;