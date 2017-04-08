import fetchApi from '../api/fetchApi';
import * as types from '../constants/actionTypes';

export const onLoadFetchOrgPubSuccess = (value) => {
 // http://stackoverflow.com/questions/36787892/can-a-redux-action-affect-multiple-parts-of-the-state-tree TL;DR: yes.
    let toArray = Object.keys(value).map (e => {
        let organismos = {};
        organismos[e] = value[e];
        return organismos;
    }); 
    toArray.unshift({"*": "Todos"});

    return { type: types.FETCH_ORGANISMOS_PUBLICOS_SUCCESS, value: toArray };
};

export const onLoadFetchOrgPubFailure = (value) => {
        //TODO: Make these actions appear in the <Flash> (messages reducer)
    return {type: types.FETCH_ORGANISMOS_PUBLICOS_FAILURE, value};
};

export const onLoadFetchOrgPub = () => {

    return (dispatch) => {

        return fetchApi.getOrganismosPublicos()
        .then(orgs => {

            dispatch(onLoadFetchOrgPubSuccess(orgs));

        })
        .catch(error => {dispatch(onLoadFetchOrgPubFailure(error));});

    };
};
