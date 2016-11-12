import React from 'react';
import {PropTypes} from 'react';
import Login from './Login.jsx';


class CollapsibleNavBar extends React.Component {

constructor(props, state) {
    super(props, state)

    this.state = {
        collapsed: props.showNavBar
    }
}

    render() {return  (<div id="navbar" className={this.props.showNavBar ? "navbar-collapse" : "navbar-collapse collapse"}>
                            < Login />
                        </div>) 
    }  

}
CollapsibleNavBar.propTypes = {
    showNavBar: PropTypes.bool.isRequired
};
module.exports = CollapsibleNavBar;
