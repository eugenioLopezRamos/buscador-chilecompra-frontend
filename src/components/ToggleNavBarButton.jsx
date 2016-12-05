import React from 'react'

 
const ToggleNavBarButton = ({onClick}) => {

    const handleClick = () => {

        onClick();

    }
    return(
        <button type="button" className="btn navbar-toggle"  data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"
         onClick={handleClick}
        >        
            <i className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></i>
            <span className="sr-only">Mostrar/esconder navegación</span>
        </button>
    );
}

export default ToggleNavBarButton;
 
