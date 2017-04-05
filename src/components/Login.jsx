import React from 'react'
import {Link} from 'react-router';

const Login = (props) => {


    const handleChangeEmail = (event) => {
        props.handleChangeEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        props.handleChangePassword(event.target.value)
    }
    const handleClickSubmit = (event) => {
        event.preventDefault();
        props.handleClickSubmit();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        return null;
    } 
    const recoverPasswordHandler = (event) => {

        
    }
    return (
            <form className="navbar-form navbar-right" role="form">
                <span className="login-span">Tienes cuenta? Ingresa:</span>
                <div className="form-group">
                    <input value={props.loginData.email} type="text"
                        placeholder="Email"
                        className="form-control"
                        onChange={handleChangeEmail} 
                        onClick={(event) => event.stopPropagation() }
                    />
                </div>
                <div className="form-group">
                    <input 
                        value={props.loginData.password}
                        type="password"
                        placeholder="Contraseña"
                        className="form-control"
                        onChange={handleChangePassword} 
                        onClick={(event) => event.stopPropagation() }                        
                        />
                </div>
                <button type="submit" 
                    className="btn btn-success login"
                    onSubmit={handleSubmit}
                    onClick={handleClickSubmit}
                    >Enviar</button>
                <Link
                    className="btn btn-primary login"
                    to="/recuperacion"
                >
                    Recuperar cuenta
                </Link>
            </form>
    );
};

export default Login;