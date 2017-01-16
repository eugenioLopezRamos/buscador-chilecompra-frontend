import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/InputFieldActions';
import * as API from '../actions/fetchActions';
import * as displayActions from '../actions/DisplayActions';
import {bindActionCreators} from 'redux';
import SearchResults from './SearchResults.jsx';
import DatePicker from './inputs/DateField.jsx';
import SelectionField from './inputs/SelectionField.jsx';
import AutoFillerInput from './inputs/AutoFillerInput.jsx';
import SearchField from './inputs/SearchField.jsx';
import {createUserSearches as createSearches} from '../actions/UserActions';
import SearchesSaver from './SearchesSaver';
import Flash from './Flash.jsx';


class InputFieldsContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        //Passes an optional handler to the <Flash />
        this.state = {messagesHandler: null};
    }

    handleCreateSearches = (name) => {
        this.props.createSearches(name);
    }

    disableButtons = () => {
        let disable = [];
        if(this.props.results === null || this.props.results === [] || this.props.results === undefined) {
            disable.push("results");
        }

        return disable;
    }

    countArray = (arr) => {
        return arr.length;
    }

    handleCreateResults = (name) => {
        alert(name)
     //   this.setState({messagesHandler: this.countArray}, this.props.createResults(name))
    }

    handleCreateSearches = (name) => {
        this.setState({messagesHandler: null}, this.props.createSearches(name));
    }

    
    render = () => {
        return (    
              
                    <div className="container inputfields jumbotron"  style={{"minHeight": document.documentElement.clientHeight}}> 
                        <Flash 
                            type="info" 
                            messages={this.props.messages}
                            messagesHandler={this.state.messagesHandler}
                        />

                        <label>Selecciona una fecha (vacio=todas)</label>
                        <DatePicker
                            startDate={this.props.date} 
                            setDate={this.props.actions.dateFieldSelect}
                        />

                        <label>Estado de la licitación (código estado)</label>
                            <SelectionField estadosLicitacion={this.props.estadosLicitacion} onChange={this.props.actions.selectionFieldSelect} />

                        <label>Según comprador (código organismo público)</label>
                            <AutoFillerInput 
                                organismosPublicos={this.props.organismosPublicos}
                                organismosPublicosFilter={this.props.organismosPublicosFilter}
                                organismosPublicosFilteredSubset={this.props.organismosPublicosFilteredSubset}
                                selectedOrganismoPublico={this.props.selectedOrganismoPublico} 
                                onSelectionChange={this.props.actions.pickOrganismoPublico}
                                onInputChange={this.props.actions.autoFillerInputChange}
                            />

                        <label>Según RUT proveedor</label>
                        <input
                            className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                            key="rut-proveedor" 
                            placeholder="Ejemplo: 1.111.111-1"
                            defaultValue={this.props.rutProveedor} 
                            onChange={this.props.actions.RUTInput}/>
                    
                        <label>Código de licitación</label>
                        <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                            key="cod-licitacion" 
                            placeholder="Buscar por código de licitación"
                            defaultValue={this.props.codigoLicitacion}
                            onChange={this.props.actions.codigoLicitacionInputChange}
                        />
                        
                        
                        <label>Según palabras clave</label>
                            <SearchField 
                                value={this.props.palabrasClave} 
                                onChange={this.props.actions.searchFieldInput} 
                                onSubmit={this.props.API.loadChilecompraData} 
                            />

                            <SearchesSaver 
                                handleResults={this.handleCreateResults} 
                                handleSearches={this.handleCreateSearches}
                                disableButtons={this.disableButtons()}
                            />

                            <div className="col-xs-12 no-gutter">
                                <SearchResults results={this.props.results}/>
                            </div>
                        
                    </div>        
        );
   }
}

InputFieldsContainer.propTypes = {

    searchResults: PropTypes.array,
    organismosPublicos: PropTypes.array.isRequired,
    estadosLicitacion: PropTypes.object.isRequired,
    organismosPublicosFilter: PropTypes.string.isRequired,
    organismosPublicosFilteredSubset: PropTypes.array.isRequired,
    selectedOrganismoPublico: PropTypes.string.isRequired,
  //  date: PropTypes.object.isRequired,
    searchType: PropTypes.string.isRequired,
    rutProveedor: PropTypes.string.isRequired,
    codigoLicitacion: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {

    return {
        searchResults: state.searchResults,
        organismosPublicos: state.organismosPublicos,
        estadosLicitacion: state.estadosLicitacion,
        organismosPublicosFilter: state.inputFieldValues.organismosPublicosFilter,
        organismosPublicosFilteredSubset: state.inputFieldValues.organismosPublicosFilteredSubset,
        selectedOrganismoPublico: state.inputFieldValues.selectedOrganismoPublico,
        date: state.inputFieldValues.date,
        searchType: state.searchType,
        rutProveedor: state.inputFieldValues.rutProveedor,
        palabrasClave: state.inputFieldValues.palabrasClave,
        codigoLicitacion: state.inputFieldValues.codigoLicitacion,
        results: state.searchResults,
        messages: state.messages
    };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    API: bindActionCreators(API, dispatch),
    displayActions: bindActionCreators(displayActions, dispatch),
    createSearches: bindActionCreators(createSearches, dispatch),
   // createResults: bindActionCreators(createResults, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);
