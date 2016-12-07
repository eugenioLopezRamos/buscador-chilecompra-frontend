import fetchApi from '../api/fetchApi';
import * as types from './actionTypes';

export const fetchChilecompraDataSuccess = (data) => {
    return {type:types.FETCH_CHILECOMPRA_DATA_SUCCESS, data};
}; 
export const fetchChilecompraDataFailure = (data) => {
    return {type: types.FETCH_CHILECOMPRA_DATA_FAILURE, data}
}

export const loadChilecompraData = () => {

    return function(dispatch, getState) {
        const state = {getState};
        return fetchApi.getChileCompraData(state)
            .then(data => {dispatch(fetchChilecompraDataSuccess(data));})
            .catch( error => {dispatch(fetchChilecompraDataFailure(error));} );
    };  
};

