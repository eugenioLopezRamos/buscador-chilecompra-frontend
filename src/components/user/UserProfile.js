import React, {PropTypes} from 'react';

const UserProfile = (props) => {
    
    // let notificaciones = Object.keys(props.userNotifications).map(e => {
    //                     return <li className="list-group-item" key={"numero" + e}>{props.userNotifications[e]}</li>;
    //                 })
    
    const handleSearchDelete = (index) => {
        let id = Object.values(props.userSearches.id)[index];
        props.actions.deleteUserSearches(id);
    }

    const showStoredSearch = (component, index) => {
        props.showStoredSearch(component, index);
    }

    const executeStoredSearch = (component, index) => {
        props.executeStoredSearch(component, index);
    }

    const handleSubscriptionDelete = (name) => {
        props.actions.deleteSubscription(name);   
    }

    const handleUpdateSubscription = () => {
        props.actions.updateSubscription
    }

    const handleShowSubscriptionHistory = (component, resultId) => {
        // do a request to the API for all records with CodigoExterno equal to Result.where(id: resultId).first.value["Listado"][0]["CodigoExterno"]
        //
        props.getResultHistory(component, resultId);
    }


    //console.log("USERPROF PROPS", props);
    return(
        <div className="perfil-container">

      
            <div className="perfil-busquedas-guardadas">
                <h2>Búsquedas guardadas</h2>
                {
                    props.userSearches && Object.keys(props.userSearches).length > 0 ? props.userSearches.name.map((e,i) => {
                    //so, here I need some way to call the deleteSearch() function so it identifies each search
                    // Probably something like onClick=deleteSearch.bind(currentIndex)
                    // and then we need to trigger a refresh of the userSearches after deletion is confirmed successful
                    //which can be done by responding to that action in the userSearches reducer
                    return <li className="list-group-item saved-items" key={"search" + e}>
                                <span className="saved-items-description">{e}</span>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {executeStoredSearch(props.components.SearchResults, i)}}>Ejecutar</button>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {showStoredSearch(props.components.ModifyInputFieldsContainer, i)}}>Modificar</button>
                                <button type="button" className="btn btn-primary pull-right"onClick={() => {handleSearchDelete(i)}} >Eliminar</button>
                            </li>
                    }) : <li className="list-group-item saved-items" key={"search-empty"}>
                            <span className="saved-items-description">No hay búsquedas guardadas</span>
                            <button type="button" className="btn btn-primary pull-right" onClick={() => {alert("deberia ser un link!")}}>Buscar</button>
                         </li>
                }
            </div>

            <div className="perfil-suscripciones-guardados">
                <h2>Suscripciones</h2>
                {
                    props.userSubscriptions && Object.keys(props.userSubscriptions).length > 0 ? Object.keys(props.userSubscriptions).map((e, i) => {
                        let resultId = props.userSubscriptions[e];
                        return <li className="list-group-item saved-items" key={"results" + e}>
                                <span className="saved-items-description">{e}</span>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {handleShowSubscriptionHistory(props.components.ResultComparer, resultId)}}>Mostrar</button>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {props.showModal(e)}}>Modificar</button>
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {handleSubscriptionDelete(e)}}>Eliminar</button>
                               </li>
                    }) :  <li className="list-group-item saved-items" key={"results-empty"}>
                            <span className="saved-items-description">No hay suscripciones</span>
                            <button type="button" className="btn btn-primary pull-right" onClick={() => {alert("deberia ser un link a buscar!!")}}>Buscar</button>
                          </li>
                }
            </div>
        </div>
    )

}

UserProfile.propTypes = {

    user: PropTypes.object.isRequired

}

export default UserProfile;


            // <div className="list-group perfil-notificaciones">
            //     <span className="list-group-item">
            //         Notificaciones
            //         <span className="badge">
            //           {notificaciones.length}
            //         </span>
            //     </span>
            //     <div className="ul-container">
            //         <ul className="notifications-list-items-container">
            //             {notificaciones}

            //         </ul>
            //     </div>
            // </div>