import React from 'react';

const Notifications = (props) => {

let displayClass = (() => {
    if(props.show) {
        return "notifications";
    }
    return "notifications no-display"
})()

let notifications = () => {
    
    if(Object.keys(props.notifications).length === 0) {
        return <li className="list-group-item notifications" key="no-notifications">No hay notificaciones</li>
    }
    return Object.keys(props.notifications).map(e => {
                            return <li className="list-group-item notifications" key={"numero" + e}>{props.notifications[e]}</li>;
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
   
   
   
   
   
