import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CollapsibleNavBar from './CollapsibleNavBar.jsx';
import ToggleNavBarButton from './ToggleNavBarButton.jsx';
import * as displayActions from '../actions/DisplayActions';
import {bindActionCreators} from 'redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
  };

  render = () => {
    return (
          <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container">
              <div className="navbar-header">
                <ToggleNavBarButton onClick={this.props.displayActions.toggleNavbarDisplay}/>
                <a className="navbar-brand" href="#">Buscador Chilecompra</a>
                <CollapsibleNavBar showNavbar={this.props.showNavbar}/>
              </div>
            </div>
          </nav>
    );
  };
};
function mapStateToProps(state, ownProps) {
  return {
    showNavbar: state.showNavbar
  };
};

function mapDispatchToProps(dispatch) {
  return {
    displayActions: bindActionCreators(displayActions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);