import React, {PropTypes} from 'react';
import {Link} from 'react-router'; //these will later be links to the query that searches a particular licitacion, which gives more detailed info about it (on the
// "codigo licitacion" tab)
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';
import {createUserResults as createResults} from '../actions/UserActions';
import {createUserSearches as createSearches} from '../actions/UserActions';
import ResultsSaver from './ResultsSaver';
import Flash from './Flash.jsx';

class SearchResults extends React.PureComponent {
    //TODO: Need to transform this into its own independent component, probably (with state, etc)
        constructor(props) {
            super(props);
            //Used to animate results loading - Otherwise only the first one gets an animation and the others don't 
            // (so, this toggles between two CSS classes with the same animations to achieve that)
            this.animClass = "";
            //Passes an optional handler function to the <Flash /> messages
            this.state = {messagesHandler: null};
        }

        componentWillReceiveProps(nextProps) {
            if(this.props.results != nextProps.results){
                this.animClass = this.animClass === "search-results-ul1" ? "search-results-ul2" : "search-results-ul1";
            }
        }
        //Normally this.props.estadosLicitacion is a number (the codigo_estado)
        returnNombreEstado = (codigoEstado) => {
            let swappedEstLic = {}

            Object.values(this.props.estadosLicitacion).map((e,i) => {
                swappedEstLic[e] = Object.keys(this.props.estadosLicitacion)[i];
            });

            return swappedEstLic[codigoEstado];
        }

        // countArray = (arr) => {
        //     return arr.length;
        // }

        // handleCreateResults = (name) => {
        //    // this.props.createResults(name)
        //     this.setState({messagesHandler: this.countArray}

        //     );
        // }

        // handleCreateSearches = (name) => {

        //     this.setState({messagesHandler: null},
        //     this.props.createSearches(name)
        //     );
        // }

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

                    <div className="cantidad-resultados">Se encontraron {this.props.results.length} resultados:</div>
                    <div className="title-container">
                        <span className="search fecha title col-xs-3">Fecha creación</span>
                        <span className="search nombre title col-xs-3">Nombre</span>
                        <span className="search codigo-externo title col-xs-3">Código Licitación (código externo)</span>
                        <span className="search codigo-estado title col-xs-3">Estado (código)</span>
                    </div>

                    {
                        
                    this.props.results.map((e, i) => {
                        e = JSON.parse(e);
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
     //now is given as an external prop so it can be more versatile   
    //    results: state.searchResults,
        estadosLicitacion: state.estadosLicitacion,
        messages: state.messages
    }

}

function mapDispatchToProps(dispatch) {
    return {
        createResults: bindActionCreators(createResults, dispatch),
        createSearches: bindActionCreators(createSearches, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);



                    // <Flash type="info" messages={this.props.messages} messagesHandler={this.state.messagesHandler}/>
                    // <ResultsSaver 
                    //     handleResults={this.handleCreateResults} 
                    //     handleSearches={this.handleCreateSearches} 
                    // />