import React from 'react';
import {Link} from 'react-router';


const UserDropdown = (props) => {

    return (
        <div className="dropdown">
            <ul className={props.visible ? "dropdown-menu dropdown-menu-right dropdown-visible" : "dropdown-menu dropdown-menu-right"} aria-labelledby="dropdownMenu1">
                <li><Link to="/perfil">Página Principal</Link></li>
                <li><a href="#">Tu perfil</a></li>
                <li><Link to="/busqueda">Buscar</Link></li>
                <li role="separator" className="divider"></li>
                <li><Link to="/logout">Salir de la aplicación</Link></li>
            </ul>        
        </div>

    )

}

export default UserDropdown;