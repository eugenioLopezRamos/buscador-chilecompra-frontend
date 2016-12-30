import React from 'react';

const ResultsSaver = (props) => {

return (
    <div className="col-xs-12 no-gutter save-search-buttons">
        <button type="button" className="btn btn-primary col-xs-6 col-md-4 col-md-offset-2" onClick={props.handleSearches}>Guardar parámetros de búsqueda (TBI)</button>
        <button type="button" className="btn btn-primary col-xs-6 col-md-4 " onClick={props.handleResults}>Guardar resultado de búsqueda (TBI)</button>
    </div>
    )

}

export default ResultsSaver;