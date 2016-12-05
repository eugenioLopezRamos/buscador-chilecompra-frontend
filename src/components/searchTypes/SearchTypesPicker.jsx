import React from 'react';


const searchTypesPicker = () => {

    return <div className="searchtypes-picker no-gutter col-xs-12">
                <span className="glyphicon glyphicon glyphicon-th-list col-xs-4 searchtypes-picker-icon" aria-hidden="true">Listado</span>
                <span className="glyphicon glyphicon-user col-xs-4 searchtypes-picker-icon" aria-hidden="true">Por proveedor</span>
                <span className="glyphicon glyphicon glyphicon-hand-up col-xs-4 searchtypes-picker-icon" aria-hidden="true">Por código licitación</span>
           </div>

}


export default searchTypesPicker;