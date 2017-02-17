import React from 'react';
import {PropTypes} from 'react';
import Login from './Login.jsx';
import {deleteUserNotification as deleteNotification} from '../actions/UserActions';
import * as displayActions from '../actions/DisplayActions';
import * as authInfoInputsActions from '../actions/authInfoInputsActions';
import * as authInfoResultsActions from '../actions/authInfoResultsActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as utils from '../utils/authUtils';
import UserDropdown from './user/UserDropdown';
/* DO NOTE THAT THIS GETS HIDDEN BY AN ACTION DISPATCHED ON <APP /> WHEN CLICKING, SINCE OTHERWISE IT WOULD BE VERY CUMBERSOME TO DO */

class CollapsibleNavBar extends React.Component {
    constructor(props) {
        super(props);

    }
    handleClick = (event) => {
        event.stopPropagation();
        this.props.displayActions.toggleNavbarDisplay();
    }

    handleLogin = () => {
        let data = {
                    email: this.props.loginData.email,
                    password: this.props.loginData.password
        }
        this.props.authInfoResultsActions.submitLoginInfo(data)

    }

    dropdown = () => {
        //sets a default button
        let button = <button type="button" className="btn navbar-toggle"  data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"
                      onClick={this.handleClick}>        
                            <i className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></i>
                            <span className="sr-only">Mostrar/esconder navegación</span>
                     </button>;
        //changes it to the correct button if the user is authenticated
        if(this.props.isAuthenticated){

               button =  <button 
                            className="btn btn-default dropdown-toggle user-menu" 
                            type="button"
                            id="dropdownMenu1"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                            onClick={this.handleClick}>
                            Menú
                            <span className="caret"></span>
                        </button>

        }
        //sets a default menu to allow logins
        let menu = <Login loginData={this.props.loginData} 
                        handleChangeEmail={this.props.authInfoInputsActions.loginInputEmail}
                        handleChangePassword={this.props.authInfoInputsActions.loginInputPassword}
                        handleClickSubmit={this.handleLogin} 
                    />
        //changes to the user menu if authenticated
  
        if(this.props.isAuthenticated) {

            menu = <UserDropdown 
                    visible={this.props.showNavbar}
                    handleLogout={this.props.authInfoResultsActions.sendLogoutInfo}
                    notifications={this.props.notifications}
                    showNotifications={this.props.showNotifications}
                    toggleNotifications={this.props.displayActions.toggleNotificationsDisplay}
                    deleteNotification={this.props.deleteNotification}
                   />

        }

        return {button, menu}


    }
    
    render = () => {
        let self = this;
        return  (
            <div className={this.props.isAuthenticated ? "dropdown-container logged-in" : "dropdown-container"}>
                {self.dropdown().button}
                <div className={self.props.showNavbar ? "navbar-collapse no-gutter" : "navbar-collapse collapse no-gutter"}>
                {self.dropdown().menu}
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
    showNavbar: state.display.showNavbar,
    loginData: state.loginData,
    isAuthenticated: state.isAuthenticated,
    notifications: state.userNotifications,
    showNotifications: state.display.showNotifications
  };
};


function mapDispatchToProps(dispatch) {
  return {
    displayActions: bindActionCreators(displayActions, dispatch),
    authInfoInputsActions: bindActionCreators(authInfoInputsActions, dispatch),
    authInfoResultsActions: bindActionCreators(authInfoResultsActions, dispatch),
    deleteNotification: bindActionCreators(deleteNotification, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleNavBar);
