import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import * as types from '../actions/actionTypes';
 


const App = ({ children}, {store}) => {

    const hideNavbar = () => {
        store.dispatch({type: types.NAVBAR_OFF})
    }

   return( 
            <div style={{"background-color": "#eee", "min-height": "50vmax"} } onClick={hideNavbar}>
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