import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import SearchBox from './SearchBox.jsx'

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

    return (<SearchBox submit={false}  />)

    
}



}

Content.propTypes = {
    login: PropTypes.bool.isRequired
}

module.exports = Content;