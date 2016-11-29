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

import fetchTestApi from '../api/fetchTestApi';
import * as types from './actionTypes';

export const fetchTestSuccess = (test) => {
    return {type:types.FETCH_TEST_SUCCESS, test}
} 

export const loadTest = () => {

    return function(dispatch) {
        return fetchTestApi.getTestResults()
            .then(test => {
                dispatch(fetchTestSuccess(test));
            })
            .catch( error => {throw(error)} )
    }
    
}


