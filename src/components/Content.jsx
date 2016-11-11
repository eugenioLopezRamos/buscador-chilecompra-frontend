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
        searchValue: ""
    }


}


render = () => {

    return (
        <div> 
            <IntroductionComp  />
            <SearchResults />
        </div>
        )

    
}



}

Content.propTypes = {
    login: PropTypes.bool.isRequired
}

module.exports = Content;