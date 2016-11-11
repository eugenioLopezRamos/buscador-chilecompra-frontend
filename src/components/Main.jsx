import React, {PropTypes} from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
import {render} from 'react-dom';

class Main extends React.Component {

        render = () => {
            return (
            <div id="container">
                <Header appName={this.props.appName} />
                <div className="jumbotron">         
                    <div className="container">
                    <Content login={true} />               
                    </div>                  
                </div>
                <Footer />
            </div>
                )
            }
}

    Main.propTypes = {
        appName: PropTypes.string.isRequired
    }

export default Main;