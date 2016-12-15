import React, {PropTypes} from 'react';

const UserProfile = ({user}) => {

    return(
        <div>
            <h2>Tus datos</h2>
            <div className="perfil-datos">
            {
                Object.keys(user).map( (e,i) => {
                    return <h4 className="user-h2" key={i+1}>{e} = {user[e]}</h4>
                })
            }
            </div>
            <div className="perfil-notificaciones">
            
                <h2>Notificaciones</h2>
                {
                    Array.apply(null, {length: 10}).map(Number.call, Number).map(e => {
                        let val = <li key={"numero" + e}>{`notificacion ${e}`}</li>
                        return val;
                    })

                }
            </div>
            <div className="perfil-busquedas-guardadas">
                <h2>Búsquedas guardadas</h2>
                {
                    Array.apply(null, {length: 10}).map(Number.call, Number).map(e => {
                    let val = <li key={"search" + e}>{`busqueda ${e}`}</li>
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