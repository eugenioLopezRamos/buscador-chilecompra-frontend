import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {helpers} from '../helpers/inputFieldsContainerHelper';
//import * as displayActions from '../actions/DisplayActions';
import {bindActionCreators} from 'redux';
import SearchResults from './SearchResults.jsx';
import DatePicker from './inputs/DateField.jsx';
import SelectionField from './inputs/SelectionField.jsx';
import AutoFillerInput from './inputs/AutoFillerInput.jsx';
import SearchField from './inputs/SearchField.jsx';
import SearchesSaver from './SearchesSaver';
import Flash from './Flash.jsx';
import moment from 'moment';
import {RESULTS_INITIAL_CHECKBOXES_ORDER_BY} from '../constants/resultsInitialCheckboxes';


import {createUserSearches as createSearches} from '../actions/UserActions';
import * as API from '../actions/fetchActions';


class InputFieldsContainer extends React.PureComponent {
    constructor(props) {
 
        super(props);
               
        const inputFieldsOffset = 0;
        const initialFieldsOrderBy = RESULTS_INITIAL_CHECKBOXES_ORDER_BY;
        this.helpers = helpers;
        //TODO: Make this use constants


        // la otra opcion es usar un estado en que se trae todo desde el inicial y se añade el 
        // organismosPublicosFilteredSubset
        this.state = {
            // organismosPublicosFilter: "",
            // selectedOrganismoPublico: "",
            // 
            // codigoLicitacion: "",
            // startDate: Object.freeze(moment()),
            // alwaysFromToday: false,
            // endDate: Object.freeze(moment()),
            // alwaysToToday: false,
            // palabrasClave: "",
            // selectedEstadoLicitacion: "",
            // rutProveedor: "",
            // offset: inputFieldsOffset,
            // order_by: {fields: initialFieldsOrderBy, order: "descending"}
             //Passes an optional handler to the <Flash />
           // messagesHandler: null
           ...this.props.defaultValues.defaultState,
           organismosPublicosFilteredSubset: this.props.organismosPublicos,
        };
       //debugger
    }

    handleCreateSearches = (name) => {
        console.log("name", name)
        this.props.createSearches(this.state, name);
    }

    // handleCreateSearches = (name) => {
    //     this.setState({messagesHandler: null}, this.props.createSearches(name));
    // }

    setDateAlwaysFromToday = (value) => {
        this.props.actions.setDateAlwaysFromToday(value);
    }

    setDateAlwaysToToday = (value) => {
        this.props.actions.setDateAlwaysToToday(value);
    }

    setStartDate = (value) => {
        this.setState(this.helpers.setStartDate(value));
    }
    setEndDate = (value) => {
        this.setState(this.helpers.setEndDate(value));
    }

    toggleDateAlwaysFromToday = () => {
        this.setState(this.helpers.toggleDateAlwaysFromToday(this.state.alwaysFromToday));
    }

    toggleDateAlwaysToToday = () => {
        this.setState(this.helpers.toggleDateAlwaysToToday(this.state.alwaysToToday));
    }

    estadoLicitacionSelect = (event) => {

        this.setState(this.helpers.estadoLicitacionSelect(event.target.value))

    }
    pickOrganismoPublico = (event) => {
        this.setState(this.helpers.pickOrganismoPublico(event.target.value));
    }


    autoFillerInputChange = (organismos, value) => {
        //TODO: simplify this (duplication of data!)
        this.setState(this.helpers.autoFillerInputChange(organismos, value));
    }
    
    rutInput = (event) => {
        this.setState(this.helpers.rutInput(event.target.value));
    }

    codigoLicitacionInput = (event) => {
        this.setState(this.helpers.codigoLicitacionInputChange(event.target.value));
    }

    palabrasClaveInput = (value) => {
        this.setState(this.helpers.palabrasClaveInput(value));
    }

    render = () => {
  
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
                                startDate={moment(this.state.startDate)}
                                endDate={moment(this.state.endDate)} 

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
                                
                            {< this.props.saveMenu handleSearches={this.handleCreateSearches}/>}

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
}

function mapStateToProps(state, ownProps) {

    return {
        searchResults: state.searchResults,
        organismosPublicos: state.organismosPublicos,
        estadosLicitacion: state.estadosLicitacion,
        searchQueryValues: state.searchQueryValues,
        messages: state.messages
        
    };
};

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(actions, dispatch),
  // API: bindActionCreators(API, dispatch),
   // displayActions: bindActionCreators(displayActions, dispatch),
  //  createSearches: bindActionCreators(createSearches, dispatch),
   // createResults: bindActionCreators(createResults, dispatch),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);
export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);
