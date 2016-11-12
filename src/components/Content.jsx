import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import IntroductionComp from './IntroductionComp.jsx';
import SearchResults from './SearchResults.jsx';

class Content extends React.Component {

constructor(props, state) {
    super(props, state);

    this.state = {
        displayContent: "searchBox",
        login: state.login,
        searchValue: "",
        searchResults: []
    }


}

showSearchResults = (results) => {
    let resultValues = Object.keys(results).map( (el, index, arr) => {
        return el;
    });

    this.setState({searchResults: resultValues})

}

render = () => {

    return (
        <div> 
            <IntroductionComp  items={this.showSearchResults} />
            <SearchResults items={this.state.searchResults} />
        </div>
        )

    
}



}

Content.propTypes = {
    login: PropTypes.bool.isRequired
}

module.exports = Content;