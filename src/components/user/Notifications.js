import React from 'react';
//TODO: Make a way to remove notifications (which will require a fetch call)
const Notifications = (props) => {

    let displayClass = (() => {
        if(props.show) {
            return "notifications";
        }
        return "notifications no-display"
    })()

    const notificationClickHandler = (event) => {
        event.stopPropagation();
    }
    const deleteNotification = (key) => {
        props.deleteNotification(key)
    }


    let notifications = () => {
        
        if(Object.keys(props.notifications).length === 0) {
            return <li className="list-group-item notifications" key="no-notifications">No hay notificaciones</li>
        }
        return Object.keys(props.notifications).map((element, index) => {
                                return <li className="list-group-item notifications"
                                        key={"numero" + element}
                                        onClick={notificationClickHandler}
                                        >
                                            {props.notifications[element]}
                                            <span
                                                className="glyphicon glyphicon-remove"
                                                onClick={() => {deleteNotification(element)}}
                                            >
                                            </span>
                                    </li>;
                            })

    }

 return  (<div className={displayClass} >
                    <ul className="notifications-list-items-container">
                    {   
                        
                        notifications()
                    }
                    </ul>
            </div>)

}

export default Notifications;
   
   
   
   
   
