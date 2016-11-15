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
            {
        var self = this;
        fetch("/get_misc_info?info=organismos_publicos", {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
                console.log("RESP", response);
            
                self.setState({organismosPublicos: response});
               // self.setState({choices: response, value: self.state.choices[0]});
                })
            
        }
        {
        var self = this;
        fetch("/get_misc_info?info=estados_licitacion", {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
             //   console.log("RESP", response);
                self.setState({estadosLicitacion: response});
               // self.setState({choices: response, value: self.state.choices[0]});
                })
            
        }
}

render = () => {

    return (
        <div> 
            <IntroductionComp  items={this.showSearchResults} organismosPublicos={this.state.organismosPublicos} estadosLicitacion={this.state.estadosLicitacion} />
            <SearchResults items={this.state.searchResults} />
        </div>
        )

    
}



}

Content.propTypes = {
    login: PropTypes.bool.isRequired
}

module.exports = Content;