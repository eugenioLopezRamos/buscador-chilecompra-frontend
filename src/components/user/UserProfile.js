import React, {PropTypes} from 'react';

const UserProfile = (props) => {
    

    console.log("PROPS USPROF", props);
    let notificaciones = Array.apply(null, {length: 10}).map(Number.call, Number).map(e => {
                        let val = <li className="list-group-item no-show" key={"numero" + e}>{`notificacion ${e}`}</li>
                        return val;
                    })
    
    const handleSearchDelete = (index) => {

        props.actions.deleteUserSearches(index);

    }

    const handleResultsDelete = (index) => {
        props.actions.deleteUserResults(index);
    }


    return(
        <div className="perfil-container">

            <div className="list-group perfil-notificaciones">
                <span className="list-group-item">
                    Notificaciones
                    <span className="badge">
                      {notificaciones.length}
                    </span>
                </span>
                {notificaciones}
            </div>
      
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
                                
                                <button type="button" className="btn btn-primary pull-right" onClick={() => {alert(i)}}>Modificar búsqueda</button>
                                <button type="button" className="btn btn-primary pull-right">Ejecutar búsqueda</button>
                                <button type="button" className="btn btn-primary pull-right"onClick={ () => handleSearchDelete(i) } >Eliminar búsqueda</button>
                            </li>
                    }) : <li className="list-group-item saved-items" key={"search-empty"}>
                            <span className="saved-items-description">No hay búsquedas guardadas</span>
                            <button type="button" className="btn btn-primary pull-right" onClick={() => {alert("deberia ser un link!")}}>Buscar</button>
                         </li>
                }
            </div>

            <div className="perfil-resultados-guardados">
                <h2>Resultados guardados</h2>
                {
                    props.userResults && Object.keys(props.userResults).length > 0 ? Object.keys(props.userResults).map( (e, i) => {
                        return <li className="list-group-item saved-items" key={"results" + e}>
                                <span className="saved-items-description">{e}</span>
                                <button type="button" className="btn btn-primary pull-right">Mostrar resultado</button>
                                <button type="button" className="btn btn-primary pull-right" onClick={()=> {handleResultsDelete(i)}}>Eliminar resultado</button>
                               </li>
                    }) :  <li className="list-group-item saved-items" key={"results-empty"}>
                            <span className="saved-items-description">No hay resultados guardados</span>
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