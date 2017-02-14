import React, {PropTypes} from 'react';
import CollapsibleNavBar from './CollapsibleNavBar.jsx';
import {Link} from 'react-router';

const Header = (props) => {

  return(
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Buscador Chilecompra</Link>
            <CollapsibleNavBar />
          </div>
        </div>
      </nav>
  );

};


export default Header; 