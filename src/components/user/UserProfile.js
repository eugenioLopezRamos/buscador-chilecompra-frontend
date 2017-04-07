import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const UserProfile = (props) => {
    
    const handleSearchDelete = (index) => {
        let id = Object.values(props.userSearches.id)[index];
        props.deleteUserSearches(id);
    };

    const showStoredSearch = (component, index) => {
        props.showStoredSearch(component, index);
    };

    const executeStoredSearch = (component, index) => {
        props.executeStoredSearch(component, index);
    };

    const handleSubscriptionDelete = (name) => {
        props.deleteUserSubscription(name);   
    };

    const handleShowSubscriptionHistory = (component, resultId, resultName) => {
        // do a request to the API for all records with CodigoExterno equal to Result.where(id: resultId).first.value["Listado"][0]["CodigoExterno"]
        // and the resultName is used only on the front end so the user can have a reference of what he/she clicked
        props.getResultHistory(component, resultId, resultName);
    };

    return(
        <div className="profile-container">
     
            <div className="profile-stored-searches">
                <h2>Búsquedas guardadas</h2>
                {
                    props.userSearches && Object.keys(props.userSearches).length > 0 ? props.userSearches.name.map((search,index) => {
                    //so, here I need some way to call the deleteSearch() function so it identifies each search
                    // Probably something like onClick=deleteSearch.bind(currentIndex)
                    // and then we need to trigger a refresh of the userSearches after deletion is confirmed successful
                    //which can be done by responding to that action in the userSearches reducer
                    return (<li className="list-group-item saved-items" key={"search" + search}>
                                <span className="saved-items-description">{search}</span>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {executeStoredSearch(props.components.SearchResults, index);}}>Ejecutar</button>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {showStoredSearch(props.components.InputFieldsContainer, index);}}>Modificar</button>
                                <button type="button" className="btn btn-primary pull-right"onClick={() => {handleSearchDelete(index);}} >Eliminar</button>
                            </li>);
                    }) : <li className="list-group-item saved-items" key={"search-empty"}>
                            <span className="saved-items-description">No hay búsquedas guardadas</span>
                            <Link to="/busqueda" className="btn btn-primary pull-right">
                                <span className="link-button-text">Buscar</span>
                            </Link>
                         </li>
                }
            </div>

            <div className="profile-stored-subscriptions">
                <h2>Suscripciones</h2>
                {
                    props.userSubscriptions && Object.keys(props.userSubscriptions).length > 0 ? Object.keys(props.userSubscriptions).map(subscription => {
                        let resultId = props.userSubscriptions[subscription];
                        let resultName = subscription;
                        return (<li className="list-group-item saved-items" key={"results" + subscription}>
                              
                                    <span className="saved-items-description">
                                          <div className="desc-text">
                                        {subscription}
                                          </div>
                                        </span>
                              
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {handleShowSubscriptionHistory(props.components.ResultComparer, resultId, resultName);}}>Mostrar</button>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {props.showModal(subscription);}}>Modificar</button>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {handleSubscriptionDelete(subscription);}}>Eliminar</button>
                               </li>);
                    }) :  <li className="list-group-item saved-items" key={"results-empty"}>
                            <span className="saved-items-description">No hay suscripciones guardadas</span>
                            <Link to="/busqueda" className="btn btn-primary pull-right">
                                <span className="link-button-text">Buscar</span>
                            </Link>
                          </li>
                }
            </div>
        </div>
    );

};

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    userSearches: PropTypes.object.isRequired,
    userSubscriptions: PropTypes.object.isRequired
};

export default UserProfile;
