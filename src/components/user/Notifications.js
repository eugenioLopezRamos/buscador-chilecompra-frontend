import React, {PropTypes} from 'react';
//TODO: Make a way to remove notifications (which will require a fetch call)
const Notifications = (props) => {

    let displayClass = (() => {
        if(props.show) {
            return "notifications";
        }
        return "notifications no-display";
    })();

    const notificationClickHandler = (event) => {
        event.stopPropagation();
    };
    const deleteNotification = (key) => {
        props.deleteNotification(key);
    };

 return  (<div className={displayClass} >
                    <ul className="notifications-list-items-container">
                    {   
                        Object.keys(props.notifications).length === 0 ?
                        <li className="list-group-item notifications" key="no-notifications">No hay notificaciones</li>
                        :
                        Object.keys(props.notifications).map(element => {
                            return (<li className="list-group-item notifications"
                                    key={"numero" + element}
                                    onClick={notificationClickHandler}
                                    >
                                        <span className="notification-text">
                                            {props.notifications[element]}
                                        </span>
                                        <span
                                            className="glyphicon glyphicon-remove"
                                            onClick={() => {deleteNotification(element);}}
                                        />
                                </li>);
                        })                    
                    }
                    </ul>
            </div>);

};

Notifications.propTypes = {
    deleteNotification: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,

};
export default Notifications;
   
   
   
   
   
