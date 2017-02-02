import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
//import DevTools from './DevTools'; // to be installed
import { Router } from 'react-router';
import routes from '../routes';
import {onLoadFetchOrgPub} from '../actions/onLoadFetchOrgPub';
import {onLoadFetchEstLic} from '../actions/onLoadFetchEstLic';
import {validateToken} from '../actions/authInfoResultsActions';
import {getUserSubscriptions} from '../actions/UserActions';
import {getUserSearches} from '../actions/UserActions';
import {getUserNotifications} from '../actions/UserActions';


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
            //TODO: wrap this in a promise, maybe will need to refactor validateToken()
            this.store.dispatch(validateToken());
            this.store.dispatch(getUserNotifications());
            this.store.dispatch(getUserSubscriptions());
            this.store.dispatch(getUserSearches());  
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

// var p1 = new Promise(
//         // The resolver function is called with the ability to resolve or
//         // reject the promise
//         function(resolve, reject) {
//             log.insertAdjacentHTML('beforeend', thisPromiseCount +
//                 ') Promise started (<small>Async code started</small>)<br/>');
//             // This is only an example to create asynchronism
//             window.setTimeout(
//                 function() {
//                     // We fulfill the promise !
//                     resolve(thisPromiseCount);
//                 }, Math.random() * 2000 + 1000);
//         }
//     );



