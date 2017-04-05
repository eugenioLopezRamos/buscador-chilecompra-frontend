import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {sendRecoverAccount} from '../actions/authInfoResultsActions';
import {connect} from 'react-redux';
import Flash from './Flash';

export class AccountRecovery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
        }
    
    }

    handleInput = (event) => {

        this.setState({email: event.target.value});
    }

    handleClick = () => {
        this.props.sendRecoverAccount(this.state.email);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //used for testing
        return "default prevented";
    }

    
   render = () => {
       return (

           <div key="introduction-key" className="introduction container jumbotron">
           
                <div className="recovery-description">Ingresa tu email para poder reestablecer tu contraseña:</div>

                <div key="accountRecoveryform" className="signup-form col-xs-12 col-sm-10 col-sm-offset-1">
                    
                    <label className="signup-label">Email</label>
                    <input
                        value={this.state.value}
                        className="signup-input"
                        type="textarea"
                        placeholder="Nombre"
                        onChange={this.handleInput}
                    />
                    <button 
                        className="btn btn-primary col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-3"
                        onClick={this.handleClick}
                        onSubmit={this.handleSubmit}
                    >
                    Enviar información
                    </button>  

                    <Flash 
                        type="info" 
                        messages={this.props.messages}
                        messagesHandler={null}
                    />
                </div>
            </div>
        )
   }
};
AccountRecovery.propTypes = {
    messages: PropTypes.object
}


function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

function mapDispatchToProps(dispatch) {
  return {
    sendRecoverAccount: bindActionCreators(sendRecoverAccount, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountRecovery);