import React from 'react';


const UpdateSearchMenu = (props) => {

    console.log("PROPS", props);

    return (
        <div className="prompt-buttons-container">
            <button type="button" className="btn btn-primary prompt-menu-button" 
                onClick={() => {
                    return props.handleSearches([props.defaultId, props.defaultName])
                }
                }>
                Guardar cambios
            </button>
        </div>
    )
}
export default UpdateSearchMenu;