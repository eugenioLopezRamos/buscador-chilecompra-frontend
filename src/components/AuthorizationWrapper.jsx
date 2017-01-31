import React from 'react';
import {validateToken} from '../actions/authInfoResultsActions';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Flash from './Flash';
import {getUserSubscriptions} from '../actions/UserActions';
import {getUserSearches} from '../actions/UserActions';
import {getUserNotifications} from '../actions/UserActions';

class AuthorizationWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = (nextProps) => {
        //fetch user's data from the server when logged in
        if(!this.props.isAuthenticated || !this.props.user) {
            if(nextProps.isAuthenticated && nextProps.user) {
                this.props.getUserNotifications();
                this.props.getUserSubscriptions();
                this.props.getUserSearches();
            }
        }
        
    }

    render = () => {
        if(this.props.isAuthenticated && this.props.user) {
           // this.getUserInfo();
            return <this.props.component/>
        }
        return <this.props.renderFailure />
    }
}

function mapStateToProps(state, ownProps) {
    return {
            user: state.userData,
            isAuthenticated: state.isAuthenticated,
            messages: state.messages
        }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        validateToken: bindActionCreators(validateToken, dispatch),
        getUserSubscriptions: bindActionCreators(getUserSubscriptions, dispatch),
        getUserSearches: bindActionCreators(getUserSearches, dispatch),
        getUserNotifications: bindActionCreators(getUserNotifications, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);