import React, {PropTypes} from 'react';


const UpdateSearchMenu = (props) => {

    return (
        <div className="prompt-buttons-container">
            <button type="button" className="btn btn-primary prompt-menu-button" 
                onClick={() => {
                    return props.handleSearches([props.defaultId, props.defaultName]);
                }
                }>
                Guardar cambios
            </button>
        </div>
    );
};

UpdateSearchMenu.propTypes = {
    handleSearches: PropTypes.func.isRequired,
    defaultId: PropTypes.number.isRequired,
    defaultName: PropTypes.string.isRequired
};

export default UpdateSearchMenu;