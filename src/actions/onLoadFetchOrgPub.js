import fetchApi from '../api/fetchApi';
import * as types from './actionTypes';

export const onLoadFetchOrgPubSuccess = (value) => {
    return { type: types.ONLOAD_FETCH_ORG_PUB_SUCCESS, value }
}

export const onLoadFetchOrgPub = () => {

    return (dispatch) => {

        return fetchApi.getOrganismosPublicos()
        .then( orgs => {

            dispatch(onLoadFetchOrgPubSuccess(orgs))

        })
        .catch(error => {throw error })

    }
}
