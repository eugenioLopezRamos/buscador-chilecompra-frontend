import React from 'react';
import {Link} from 'react-router';
import Notifications from '../../user/Notifications';

const UserDropdown = (props) => {

    const handleLogout = () => {
        props.handleLogout();
    }
    const handleNotificationsClick = (event) => {
        event.stopPropagation();
        props.toggleNotifications();
    }
    
    const notificationStyle = (() => {
        if(props.showNotifications) {
            return "dropdown-menu-list-item active";
        }
        return "dropdown-menu-list-item";
    })();


    return (
        <div className="dropdown">

            <ul className={props.visible ? "dropdown-menu dropdown-menu-right dropdown-visible" : "dropdown-menu dropdown-menu-right"} aria-labelledby="dropdownMenu1">
                <li><Link to="/inicio">Página Principal</Link></li>
                <li className={notificationStyle} onClick={handleNotificationsClick}>
                    Notificaciones
                    <Notifications 
                           notifications={props.notifications}
                           show={props.showNotifications}
                           toggleNotifications={props.toggleNotifications}
                           deleteNotification={props.deleteNotification}
                    />
                </li>

                <li><Link to="/perfil">Modificar datos</Link></li>
                <li><Link to="/busqueda">Buscar</Link></li>
                <li role="separator" className="divider"></li>
                <li onClick={handleLogout}><Link to="/">Salir de la aplicación</Link></li>
            </ul>        
        </div>

    )

}

export default UserDropdown;