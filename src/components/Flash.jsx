import React from 'react';


const Flash = (props) => {
    
    const handleClick = () => {
        alert("clicked"); // THIS HAS TO BE CHANGED LATER, CURRENTLY JUST A TEST
        //maybe something like actions.clearFlash() ?
    }

    if(props.messages) {
        let info = Object.values(props.messages.info).join("\n");
        let errors = Object.values(props.messages.errors).join("\n");

        let infoMessages = null;
        let errorMessages = null;
        let messagesContainer = null;

        if(info.length > 0) {
            infoMessages = <div className="info message-wrap">
                                <div>Información:</div>
                                {info}
                           </div>
        }
        if(errors.length > 0) {
            let title = "Error";
            errors.length > 1 ? title = "Errores" : "";

            errorMessages = <div className="error message-wrap"><div>{title}:</div>{errors}</div>
        }

        if(info.length > 0 || errors.length > 0) {
            messagesContainer = <div className="message-wrap">
                                 {infoMessages} 
                                 {errorMessages}
                                </div>
        }
        
        return messagesContainer;

    }
    else {
        return null;
    }



}

export default Flash;