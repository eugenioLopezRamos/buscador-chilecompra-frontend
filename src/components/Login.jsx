import React from 'react'

const Login = (props) => {
    return (
            <form className="navbar-form navbar-right" role="form">
                <div className="form-group">
                <input type="text" placeholder="Email" className="form-control" />
                </div>
                <div className="form-group">
                <input type="password" placeholder="Contraseña" className="form-control" />
                </div>
                <button type="submit" className="btn btn-success">Ingresar</button>
            </form>
    );
};

export default Login;