import React from 'react';
import {Link} from 'react-router';

const UserDropdown = (props) => {

    const handleLogout = () => {
        props.handleLogout();
    }

    return (
        <div className="dropdown">
            <ul className={props.visible ? "dropdown-menu dropdown-menu-right dropdown-visible" : "dropdown-menu dropdown-menu-right"} aria-labelledby="dropdownMenu1">
                <li><Link to="/inicio">Página Principal</Link></li>
                <li><Link to="/perfil">Modificar datos</Link></li>
                <li><Link to="/busqueda">Buscar</Link></li>
                <li role="separator" className="divider"></li>
                <li onClick={handleLogout}><Link to="/">Salir de la aplicación</Link></li>
            </ul>        
        </div>

    )

}

export default UserDropdown;