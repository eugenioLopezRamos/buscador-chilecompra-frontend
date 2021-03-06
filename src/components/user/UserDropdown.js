import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Notifications from './Notifications';

const UserDropdown = (props) => {

    const handleLogout = () => {
        props.handleLogout();
    };
    const handleNotificationsClick = (event) => {
        event.stopPropagation();
        props.toggleNotifications();
    };
    
    const notificationStyle = (() => {
        if(props.showNotifications) {
            return "dropdown-menu-list-item active";
        }
        return "dropdown-menu-list-item";
    })();


    return (
        <div className="dropdown">

            <ul className={props.visible ? "dropdown-menu dropdown-menu-right dropdown-visible" : "dropdown-menu dropdown-menu-right"} aria-labelledby="dropdownMenu1">
                <li className="dropdown-menu-list-item"><Link to="/inicio">Página Principal</Link></li>
                <li className={notificationStyle} onClick={handleNotificationsClick}>
                    <div className="notification-list-item-text">
                        Notificaciones
                    </div>
                    <Notifications 
                           notifications={props.notifications}
                           show={props.showNotifications}
                           toggleNotifications={props.toggleNotifications}
                           deleteNotification={props.deleteNotification}
                    />
                </li>

                <li className="dropdown-menu-list-item"><Link to="/modificar_perfil">Modificar datos</Link></li>
                <li className="dropdown-menu-list-item"><Link to="/busqueda">Buscar</Link></li>
                <li role="separator" className="divider" />
                <li className="dropdown-menu-list-item" onClick={handleLogout}><Link to="/">Salir</Link></li>
            </ul>        
        </div>

    );

};

UserDropdown.propTypes = {
    showNotifications: PropTypes.bool,
    visible: PropTypes.bool,
    notifications: PropTypes.object,
    toggleNotifications: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired
};

export default UserDropdown;