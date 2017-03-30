import React, { PropTypes } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import * as types from '../constants/actionTypes';
 


const App = ({children}, {store}) => {
    const hideNavbar = () => {
        let navbar = store.getState().display.showNavbar;
        let notifications = store.getState().display.showNotifications;

        if(navbar || notifications) {
            store.dispatch({type: types.HIDE_ALL});
        }
    };
   return( 
            <div key="app-main" style={{"backgroundColor": "#eee","minWidth": "100%", "display": "inline-block"}} 
                 id="app-component-root"
                 onClick={hideNavbar}>
                <Header />
                   {children}
                <Footer />
            </div>
   );
};
   
App.propTypes = {
    children: PropTypes.array
};

App.contextTypes = {
    store: PropTypes.object
};
 
 
export default App;