import fetchApi from '../api/fetchApi';
import * as types from './actionTypes';
import moment from 'moment';

export const fetchChilecompraDataSuccess = (data) => {
    return {type:types.FETCH_CHILECOMPRA_DATA_SUCCESS, data};
}; 
export const fetchChilecompraDataFailure = (data) => {
    return {type: types.FETCH_CHILECOMPRA_DATA_FAILURE, data}
}

export const loadChilecompraData = () => {

    return function(dispatch, getState) {
        const state = {getState}.getState();
        return fetchApi.getChileCompraData(state)
            .then(data => {dispatch(fetchChilecompraDataSuccess(data));})
            .catch( error => {dispatch(fetchChilecompraDataFailure(error));} );
    };  
};

export const shortLoadChilecompraData = (data) => {
    console.log("DATAAAA", data);
    console.log("moment", moment(data.date));
    let mom = moment;

    //debugger;
    let modifiedData = data;

    //  let artificialState = {};
    //  artificialState["inputFieldValues"] = data;
      return function(dispatch) {
    //      console.log("dataaaa2", artificialState);
        return fetchApi.shortGetChileCompraData(modifiedData);
    };  
}