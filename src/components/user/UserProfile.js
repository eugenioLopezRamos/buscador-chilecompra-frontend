import React, {PropTypes} from 'react';

const UserProfile = (props) => {
 
    let notificaciones = Array.apply(null, {length: 10}).map(Number.call, Number).map(e => {
                        let val = <li className="list-group-item no-show" key={"numero" + e}>{`notificacion ${e}`}</li>
                        return val;
                    })

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
                    props.userSearches && Object.keys(props.userSearches).length > 0 ? props.userSearches.name.map(e => {

                    return <li className="list-group-item saved-items" key={"search" + e}>
                                <span className="saved-items-description">{e}</span>
                                
                                <button type="button" className="btn btn-primary pull-right">Modificar búsqueda</button>
                                <button type="button" className="btn btn-primary pull-right">Ejecutar búsqueda</button>
                                <button type="button" className="btn btn-primary pull-right">Eliminar búsqueda</button>
                            </li>
                    }) : null
                }
            </div>

            <div className="perfil-resultados-guardados">
                <h2>Resultados guardados</h2>
                {
                    props.userResults && Object.keys(props.userResults).length > 0 ? Object.keys(props.userResults).map(e => {
                        return <li className="list-group-item saved-items" key={"results" + e}>
                                <span className="saved-items-description">{e}</span>
                                <button type="button" className="btn btn-primary pull-right">Mostrar resultado</button>
                               </li>
                    }) : null
                }
            </div>
        </div>
    )

}

UserProfile.propTypes = {

    user: PropTypes.object.isRequired

}

export default UserProfile;