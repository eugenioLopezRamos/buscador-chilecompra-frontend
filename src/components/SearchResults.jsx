import React from 'react';

const SearchResults = ({results}) => {
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

export default SearchResults;