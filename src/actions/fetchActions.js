import fetchApi from '../api/fetchApi';
import * as types from '../constants/actionTypes';


export const fetchChilecompraDataSuccess = (state, data) => {
    return {type:types.FETCH_CHILECOMPRA_DATA_SUCCESS, data, query: state};
}; 
export const fetchChilecompraDataFailure = (state, data) => {
    return {type: types.FETCH_CHILECOMPRA_DATA_FAILURE, data, query: state};
};

export const loadChilecompraData = (state) => {

    return function(dispatch) {
        dispatch({type: types.FETCH_CHILECOMPRA_DATA_START});
        return fetchApi.getChilecompraData(state)
            .then(data => {dispatch(fetchChilecompraDataSuccess(state, data));})
            .catch( error => {dispatch(fetchChilecompraDataFailure(state, error));} );
    };  
};

