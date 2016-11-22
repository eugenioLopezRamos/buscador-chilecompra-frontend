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
        searchResults: [],
        organismosPublicos: ""
    }


}

showSearchResults = (results) => {

    this.setState({searchResults: results})

}

componentDidMount = () => {

}

render = () => {

    return (
        <div> 
            <IntroductionComp  items={this.showSearchResults} organismosPublicos={this.state.organismosPublicos} estadosLicitacion={this.state.estadosLicitacion} />
            <SearchResults items={this.state.searchResults} estadosLicitacion={this.state.estadosLicitacion} />
        </div>
        )

    
}



}

Content.propTypes = {
    login: PropTypes.bool.isRequired
}

module.exports = Content;