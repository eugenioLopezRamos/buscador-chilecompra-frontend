import React from 'react';

class SearchResults extends React.Component {

    constructor(props, state) {
        super(props, state);
        this.state = {
            resultsList: []
        }
    }


    render = () => {
        return (<ul>
        {
            this.state.resultsList.map((el, i) => {

                <li className={"search-results " + i}>{el}</li>  

            })

        }
                
        </ul>)

    }
}

export default SearchResults;