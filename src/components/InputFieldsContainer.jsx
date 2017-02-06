import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {actions} from '../helpers/inputFieldsContainerHelper';
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
import moment from 'moment';


class InputFieldsContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        const inputFieldsOffset = 0;

        this.actions = actions;
        this.state = {
            organismosPublicosFilter: "",
            selectedOrganismoPublico: "",
            organismosPublicosFilteredSubset: this.props.organismosPublicos,
            codigoLicitacion: "",
            startDate: Object.freeze(moment()),
            alwaysFromToday: false,
            endDate: Object.freeze(moment()),
            alwaysToToday: false,
            palabrasClave: "",
            selectedEstadoLicitacion: "",
            rutProveedor: "",
            offset: inputFieldsOffset
             //Passes an optional handler to the <Flash />
           // messagesHandler: null
        };
    }

    handleCreateSearches = (name) => {
        this.props.createSearches(name);
    }

    disableButtons = () => {
        let disable = [];
        if(this.props.searchResults === null || this.props.searchResults === [] || this.props.searchResults === undefined) {
            disable.push("results");
        }

        return disable;
    }

    handleCreateSearches = (name) => {
        this.setState({messagesHandler: null}, this.props.createSearches(name));
    }

    setDateAlwaysFromToday = (value) => {
        this.props.actions.setDateAlwaysFromToday(value);
    }

    setDateAlwaysToToday = (value) => {
        this.props.actions.setDateAlwaysToToday(value);
    }

    setStartDate = (value) => {
        this.setState(this.actions.setStartDate(value));
    }
    setEndDate = (value) => {
        this.setState(this.actions.setEndDate(value));
    }

    toggleDateAlwaysFromToday = () => {
        this.setState(this.actions.toggleDateAlwaysFromToday(this.state.alwaysFromToday));
    }

    toggleDateAlwaysToToday = () => {
        this.setState(this.actions.toggleDateAlwaysToToday(this.state.alwaysToToday));
    }

    estadoLicitacionSelect = (event) => {

        this.setState(this.actions.estadoLicitacionSelect(event.target.value))

    }
    pickOrganismoPublico = (event) => {
        this.setState(this.actions.pickOrganismoPublico(event.target.value));
    }


    autoFillerInputChange = (organismos, value) => {
        //TODO: simplify this (duplication of data!)
        this.setState(this.actions.autoFillerInputChange(organismos, value));
    }
    
    rutInput = (event) => {
        this.setState(this.actions.rutInput(event.target.value));
    }

    codigoLicitacionInput = (event) => {
        this.setState(this.actions.codigoLicitacionInputChange(event.target.value));
    }

    palabrasClaveInput = (value) => {
        this.setState(this.actions.palabrasClaveInput(value));
    }

    render = () => {
        console.log("this STATE", this.state)
        return (    
              
                    <div className="container inputfields jumbotron"  style={{"minHeight": document.documentElement.clientHeight}}> 
                        <Flash 
                            type="info" 
                            messages={this.props.messages}
                            messagesHandler={this.state.messagesHandler}
                        />
                        <div className="fixed-size-searchTab-container">
                        <label>Selecciona un rango de fechas:</label>
                            <DatePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate} 

                                setStartDate={this.setStartDate}
                                setEndDate={this.setEndDate}

                                toggleDateAlwaysFromToday={this.toggleDateAlwaysFromToday}
                                toggleDateAlwaysToToday={this.toggleDateAlwaysToToday}

                                alwaysFromToday={this.state.alwaysFromToday}
                                alwaysToToday={this.state.alwaysToToday}
                            />

                            <label>Estado de la licitación (código estado)</label>
                                <SelectionField estadosLicitacion={this.props.estadosLicitacion} onChange={this.estadoLicitacionSelect} />

                            <label>Según comprador (código organismo público)</label>
                                <AutoFillerInput 
                                    organismosPublicos={this.props.organismosPublicos}
                                    organismosPublicosFilter={this.state.organismosPublicosFilter}
                                    organismosPublicosFilteredSubset={this.state.organismosPublicosFilteredSubset}
                                    selectedOrganismoPublico={this.state.selectedOrganismoPublico} 

                                    onSelectionChange={this.pickOrganismoPublico}
                                    onInputChange={this.autoFillerInputChange}
                                />

                            <label>Según RUT proveedor</label>
                            <input
                                className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                                key="rut-proveedor" 
                                placeholder="Ejemplo: 1.111.111-1"
                                defaultValue={this.state.rutProveedor} 

                                onChange={this.rutInput}/>
                        
                            <label>Código de licitación</label>
                            <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                                key="cod-licitacion" 
                                placeholder="Buscar por código de licitación"
                                defaultValue={this.state.codigoLicitacion}

                                onChange={this.codigoLicitacionInput}
                            />
                            
                            
                            <label>Según palabras clave</label>
                                <SearchField 
                                    value={this.state.palabrasClave} 

                                    onChange={this.palabrasClaveInput} 

                                    onSubmit={() => {this.props.API.loadChilecompraData(this.state)}} 
                                />

                                <SearchesSaver 
                                    handleSearches={this.handleCreateSearches}
                                    disableButtons={this.disableButtons()}
                                />
                        </div>

                            <div className="col-xs-12 no-gutter">
                                <SearchResults searchQueryValues={this.props.searchQueryValues} results={this.props.searchResults}/>
                            </div>
                        
                    </div>        
        );
   }
}

InputFieldsContainer.propTypes = {

    searchResults: PropTypes.object,
    organismosPublicos: PropTypes.array.isRequired,
    estadosLicitacion: PropTypes.object.isRequired,
//     organismosPublicosFilter: PropTypes.string.isRequired,
//     organismosPublicosFilteredSubset: PropTypes.array.isRequired,
//     selectedOrganismoPublico: PropTypes.string.isRequired,
//   //  date: PropTypes.object.isRequired,
//    // searchType: PropTypes.string.isRequired,
//     rutProveedor: PropTypes.string.isRequired,
//     codigoLicitacion: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {

    return {
        searchResults: state.searchResults,
        organismosPublicos: state.organismosPublicos,
        estadosLicitacion: state.estadosLicitacion,
        searchQueryValues: state.searchQueryValues,
    //     organismosPublicosFilter: state.searchQueryValues.organismosPublicosFilter,
    //     organismosPublicosFilteredSubset: state.searchQueryValues.organismosPublicosFilteredSubset,
    //     selectedOrganismoPublico: state.searchQueryValues.selectedOrganismoPublico,
    //     startDate: state.searchQueryValues.startDate,
    //     alwaysFromToday: state.searchQueryValues.alwaysFromToday,
    //     alwaysToToday: state.searchQueryValues.alwaysToToday,
    //     endDate: state.searchQueryValues.endDate,
    //    // searchType: state.searchType,
    //     rutProveedor: state.searchQueryValues.rutProveedor,
    //     palabrasClave: state.searchQueryValues.palabrasClave,
    //     codigoLicitacion: state.searchQueryValues.codigoLicitacion,
        //results: state.searchResults,
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
