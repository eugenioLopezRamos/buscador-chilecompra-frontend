import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
//import DevTools from './DevTools'; // to be installed
import { Router } from 'react-router';
import {connect} from 'react-redux';
import routes from '../routes';
import {onLoadFetchOrgPub} from '../actions/onLoadFetchOrgPub';
import {onLoadFetchEstLic} from '../actions/onLoadFetchEstLic';

import {getUserSubscriptions} from '../actions/UserActions';
import {getUserSearches} from '../actions/UserActions';
import {getUserNotifications} from '../actions/UserActions';
import {validateToken} from '../actions/authInfoResultsActions';

class Root extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
        this.dispatch = this.store.dispatch;
        this.history = props.history;

    }

    componentWillMount = () => {
        if(localStorage.getItem("session") && localStorage.getItem("session").length > 1){
            this.dispatch(validateToken());
        }
    }

    // componentDidMount = () => {

    //     //if(localStorage.getItem("session") && localStorage.getItem("session").length > 1){
    //     //    this.dispatch(validateToken());
    //     debugger


    //   //  }
    // }
    componentWillReceiveProps = (nextProps) => {

            if(!this.props.isAuthenticated || !this.props.userData) {

                if(nextProps.isAuthenticated && nextProps.userData) {
                    this.dispatch(getUserNotifications());
                    this.dispatch(getUserSubscriptions());
                    this.dispatch(getUserSearches());  
                }


            }
    }

    componentDidMount = () => {
        this.store.dispatch(onLoadFetchOrgPub());
        this.store.dispatch(onLoadFetchEstLic());
    }

    render = () => {
        return( <Provider store={this.store}>
                    <div>
                        <Router history={this.history} routes={routes}/>  
                   </div>
                </Provider>
                )
    }
}


Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired

}

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.isAuthenticated,
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Root);


