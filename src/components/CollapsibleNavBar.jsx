import React from 'react';
import {PropTypes} from 'react';
import Login from './Login.jsx';

import * as displayActions from '../actions/DisplayActions';
import * as authInfoInputsActions from '../actions/authInfoInputsActions';
import * as authInfoResultsActions from '../actions/authInfoResultsActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as utils from '../utils/authUtils';
import UserDropdown from './user/UserDropdown';

class CollapsibleNavBar extends React.Component {
    constructor(props) {
        super(props);
    
    }

    handleClick = () => {
        this.props.displayActions.toggleNavbarDisplay();
    }

    render = () => {
        let self = this;
        return  (
            <div>
                <button type="button" className="btn navbar-toggle"  data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"
                    onClick={self.handleClick}
                >        
                        <i className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></i>
                        <span className="sr-only">Mostrar/esconder navegación</span>
                </button>

                <div className={self.props.showNavbar ? "navbar-collapse" : "navbar-collapse collapse"}>
                    
                   { this.props.isAuthenticated ? <UserDropdown />: <Login loginData={self.props.loginData} 
                                                                        handleChangeEmail={self.props.authInfoInputsActions.loginInputEmail}
                                                                        handleChangePassword={self.props.authInfoInputsActions.loginInputPassword}
                                                                        handleClickSubmit={self.props.authInfoResultsActions.submitLoginInfo} 
                                                                    />}
                </div>
            </div>
            ); 
    }
};

CollapsibleNavBar.propTypes = {
    showNavbar: PropTypes.bool.isRequired,
    loginData: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    showNavbar: state.showNavbar,
    loginData: state.loginData,
    isAuthenticated: state.isAuthenticated
  };
};


function mapDispatchToProps(dispatch) {
  return {
    displayActions: bindActionCreators(displayActions, dispatch),
    authInfoInputsActions: bindActionCreators(authInfoInputsActions, dispatch),
    authInfoResultsActions: bindActionCreators(authInfoResultsActions, dispatch)

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleNavBar);
