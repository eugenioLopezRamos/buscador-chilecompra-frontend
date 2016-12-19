import React from 'react';


const Flash = (props) => {
    
    const handleClick = () => {
        alert("clicked"); // THIS HAS TO BE CHANGED LATER, CURRENTLY JUST A TEST
        //maybe something like actions.clearFlash() ?
    }

    if((props.message.info.length + props.message.errors.length) > 0){

        let messages = Object.keys(props.message).map(e => {
            if(e.length > 0) { return props.message[e] }
            else {return null} 
        }).join("\n");

        return (
            <div className={`${props.type} message-wrap`} >
                <div className={`flash-close-${props.type}`} onClick={handleClick}>X</div>
                <div className="flash-message">{messages}</div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Flash;