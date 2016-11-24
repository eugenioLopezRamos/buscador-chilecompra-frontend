import React, {PropTypes} from 'react';
import Header from '../components/Header.jsx';
import Content from '../components/Content.jsx';
import Footer from '../components/Footer.jsx';
import {render} from 'react-dom';
import LoginComponent from '../components/LoginComponent.jsx';

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

    // Main.propTypes = {
    //     appName: PropTypes.string.isRequired
    // }

export default Main;
  //                                <LoginComponent />