import fetchApi from '../api/fetchApi';
import * as types from './actionTypes';

export const fetchChilecompraDataSuccess = (data) => {
    return {type:types.FETCH_CHILECOMPRA_DATA_SUCCESS, data};
}; 

export const loadChilecompraData = () => {

    return function(dispatch, getState) {
        const state = {getState};
        return fetchApi.getChileCompraData(state)
            .then(data => {
                dispatch(fetchChilecompraDataSuccess(data));
            })
            .catch( error => {throw(error);} );
    };  
};


// export const FETCH_CHILECOMPRA_DATA_START = 'FETCH_CHILECOMPRA_DATA_START';
// export const FETCH_CHILECOMPRA_DATA_SUCCESS = 'FETCH_CHILECOMPRA_DATA_SUCCESS';
// export const FETCH_CHILECOMPRA_DATA_FAILURE = 'FETCH_CHILECOMPRA_DATA_FAILURE';

