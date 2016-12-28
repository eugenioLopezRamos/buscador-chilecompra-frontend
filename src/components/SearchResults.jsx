import React, {PropTypes} from 'react';
import {Link} from 'react-router'; //these will later be links to the query that searches a particular licitacion, which gives more detailed info about it (on the
// "codigo licitacion" tab)
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';
import {createUserResults as createResults} from '../actions/UserActions';
import {createUserSearches as createSearches} from '../actions/UserActions';



class SearchResults extends React.PureComponent {
    //TODO: Need to transform this into its own independent component, probably (with state, etc)
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

        handleCreateResults = () => {
            this.props.createResults();
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
                    <div className="col-xs-12 no-gutter save-search-buttons">
                        <button type="button" className="btn btn-primary col-xs-6 col-md-4 col-md-offset-2" onClick={this.handleCreateResults}>Guardar parámetros de búsqueda (TBI)</button>
                        <button type="button" className="btn btn-primary col-xs-6 col-md-4 ">Guardar resultado de búsqueda (TBI)</button>
                    </div>
                    <div className="cantidad-resultados">Se encontraron {this.props.results.length} resultados:</div>
                    <div className="title-container">
                        <span className="search fecha title col-xs-3">Fecha creación</span>
                        <span className="search nombre title col-xs-3">Nombre</span>
                        <span className="search codigo-externo title col-xs-3">Código Licitación (código externo)</span>
                        <span className="search codigo-estado title col-xs-3">Estado (código)</span>
                    </div>

                    {
                        
                    this.props.results.map((e, i) => {
                        return <li className="search-results" key={i}>

                                    <span className="search fecha col-xs-3" key={"fecha key" + e.value.FechaCreacion }>
                                        {e.value.FechaCreacion}
                                    </span>
                                    <span className="search nombre col-xs-3" key={"nombre key" + e.value["Listado"][0].Nombre } >
                                        { e.value["Listado"][0].Nombre}
                                    </span>

                                    <span className="search codigo-externo col-xs-3" key={"codigoExterno key " + e.value["Listado"][0].CodigoExterno } >         
                                        { e.value["Listado"][0].CodigoExterno }
                                    </span>

                                    <span className="search codigo-estado col-xs-3" key={"codigoEstado key " + e.value["Listado"][0].CodigoEstado } >
                                        { `${self.returnNombreEstado(e.value["Listado"][0].CodigoEstado)} (${e.value["Listado"][0].CodigoEstado})`}
                                    </span>

                                </li>
                    })
                    }</ul>);
        }
    }                     
}

function mapStateToProps(state, ownProps) {
    return {
        results: state.searchResults,
        estadosLicitacion: state.estadosLicitacion
    }

}

function mapDispatchToProps(dispatch) {
    return {
        createResults: bindActionCreators(createResults, dispatch),
        createSearches: bindActionCreators(createSearches, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);