import React from 'react';


const UpdateSearchMenu = (props) => {


    return (
        <div className="prompt-buttons-container">
            <button type="button" className="btn btn-primary prompt-menu-button" onClick={props.handleSearches}>
                Guardar cambios
            </button>
        </div>
    )
}
export default UpdateSearchMenu;