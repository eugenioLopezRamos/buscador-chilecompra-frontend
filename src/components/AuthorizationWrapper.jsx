import React from 'react';
import {validateToken} from '../actions/authInfoResultsActions';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Flash from './Flash';
import {getUserSubscriptions} from '../actions/UserActions';
import {getUserSearches} from '../actions/UserActions';
import {getUserNotifications} from '../actions/UserActions';

class AuthorizationWrapper extends React.Component {
    constructor(props, {store}) {
        super(props);
        this.dispatch = store.dispatch;
        //TODO: I'm....not quite sure about the "recommendability" of this one...
        this.actions = (() => {

            return Object.keys(props.actions).reduce((boundActionsObject, currentKey) => {
                boundActionsObject[currentKey] = bindActionCreators(props.actions[currentKey], this.dispatch)
                return boundActionsObject;    
            }, {});

        })()
        
    }

    // componentWillMount = () => {

    //     if(this.props.isAuthenticated && this.props.user) {
    //             this.props.getUserNotifications();
    //             this.props.getUserSubscriptions();
    //             this.props.getUserSearches();         
    //     }

    // }


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
       // debugger
        if(this.props.isAuthenticated && this.props.user) {
           // this.getUserInfo();
            return <this.props.component {...this.actions}/>
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

AuthorizationWrapper.contextTypes = {
    store: React.PropTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);