import React, {PropTypes} from 'react';

const UserProfile = ({user}) => {

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
                    Array.apply(null, {length: 10}).map(Number.call, Number).map(e => {
                    let val = <li className="list-group-item saved-items" key={"search" + e}><span className="saved-items-description">{`busqueda ${e}`}</span><button type="button" className="btn btn-primary pull-right no-gutter">Ejecutar búsqueda</button></li>
                        return val;
                    })                    
                }

            </div>
            <div className="perfil-resultados-guardados">
                <h2>Resultados guardados</h2>
                {
                    Array.apply(null, {length: 10}).map(Number.call, Number).map(e => {
                    let val = <li key={"result" + e}>{`resultado ${e}`}</li>
                        return val;
                    })                    
                }            
            </div>
        </div>
    )

}

UserProfile.propTypes = {

    user: PropTypes.object.isRequired

}

export default UserProfile;

            // <span className="perfil-datos-title">Tus datos</span>
            // <div className="list-group">
            // {
            //     Object.keys(user).map( (e,i) => {
            //         return <li className="list-group-item" key={i+1}>{e} = {user[e]}</li>
            //     })
            // }
            // </div>