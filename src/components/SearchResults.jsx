import React from 'react';

class SearchResults extends React.Component {

    constructor(props, state) {
        
        super(props, state);
    }


    render = () => {
        return (<ul>
        {   
            this.props.items.map((el, i) => {
               let number = i + 1 
               return <li key={number} className={"search-results"}>{el}</li>  

            })

        } 
                
        </ul>)

    }
}

export default SearchResults;