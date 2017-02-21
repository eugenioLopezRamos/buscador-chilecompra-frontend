import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import SignupForm from './SignupForm.jsx';
import {bindActionCreators} from 'redux';
import * as signupInputActions from '../actions/signupInputsActions';
import * as signupResultsActions from '../actions/signupResultsActions';
import {connect} from 'react-redux';


//TODO: Should should a Flash when successfully signed up!


class Introduction extends React.Component {
    //TODO: make this a separate file!
    signup = () => {
        let signup = null
        if(!this.props.isAuthenticated) {
            signup = <div>
                        <p className="text-center">Regístrate</p>

                        <SignupForm 
                            inputActions={this.props.signupInputActions} 
                            signupResult={this.props.signupResult}
                            signupInfo={this.props.signupInfo}
                            resultsActions={this.props.signupResultsActions}

                        />
                    </div>
        }
        return signup;
    }
    
    render = () => {

        return (
            <div className="container jumbotron" style={{height: document.documentElement.clientHeight}}>
                <h2 className="text-center">¿Qué es buscador ChileCompra?</h2>
                <br />
                <div className="text-center">Buscador Chilecompra es una app que te permite informarte fácilmente de las licitaciones que te interesan.
                <br />
                Busca, guarda, y recibe notificaciones cuando aparecen nuevas licitaciones.</div>
                <br />
                {this.signup()}


            </div>
        )
    }
}

// proptypes..

Introduction.propTypes = {
    isAuthenticated: PropTypes.bool,
    signupResults: PropTypes.object,
    signupInfo: PropTypes.object
}

function mapStateToProps(state, ownProps) {
    return {
        signupResult: state.signup.result,
        signupInfo: state.signup.info,
        isAuthenticated: state.isAuthenticated
    }
} 
function mapDispatchToProps(dispatch) {

    return {
        signupInputActions: bindActionCreators(signupInputActions, dispatch),
        signupResultsActions: bindActionCreators(signupResultsActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);