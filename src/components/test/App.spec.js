import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import * as types from '../../constants/actionTypes';
 


const App = ({children}, {store}) => {

    const hideNavbar = () => {
        let navbar = store.getState().display.showNavbar;
        let notifications = store.getState().display.showNotifications;

        if(navbar || notifications) {
            store.dispatch({type: types.HIDE_ALL});
        }
    }
   return( 
            <div style={{"backgroundColor": "#eee", "minHeight": "50vmax", "minWidth": "100%", "display": "inline-block"} } onClick={hideNavbar}>
                <Header />
                    {children}
                <Footer />
            </div>
   )
}
   


App.PropTypes = {
    children: PropTypes.object,
}

App.contextTypes = {
    store: React.PropTypes.object
}
 
 
export default App;