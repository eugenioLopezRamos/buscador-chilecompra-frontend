import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import SignupForm from './SignupForm.jsx';
import {bindActionCreators} from 'redux';
import * as signupInputActions from '../actions/signupInputsActions';
import * as signupResultsActions from '../actions/signupResultsActions';
import {connect} from 'react-redux';

//import InputFieldsContainer from './InputFieldsContainer.jsx';

class Introduction extends React.Component {

    signup = () => {
        let signup = null
        if(!this.props.isAuthenticated) {
            signup = <div>
                        <p className="text-center">O regístrate</p>

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
                <p className="text-center">¡Intenta hacer una búsqueda!</p>

                <Link to='/busqueda'>
                    <p className="lead text-center">Buscar Licitaciones.</p>
                </Link>
                {this.signup()}


            </div>
        )
    }
}

// proptypes..

Introduction.propTypes = {
    signupName: PropTypes.string,
    signupEmail: PropTypes.string,
    signupPassword: PropTypes.string,
    signupPasswordConf: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    signupResults: PropTypes.object,
    signupInfo: PropTypes.object
}

function mapStateToProps(state, ownProps) {
    return {
        signupName: state.signup.info.name,
        signupEmail: state.signup.info.email,
        signupPassword: state.signup.info.password,
        signupPasswordConf: state.signup.info.password_confirmation,
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


// import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
 
// const App = ({ children }) =>
//     <div>
//         <h1>Filter table</h1>
//         { children }
//         <footer>
//             <Link to="/">Filterable Table</Link>
//             <Link to="/footer">About</Link>
//         </footer>
//     </div>;
 
// App.PropTypes = {
//     children: PropTypes.object
// }
 
// export default App;