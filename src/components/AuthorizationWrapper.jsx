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
      //  debugger
        this.dispatch = store.dispatch;
        this.store = store;
        //TODO: I'm....not quite sure about the "recommendability" of this one...

        // Binds the actions passed in the "actions" prop from 'routes.js' to the dispatch
        // This is done so we can reuse a couple of components (especially InputFieldsContainer)
        // by using versions that behave slightly differently.
        // In the case of InputFieldsContainer the code is kept the same except the two redux-store connected
        // functions, where we want to have the following differences:
        
        // /busqueda -> InputFieldsContainer has a button to submit the form, which the one from UserProfile doesnt,
        // and /busqueda -> InputFieldsContainer saves a new search query when saving search query.

        // UserProfile -> InputFieldsContainer can't submit the form proper AND when saving the terms in the input boxes
        // (the state if you will), it will modify the already existing search query instead of creating a new one

        this.actions = (() => {
            if(props.actions) {
                return Object.keys(props.actions).reduce((boundActionsObject, currentKey) => {
                    boundActionsObject[currentKey] = bindActionCreators(props.actions[currentKey], this.dispatch)
                    return boundActionsObject;    
                }, {});
            }
        })()

        this.saveMenu = this.props.saveMenu ? this.props.saveMenu : null;
       // debugger
        this.defaultValues = this.props.componentDefaultValues ? this.props.componentDefaultValues : null;
        
        
         
        
        
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
          // debugger
            return <this.props.component {...this.actions}
                                         defaultValues={this.props.componentDefaultValues}
                                         saveMenu={this.saveMenu}
                    />
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