import * as types from '../actions/actionTypes';
import initialState from './initialState';

const fetchTestReducer = (state = initialState.results, action) => {
    switch(action.type) {
        case types.FETCH_TEST_SUCCESS:
            return action.test
        default:
            return state

    }
}

export default fetchTestReducer;