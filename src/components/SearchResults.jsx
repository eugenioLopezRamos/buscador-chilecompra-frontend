import React from 'react';

class SearchResults extends React.Component {

    constructor(props, state) {
        
        super(props, state);
    }

    render = () => {

        let listado = "";
        let resultsArray;
        let extCodesArray = [];
        let codigoEstadoArray = [];
        console.log("THIS PROPS ITEMS", this.props.items);

        Object.keys(this.props.items).forEach( key => {
            if(this.props.items["Cantidad"] === 0) {
                resultsArray = [];
                return;
            }
            else if(key === "Listado") {
                resultsArray = [];
                this.props.items[key].map ( (e, i, arr) => {
                    let assignedKey = i + 1;
                    resultsArray.push( {key: assignedKey, Nombre: e.Nombre});
                    extCodesArray.push( {key: assignedKey, CodigoExterno: e.CodigoExterno } );
                    codigoEstadoArray.push({ key: assignedKey, CodigoEstado: e.CodigoEstado} );
                })
            }

        })

        if(resultsArray && resultsArray.length > 0) {
        return (<ul>
                <div className="title-container">
                    <span className="search nombre title">Nombre</span>
                    <span className="search codigo-externo title">Código Licitación (código externo)</span>
                    <span className="search codigo-estado title">Código Estado</span>
                </div> 
                {

                resultsArray.map( (e, i) => {
                    return <li className="search-results" key={e.key}>

                                <span className="search nombre" key={"nombre key" + e.key} >
                                    {e.Nombre}
                                </span>

                                <span className="search codigo-externo" key={"codigoExterno key " + extCodesArray[i].key} >
                                    {extCodesArray[i].CodigoExterno}
                                </span>

                                <span className="search codigo-estado" key={"codigoEstado key " + codigoEstadoArray[i].key} >
                                    {codigoEstadoArray[i].CodigoEstado}
                                </span>

                          </li>
                })
                }</ul>)
       }
       else if(resultsArray && resultsArray.length === 0){
           return <span>No se encontraron resultados</span>;
       }else if(!resultsArray) {
           return null;
       }
    }
}

export default SearchResults;
