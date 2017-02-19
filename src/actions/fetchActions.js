import fetchApi from '../api/fetchApi';
import * as types from '../constants/actionTypes';
import moment from 'moment';

export const fetchChilecompraDataSuccess = (state, data) => {

    console.log("data", data, "uery", state);
    return {type:types.FETCH_CHILECOMPRA_DATA_SUCCESS, data, query: state};
}; 
export const fetchChilecompraDataFailure = (state, data) => {
    return {type: types.FETCH_CHILECOMPRA_DATA_FAILURE, data, query: state}
}

export const loadChilecompraData = (state) => {

    return function(dispatch) {

        return fetchApi.getChileCompraData(state)
            .then(data => {dispatch(fetchChilecompraDataSuccess(state, data));})
            .catch( error => {dispatch(fetchChilecompraDataFailure(state, error));} );
    };  
};

export const shortLoadChilecompraData = (data) => {
      return function(dispatch) {
        return fetchApi.getChileCompraData(data);
    };  
}
