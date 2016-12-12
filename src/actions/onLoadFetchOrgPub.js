import fetchApi from '../api/fetchApi';
import * as types from './actionTypes';

export const onLoadFetchOrgPubSuccess = (value) => {
  
    let toArray = Object.keys(value).map (e => {
        let organismos = {};
        organismos[e] = value[e];
        return organismos;
    }) 
    toArray.unshift({"*": "Todos"});
    
    return { type: types.ONLOAD_FETCH_ORG_PUB_SUCCESS, value: toArray }
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
