import React, {PropTypes} from 'react';
import CollapsibleNavBar from './CollapsibleNavBar.jsx';

const Header = (props) => {

  return(
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Buscador Chilecompra</a>
            <CollapsibleNavBar />
          </div>
        </div>
      </nav>
  );

};


export default Header; 