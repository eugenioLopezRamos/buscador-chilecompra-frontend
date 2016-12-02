// import fetchTest from '../api/fetchTest'

// const loadTest = () =>  {

//     return function(dispatch) {
//         return fetchTest.fetch()
//             .then( results => {
//                 dispatch(fetchTestSuccess(fetchTest));
//             })
//             .catch(error => {
//                 throw(error);
//             })
//     }
// }

// export default loadTest;

import fetchApi from '../api/fetchApi';
import * as types from './actionTypes';

export const fetchTestSuccess = (test) => {
    return {type:types.FETCH_TEST_SUCCESS, test}
} 

export const loadTest = () => {

    return function(dispatch, getState) {
        const state = {getState}
        return fetchApi.getTestResults(state)
            .then(test => {
                dispatch(fetchTestSuccess(test));
            })
            .catch( error => {throw(error)} )

    }
    
}


