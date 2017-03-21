import React from 'react';


const ResultComparerTitle = ({keyName, type, handler}) => {

    if(!keyName) {
        return null;
    }
    return (
      
        <span className={`object-container-name type-${type} open`} onClick={(event) => {console.log("CLICK");handler(event)}}>
            <span className="glyphicon glyphicon-triangle-right"></span>
            <span className="glyphicon glyphicon-triangle-bottom"></span>
            {keyName}
        </span>
    )

}

export default ResultComparerTitle;