import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
 
const App = ({ children }) => 

    <div>
        <Header />
            {children}
        <Footer />
    </div>
    
App.PropTypes = {
    children: PropTypes.object
}
 
export default App;