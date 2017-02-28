import React from 'react'

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

    return (
            <form className="navbar-form navbar-right" role="form">
                <span className="login-span">Tienes cuenta? Ingresa:</span>
                <div className="form-group">
                    <input value={props.loginData.email} type="text" placeholder="Email" className="form-control" onChange={handleChangeEmail} />
                </div>
                <div className="form-group">
                    <input value={props.loginData.password} type="password" placeholder="Contraseña" className="form-control" onChange={handleChangePassword} />
                </div>
                <button type="submit" 
                    className="btn btn-success"
                    onSubmit={handleSubmit}
                    onClick={handleClickSubmit}
                    >Enviar</button>
            </form>
    );
};

export default Login;