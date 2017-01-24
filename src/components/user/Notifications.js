import React from 'react';

const Notifications = (props) => {

let displayClass = (() => {
    if(props.show) {
        return "notifications";
    }
    return "notifications no-display"
})()

 return  (<div className={displayClass} >
                    <ul className="notifications-list-items-container">
                    {   
                        Object.keys(props.notifications).map(e => {
                            return <li className="list-group-item notifications" key={"numero" + e}>{props.notifications[e]}</li>;
                        })
                    }
                    </ul>
            </div>)

}

export default Notifications;
   
   
   
   
   
