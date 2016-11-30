import fetchApi from '../api/fetchApi';
import * as types from './actionTypes';

export const onLoadFetchEstLicSuccess = (value) => {
    return { type: types.ONLOAD_FETCH_EST_LIC_SUCCESS, value }
}

export const onLoadFetchEstLic = () => {
    return (dispatch) => {
        return fetchApi.getEstadosLicitacion()
        .then( orgs => {
            dispatch(onLoadFetchEstLicSuccess(orgs))
        })
        .catch(error => {throw error })
    }
}



