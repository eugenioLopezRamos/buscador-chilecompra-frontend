import React from 'react';


const SearchStoredMenu = (props) => {

    <div className="prompt-buttons-container">
        <button type="button" className="btn btn-primary prompt-menu-button"onClick={ () => alert("hola!" + " " + props.index) } >Guardar cambios</button>
    </div>
}

export default SearchStoredMenu;