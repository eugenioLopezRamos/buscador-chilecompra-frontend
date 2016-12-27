import React from 'react';
import {Link} from 'react-router'; //these will later be links to the query that searches a particular licitacion, which gives more detailed info about it (on the
// "codigo licitacion" tab)
//import {connect} from 'react-redux';

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

        returnNombreEstado = (codigoEstado) => {
            let swappedEstLic = {}

            Object.values(this.props.estadosLicitacion).map((e,i) => {
                swappedEstLic[e] = Object.keys(this.props.estadosLicitacion)[i];
            });

            return swappedEstLic[codigoEstado];

        }

        render = () => {
  
        if(!this.props.results){
            return null;
        }

        if(this.props.results.length === 0) {
            return <span className={this.animClass}>No se encontraron resultados</span>;            
        }

        else {
            let self = this;
            return (<ul className={this.animClass}>
                    <span className="cantidad-resultados">Se encontraron {this.props.results.length} resultados:</span>
                    <div className="title-container">
                        <span className="search fecha title col-xs-3">Fecha creación</span>
                        <span className="search nombre title col-xs-3">Nombre</span>
                        <span className="search codigo-externo title col-xs-3">Código Licitación (código externo)</span>
                        <span className="search codigo-estado title col-xs-3">Estado (código)</span>
                    </div>

                    {
                        
                    this.props.results.map((e, i) => {
                        return <li className="search-results" key={i}>

                                    <span className="search fecha col-xs-3" key={"fecha key" + e.FechaCreacion }>
                                        {e.FechaCreacion}
                                    </span>
                                    <span className="search nombre col-xs-3" key={"nombre key" + e["Listado"][0].Nombre } >
                                        { e["Listado"][0].Nombre}
                                    </span>

                                    <span className="search codigo-externo col-xs-3" key={"codigoExterno key " + e["Listado"][0].CodigoExterno } >
         
                                        
                                        { e["Listado"][0].CodigoExterno }
                                    </span>

                                    <span className="search codigo-estado col-xs-3" key={"codigoEstado key " + e["Listado"][0].CodigoEstado } >
                                        { `${self.returnNombreEstado(e["Listado"][0].CodigoEstado)} (${e["Listado"][0].CodigoEstado})`}
                                    </span>

                            </li>
                    })
                    }</ul>);
        }
    }                     
}


export default SearchResults; //connect(mapStateToProps)(SearchResults);