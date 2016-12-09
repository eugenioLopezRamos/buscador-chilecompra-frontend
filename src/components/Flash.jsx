import React from 'react';


const Flash = (props) => {
    
    const handleClick = () => {
        alert("clicked"); // THIS HAS TO BE CHANGED LATER, CURRENTLY JUST A TEST
        //maybe something like actions.clearFlash() ?
    }
    console.log("FLASHPROPS", props);
    if(props.message){
        return (
            <div className={`flash-type-${props.type}`} >
                <span className="close-flash">{props.message}</span><div className="close-flash" onClick={handleClick}>X</div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Flash;