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
        console.log("props signupinfo", props.signupInfo);
        props.resultsActions.sendSignupData(props.signupInfo);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    let flashType = "";

    if(props.signupResult.result === "success") {
        flashType = "alert alert-success";
    }
    if(props.signupResult.result === "failure") {

        flashType = "alert alert-danger";
    }

    return (
        
        <div key="signupForm" className="signup-form col-xs-12 col-md-8">
 

            <label className="col-xs-12 col-md-8 text-center">Nombre</label>
            <input value={props.signupInfo.name} className="col-xs-12 col-md-8" type="textarea" placeholder="Nombre" onChange={handleChangeName}/>

            <label className="col-xs-12 col-md-8  text-center">Mail</label>
            <input value={props.signupInfo.email} className="col-xs-12 col-md-8" type="email" placeholder="Email" onChange={handleChangeEmail} />

            <label className="col-xs-12 col-md-8 text-center">Contraseña - mínimo 8 caracteres</label>
            <input value={props.signupInfo.password} className="col-xs-12 col-md-8" type="password" placeholder="********" onChange={handleChangePassword}/>

            <label className="col-xs-12 col-md-8 text-center">Confirmar contraseña</label>
            <input value={props.signupInfo.password_confirmation} className="col-xs-12 col-md-8 " type="password" placeholder="********" onChange={handleChangePasswordConf}/>
            
            <button 
                className="btn btn-primary btn-lg col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4"
                onClick={handleClick}
                onSubmit={handleSubmit}
                >Enviar información</button>
        </div>
    )
}

export default SignupForm;
         //TODO: Make this flash usse the messages reducer
         //  <Flash type={flashType} className="signup-flash" messages={props.signupResult.message}/>