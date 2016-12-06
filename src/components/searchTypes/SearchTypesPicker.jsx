import React from 'react';


const searchTypesPicker = (props) => {

    const handleClick = (event) => {
        let value = "";
        switch(event.target.id){
            case "searchType-listado":
                value = "listado";
            break;
            case "searchType-proveedor":
                value = "proveedor";
            break;
            case "searchType-codigo":
                value = "codigo";
            break;

            default:
                value = "";
            break;
        }
        props.onClick(value);
    }


    return <div className="searchtypes-picker no-gutter col-xs-12">
                <span 
                    className={props.searchType === "listado" ? "glyphicon glyphicon glyphicon-th-list col-xs-4 searchtypes-picker-icon active"
                                : "glyphicon glyphicon glyphicon-th-list col-xs-4 searchtypes-picker-icon"
                                } 
                    aria-hidden="true"
                    id="searchType-listado"
                    onClick={handleClick}
                >
                    Listado
                </span>
                <span 
                    className={props.searchType === "proveedor" ? "glyphicon glyphicon-user col-xs-4 searchtypes-picker-icon active"
                                : "glyphicon glyphicon-user col-xs-4 searchtypes-picker-icon" } 
                    aria-hidden="true"
                    id="searchType-proveedor"
                    onClick={handleClick}
                >
                    Por proveedor
                </span>
                <span
                    className={props.searchType === "codigo" ? "glyphicon glyphicon glyphicon-hand-up col-xs-4 searchtypes-picker-icon active"
                                : "glyphicon glyphicon glyphicon-hand-up col-xs-4 searchtypes-picker-icon" } 
                    aria-hidden="true"
                    id="searchType-codigo"
                    onClick={handleClick}
                >
                    Por código licitación
                </span>
           </div>
}
export default searchTypesPicker;