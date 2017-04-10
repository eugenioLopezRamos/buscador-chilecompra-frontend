import fetchApi from '../api/fetchApi';
import * as types from '../constants/actionTypes';

export const fetchEstadosLicitacionSuccess = (value) => {
    return { type: types.FETCH_ESTADOS_LICITACION_SUCCESS, value };
};

export const fetchEstadosLicitacionFailure = (value) => {
    //TODO: Make these actions appear in the <Flash> (messages reducer)
    return {type: types.FETCH_ESTADOS_LICITACION_FAILURE, value};
};

export const fetchEstadosLicitacion = () => {
    return (dispatch) => {
        return fetchApi.getEstadosLicitacion()
        .then(orgs => {
            dispatch(fetchEstadosLicitacionSuccess(orgs));
        })
        .catch(error => {dispatch(fetchEstadosLicitacionFailure(error));});
    };
};



