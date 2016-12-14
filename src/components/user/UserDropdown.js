import React from 'react';



const UserDropdown = () => {

    return (
        <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Menú
                <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a href="#">Página principal</a></li>
                <li><a href="#">Tu perfil</a></li>
                <li><a href="#">Buscar</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Salir de la aplicación</a></li>
            </ul>        
        </div>

    )

}

export default UserDropdown;