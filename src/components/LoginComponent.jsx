import React from 'react'


class LoginComponent extends React.Component {
    constructor(props, state) {
        super(props, state)

        this.state = ({
            user: "",
            password:""
        })
    }


    handleChangeUser = (event) => {

        this.setState({user: event.target.value});

    }

    handleChangePassword = (event) => {

        this.setState({password: event.target.value});
    }

    handleClick = (event) => {
        event.preventDefault();
        console.log("submit!", this.state);

        // POST user, password etc etc

    }



    render = () => {

        console.log("STATE", this.state);

        return (<div className="container container col-lg-4 center col-lg-offset-4">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Por favor ingresa</h2>
                    <label className="sr-only" htmlFor="inputEmail">Dirección de email</label>
                    
                    <input id="email-login" className="form-control" placeholder="Dirección email" required={true} type="email" onChange={this.handleChangeUser}/>
                    
                    <label className="sr-only" htmlFor="inputPassword">Password</label>
                    <input id="password-login" className="form-control" placeholder="Contraseña" onChange={this.handleChangePassword} type="password" />
                    <div className="checkbox"></div>
                    <button className="btn btn-lg btn-primary bin-block" type="submit" onClick={this.handleClick} >Ingresar</button>

                </form>
                </div>)


    }





}

export default LoginComponent;