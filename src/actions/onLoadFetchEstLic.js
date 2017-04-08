import fetchApi from '../api/fetchApi';
import * as types from '../constants/actionTypes';

export const onLoadFetchEstLicSuccess = (value) => {
    return { type: types.FETCH_ESTADOS_LICITACION_SUCCESS, value };
};

export const onLoadFetchEstLicFailure = (value) => {
    //TODO: Make these actions appear in the <Flash> (messages reducer)
    return {type: types.FETCH_ESTADOS_LICITACION_FAILURE, value};
};

export const onLoadFetchEstLic = () => {
    return (dispatch) => {
        return fetchApi.getEstadosLicitacion()
        .then(orgs => {
            dispatch(onLoadFetchEstLicSuccess(orgs));
        })
        .catch(error => {dispatch(onLoadFetchEstLicFailure(error));});
    };
};



