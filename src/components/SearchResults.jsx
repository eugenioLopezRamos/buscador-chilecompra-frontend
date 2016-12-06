import React from 'react';
import {Link} from 'react-router'; //these will later be links to the query that searches a particular licitacion, which gives more detailed info about it (on the
// "codigo licitacion" tab)

class SearchResults extends React.PureComponent {
        constructor(props) {
            super(props);
            this.animClass = "";
        }
        componentWillReceiveProps(nextProps) {
            if(this.props.results != nextProps.results){
                this.animClass = this.animClass === "search-results-ul1" ? "search-results-ul2" : "search-results-ul1";
            }
        }

        render = () => {
            let resultsArray; //letting this be undefined instead of Array.new is intended.
            let extCodesArray = [];
            let codigoEstadoArray = [];
            let estLicArray = Object.keys(this.props.estadosLicitacion); //<- array of estadosLicitacion keys so we can swap keys/values
            //returns a new object with the keys/values of store.estadosLicitacion swapped, so {"Publicada": "6"} becomes {"6": "Publicada"}
            let swappedEstadosLicitacion = estLicArray.reduce((accum, currVal) => {
                let newKey = this.props.estadosLicitacion[currVal];
                accum[newKey] = currVal;
                return accum;
            }, {})

            Object.keys(this.props.results).forEach(key => {
                if(this.props.results["Cantidad"] === 0) {
                    resultsArray = [];
                    return;
                }
                else if(key === "Listado") {
                    resultsArray = [];
                    this.props.results[key].map ( (e, i, arr) => {
                        let assignedKey = i + 1;
                        resultsArray.push( {key: assignedKey, Nombre: e.Nombre});
                        extCodesArray.push( {key: assignedKey, CodigoExterno: e.CodigoExterno } );

                        let valorEstado = `${swappedEstadosLicitacion[e.CodigoEstado]} (${e.CodigoEstado})`;
                        codigoEstadoArray.push({ key: assignedKey, CodigoEstado: valorEstado} );
                    })
                }
            })

            if(resultsArray && resultsArray.length > 0) {

            return (<ul className={this.animClass}>
                    <span className="cantidad-resultados">Se encontraron {this.props.results.Cantidad} resultados:</span>
                    <div className="title-container">
                        <span className="search nombre title col-xs-6">Nombre</span>
                        <span className="search codigo-externo title col-xs-3">Código Licitación (código externo)</span>
                        <span className="search codigo-estado title col-xs-3">Estado (código)</span>
                    </div>

                    {

                    resultsArray.map((e, i) => {
                        return <li className="search-results" key={e.key}>

                                    <span className="search nombre col-xs-6" key={"nombre key" + e.key} >
                                        {e.Nombre}
                                    </span>

                                    <span className="search codigo-externo col-xs-3" key={"codigoExterno key " + extCodesArray[i].key} >
                                        {extCodesArray[i].CodigoExterno}
                                    </span>

                                    <span className="search codigo-estado col-xs-3" key={"codigoEstado key " + codigoEstadoArray[i].key} >
                                        {codigoEstadoArray[i].CodigoEstado}
                                    </span>

                            </li>
                    })
                    }</ul>);
        }
        else if(resultsArray && resultsArray.length === 0){
            return <span className={this.animClass}>No se encontraron resultados</span>;
        }else if(!resultsArray) {
            return null;
        }
    }                     
}

export default SearchResults;