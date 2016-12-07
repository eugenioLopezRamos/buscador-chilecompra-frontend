import React from 'react';
import Flash from './Flash.jsx';

const SignupForm = (props) => {
    //props will include signupState
    const successMessage = "Felicitaciones, te has registrado con éxito. Por favor visita tu correo para finalizar el registro";
    const failureMessage = `Lo sentimos, ha habido un error en el registro: ${props.error}`
    let flashMessage = null;
    let flashType = "";

    if(props.signupResult === "success") {
        flashMessage = successMessage;
        flashType = "success";
    }
    if(props.signupResult === "failure") {
        flashMessage = failureMessage;
        flashType = "failure";
    }
    
                return (

                    <div className="signup-form col-xs-12 col-md-8">
                        <Flash type={flashType} className="signup-flash" message={flashMessage}/>

                        <label className="col-xs-12 col-md-8 text-center">Nombre</label>
                        <input className="col-xs-12 col-md-8" type="textarea" placeholder="Nombre"/>

                        <label className="col-xs-12 col-md-8 text-center">Mail</label>
                        <input className="col-xs-12 col-md-8" type="email" placeholder="Email" />

                        <label className="col-xs-12 col-md-8 text-center">Contraseña - mínimo 8 caracteres</label>
                        <input className="col-xs-12 col-md-8" type="password" placeholder="******"/>

                        <label className="col-xs-12 col-md-8 text-center">Confirmar contraseña</label>
                        <input className="col-xs-12 col-md-8" type="password" placeholder="******"/>
                        
                        <button className="btn btn-primary btn-lg col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4">Enviar información</button>
                    </div>
                )
}

export default SignupForm;