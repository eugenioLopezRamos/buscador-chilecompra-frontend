import React, {PropTypes} from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
import {render} from 'react-dom';
import LoginComponent from './LoginComponent.jsx';

class Main extends React.Component {

        render = () => {
            return (
            <div id="container">
                <Header appName={this.props.appName} />
                <div className="jumbotron">         
                    <div className="container">
                    <LoginComponent />
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
  //       <Content login={true} />       