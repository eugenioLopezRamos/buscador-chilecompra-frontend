import React from 'react';


const Flash = (props) => {
    
    const handleClick = () => {
        alert("clicked"); // THIS HAS TO BE CHANGED LATER, CURRENTLY JUST A TEST
        //maybe something like actions.clearFlash() ?
    }

    if(props.message){
        return (
            <div className={`${props.type} message-wrap`} >
                <div className={`flash-close-${props.type}`} onClick={handleClick}>X</div>
                <div className="flash-message">{props.message}</div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Flash;