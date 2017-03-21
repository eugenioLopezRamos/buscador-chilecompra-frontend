import React from 'react';


const ResultComparerPrimitive = ({keyName, value}) => {
   return (

    <span className="primitive" key={`${keyName}${value}${value + 100*Math.random()}`}>
        <span className="inPrimitive-key">{keyName}:</span>
        <span className="inPrimitive-value"> {value}</span>
    </span>
);
}


export default ResultComparerPrimitive;