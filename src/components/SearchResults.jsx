import React from 'react';

class SearchResults extends React.Component {

    constructor(props, state) {
        
        super(props, state);
    }


    render = () => {
        return (<ul>
        {   
            this.props.items.map((el, i) => {
            
               return <li className={"search-results " + i}>{el}</li>  

            })

        } 
                
        </ul>)

    }
}

export default SearchResults;