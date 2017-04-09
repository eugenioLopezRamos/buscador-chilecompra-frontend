import React from 'react';
import * as utils from '../../utils/miscUtils';

const ResultComparerTitle = ({keyName, type, handler}) => {

    if(!keyName) {
        return null;
    }
    return (
      
        <span className={`object-container-name type-${type} open`} onClick={(event) => {handler(event)}}>
            <span className="glyphicon glyphicon-triangle-right"></span>
            <span className="glyphicon glyphicon-triangle-bottom"></span>
            {utils.pascalCaseToSentenceCase(keyName)}
        </span>
    )

}

export default ResultComparerTitle;