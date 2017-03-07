import fetchApi from '../api/fetchApi';
import * as types from '../constants/actionTypes';

export const onLoadFetchEstLicSuccess = (value) => {
    return { type: types.ONLOAD_FETCH_EST_LIC_SUCCESS, value }
}

export const onLoadFetchEstLicFailure = (value) => {
    //TODO: Make these actions appear in the <Flash> (messages reducer)
    return {type: types.ONLOAD_FETCH_EST_LIC_FAILURE, value}
}

export const onLoadFetchEstLic = () => {
    return (dispatch) => {
        return fetchApi.getEstadosLicitacion()
        .then(orgs => {
            dispatch(onLoadFetchEstLicSuccess(orgs))
        })
        .catch(error => {dispatch(onLoadFetchEstLicFailure(error))})
    }
}



