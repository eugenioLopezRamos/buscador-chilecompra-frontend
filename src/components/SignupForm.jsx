import React from 'react';
import Flash from './Flash.jsx';

const SignupForm = (props) => {
    //TODO: If password != password_confirmation, give a warning and dont send info to backend

    const handleChangeName = (event) => {
        props.inputActions.signupInputsName(event.target.value);
    }
    const handleChangeEmail = (event) => {
        props.inputActions.signupInputsEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        props.inputActions.signupInputsPassword(event.target.value);
    }
    const handleChangePasswordConf = (event) => {
        props.inputActions.signupInputsPasswordConf(event.target.value);
    }

    const handleClick = (event) => {
        props.resultsActions.sendSignupData(props.signupInfo);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //for testing
        return "handle submit";
    }



    return (
        //TODO: Add client side verifications for email, password len && password confirmation
        <div key="signupForm" className="signup-form col-xs-12 col-sm-10 col-sm-offset-1">
 

            <label className="signup-label">Nombre</label>
            <input value={props.signupInfo.name}
                   className="signup-input"
                   type="textarea"
                   placeholder="Nombre"
                   onChange={handleChangeName}/>

            <label className="signup-label">Mail</label>
            <input value={props.signupInfo.email}
                   className="signup-input"
                   type="email"
                   placeholder="Email"
                   onChange={handleChangeEmail} />

            <label className="signup-label">Contraseña - mínimo 8 caracteres</label>
            <input value={props.signupInfo.password}
                   className="signup-input"
                   type="password"
                   placeholder="********"
                   onChange={handleChangePassword}/>

            <label className="signup-label">Confirmar contraseña</label>
            <input value={props.signupInfo.password_confirmation}
                   className="signup-input"
                   type="password"
                   placeholder="********"
                   onChange={handleChangePasswordConf}/>
            
            <button 
                className="btn btn-primary btn-lg col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3"
                onClick={handleClick}
                onSubmit={handleSubmit}
                >Enviar información
            </button>

        </div>
    )
}

export default SignupForm;
         //TODO: Make this flash use the messages reducer
