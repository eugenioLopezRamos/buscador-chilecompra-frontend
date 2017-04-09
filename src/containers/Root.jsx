import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
//import DevTools from './DevTools'; // to be installed
import { Router } from 'react-router';
import {connect} from 'react-redux';
import routes from '../routes';


export class Root extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
        this.dispatch = props.store.dispatch;
        this.history = props.history;
    }

    componentDidMount = () => {
        if(localStorage.getItem("session") && localStorage.getItem("session").length > 1){
            this.dispatch(this.props.actions.validateToken());
        }
    }

    componentWillReceiveProps = (nextProps) => {

        if(!this.props.isAuthenticated || !this.props.userData) {

            if(nextProps.isAuthenticated && nextProps.userData) {
                // this.dispatch(this.props.actions.getUserNotifications());
                // this.dispatch(this.props.actions.getUserSubscriptions());
                // this.dispatch(this.props.actions.getUserSearches());  
                this.dispatch(this.props.actions.initialUserDataLoad());
                this.dispatch(this.props.actions.getOrganismosPublicos());
                this.dispatch(this.props.actions.getEstadosLicitacion());
            }
        }
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
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired

}

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.isAuthenticated,
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Root);


