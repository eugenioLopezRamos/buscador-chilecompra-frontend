import React from 'react';
import * as utils from '../../utils/miscUtils';

const ResultComparerPrimitive = ({keyName, value}) => {
   return (

    <span className="primitive" key={`${utils.pascalCaseToSentenceCase(keyName)}${value}${value + 100*Math.random()}`}>
        <span className="inPrimitive-key">{utils.pascalCaseToSentenceCase(keyName)}:</span>
        <span className="inPrimitive-value"> {value}</span>
    </span>
);
}


export default ResultComparerPrimitive;