import React from 'react';
import {PropTypes} from 'react';
import Login from './Login.jsx';

const CollapsibleNavBar = (props) => {
  return  (
    <div id="navbar" className={props.showNavbar ? "navbar-collapse" : "navbar-collapse collapse"}>
        <Login />
    </div>
    ); 
};

CollapsibleNavBar.propTypes = {
    showNavbar: PropTypes.bool.isRequired
};
export default CollapsibleNavBar;
