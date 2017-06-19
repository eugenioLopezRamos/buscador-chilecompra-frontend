import fetchApi from '../api/fetchApi';
import * as types from '../constants/actionTypes';


export const fetchChilecompraDataSuccess = (state, data) => {
    return {type:types.FETCH_CHILECOMPRA_DATA_SUCCESS, data, query: state};
}; 
export const fetchChilecompraDataFailure = (state, error) => {
    return {type: types.FETCH_CHILECOMPRA_DATA_FAILURE, value: error, query: state};
};

export const loadChilecompraData = (state) => {
    const dayInMs = 24 * 60 * 60 * 1000;
    // check that distance between startdate and enddate is smaller
    //than 31 days
    if(state.endDate - state.startDate  > 31 * dayInMs ) {
        const  message = {errors: "Fechas no pueden tener mas de 31 días de distancia"};
        return fetchChilecompraDataFailure(state, {message});
    }

    return function(dispatch) {
        dispatch({type: types.FETCH_CHILECOMPRA_DATA_START});
        return fetchApi.getChilecompraData(state)
            .then(response => {
                if(response.status >= 200 && response.status < 300) {
                    return response.json()
                            .then(data => {
                                dispatch(fetchChilecompraDataSuccess(state, data));
                            });
                }
                return response.json().then(error => {
                    return dispatch(fetchChilecompraDataFailure(state, error));
                });
            })
            .catch((error) => {
                const errors = {message: {errors: error}}; 
                return dispatch(fetchChilecompraDataFailure(state, {errors}));
            });
    };  
};

