import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
//import DevTools from './DevTools'; // to be installed
import { Router } from 'react-router';
import routes from '../routes';
import {onLoadFetchOrgPub} from '../actions/onLoadFetchOrgPub';
import {onLoadFetchEstLic} from '../actions/onLoadFetchEstLic';
import {validateToken} from '../actions/authInfoResultsActions';


class Root extends Component {
    constructor(props) {
       super(props);
       this.store = props.store;
       this.history = props.history;
    }

    componentDidMount = () => {
        this.store.dispatch(onLoadFetchOrgPub());
        this.store.dispatch(onLoadFetchEstLic());
        if(localStorage.getItem("session") && localStorage.getItem("session").length > 1){
            this.store.dispatch(validateToken());
        }
    }

    render = () => {
        return( <Provider store={this.store}>
                    <div>
                        <Router history={this.history} routes={routes} />  
                   </div>
                </Provider>
                )
    }
}


Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired

}

export default Root;


