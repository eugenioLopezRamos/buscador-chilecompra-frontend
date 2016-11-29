import React from 'react';

const SearchResults = ({results}) => {
    console.log("params", results);
    console.log("RESULTS", results);
    if(results){
    return(
        <ul>
            {    
                Object.keys(results).map( (e,i) => {
                   return <li key={i}>{e + " " + results[e] }</li>
                })
            }
        </ul>
    )
    }
    else{
        return null;
    }
}

export default SearchResults;