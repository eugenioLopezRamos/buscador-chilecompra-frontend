import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/InputFieldActions';
//import * as API from '../actions/fetchActions';
//import * as displayActions from '../actions/DisplayActions';
import {bindActionCreators} from 'redux';
//import SearchResults from './SearchResults.jsx';
import DatePicker from './inputs/DateField.jsx';
import SelectionField from './inputs/SelectionField.jsx';
import AutoFillerInput from './inputs/AutoFillerInput.jsx';
import SearchField from './inputs/SearchField.jsx';
import moment from 'moment';

class ModifyInputFieldsContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {

            date: props.defaults.date,
            rutProveedor: props.defaults.rutProveedor,
            palabrasClave: props.defaults.palabrasClave,
            codigoLicitacion: props.defaults.codigoLicitacion,
            organismosPublicosFilter: props.defaults.organismosPublicosFilter,
            selectedEstadoLicitacion: props.defaults.selectedEstadoLicitacion,
            selectedOrganismoPublico: props.defaults.selectedOrganismoPublico

        }
        //These actions are used directly as imported, as they do not need to be dispatched to the redux store (since they're independent from the rest of the app)
        // the only one that goes through redux is saveModifications, which will go through the whole redux process 
        this.actions = {
            setDate: (value) => {this.setState({date: actions.dateFieldSelect(value).value}, console.log("nuevo date", this.state.date)) }, //sets date
            pickOrganismoPublico: (event) => { this.setState({selectedOrganismoPublico: actions.pickOrganismoPublico(event).value}) }, //when <select>'ing the org publico
            autoFillerInputChange: (event) => { let result = actions.autoFillerInputChange(event.target.value);
                                                this.setState({
                                                  organismosPublicosFilter: result.value,
                                                  selectedOrganismoPublico: result.defaultSelectedValue,
                                                  organismosPublicosFilteredSubset: result.selectionResult
                                                })
                                        }, //when typing the name of the org publico in the input
            RUTInput: (event) => {this.setState({rutProveedor: actions.RUTInput(event).value})}, // typing the RUT...
            codigoLicitacionInputChange: (event) => {this.setState({codigoLicitacion: actions.selectionFieldSelect(event).value}) }, //typing the codigoLicitacion
            searchFieldInput: (event) => {this.setState({palabrasClave: actions.searchFieldInput(event).value})} //typing the palabrasClave
        //    saveModifications: () => {this.setState({})},//save modifications
        }

        this.getFilteredOrganismosPublicos = () => {
            let organismosPublicos = actions.autoFillerInputChange(props.organismosPublicos, this.state.organismosPublicosFilter);
            return organismosPublicos.selectionResults;
        }

        this.updateSearch = () => {
            console.log("hi", this.state);
            props.updateSearch(this.state, props.searchId, props.searchName);
        }

    }
    render = () => {

        return (    
                
                    <div className="container inputfields jumbotron"  style={{"minHeight": 0.5 * document.documentElement.clientHeight}}> 
 
                        <label>Selecciona una fecha (vacio=todas)</label>

                        <DatePicker
                            startDate={moment(this.state.date)} 
                            setDate={this.actions.setDate}
                        />
                        <label>Estado de la licitación (código estado)</label>
                            <SelectionField estadosLicitacion={this.props.estadosLicitacion} onChange={this.actions.selectionFieldSelect} />

                        <label>Según comprador (código organismo público)</label>
                            <AutoFillerInput 
                                organismosPublicos={this.props.organismosPublicos}
                                organismosPublicosFilter={this.props.organismosPublicosFilter}
                                organismosPublicosFilteredSubset={this.getFilteredOrganismosPublicos()}
                                selectedOrganismoPublico={this.state.selectedOrganismoPublico} 

                                onSelectionChange={this.actions.pickOrganismoPublico}
                                onInputChange={this.actions.autoFillerInputChange}
                            />

                        <label>Según RUT proveedor</label>
                        <input
                            className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                            key="rut-proveedor" 
                            placeholder="Ejemplo: 1.111.111-1"
                            defaultValue={this.state.rutProveedor} 
                            onChange={this.actions.RUTInput}
                        />
                    
                        <label>Código de licitación</label>
                        <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                            key="cod-licitacion" 
                            placeholder="Buscar por código de licitación"
                            defaultValue={this.state.codigoLicitacion}


                            onChange={this.actions.codigoLicitacionInputChange}
                        />
                        
                        
                        <label>Según palabras clave</label>
                            <SearchField 
                                value={this.state.palabrasClave} 
                                onChange={this.actions.searchFieldInput} 
                                onSubmit={this.actions.saveModifications} 
                            />

                        <div className="prompt-buttons-container">
                            <button type="button" className="btn btn-primary prompt-menu-button" onClick={this.updateSearch} >Guardar cambios</button>
                        </div>

                    </div>        
        );
   }
}

ModifyInputFieldsContainer.propTypes = {

   // searchResults: PropTypes.array,
    organismosPublicos: PropTypes.array.isRequired,
    estadosLicitacion: PropTypes.object.isRequired,
   // organismosPublicosFilter: PropTypes.string.isRequired,
   // organismosPublicosFilteredSubset: PropTypes.array.isRequired,
  //  selectedOrganismoPublico: PropTypes.string.isRequired,
  //  date: PropTypes.object.isRequired,
  //  searchType: PropTypes.string.isRequired,
  //  rutProveedor: PropTypes.string.isRequired,
  //  codigoLicitacion: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {

    return {
       // searchResults: state.searchResults,
        organismosPublicos: state.organismosPublicos,
        estadosLicitacion: state.estadosLicitacion,
    //    organismosPublicosFilter: state.inputFieldValues.organismosPublicosFilter,
    //    organismosPublicosFilteredSubset: state.inputFieldValues.organismosPublicosFilteredSubset,
    //    selectedOrganismoPublico: state.inputFieldValues.selectedOrganismoPublico,
       // date: state.inputFieldValues.date,
       // searchType: state.searchType,
       // rutProveedor: state.inputFieldValues.rutProveedor,
       // palabrasClave: state.inputFieldValues.palabrasClave,
       // codigoLicitacion: state.inputFieldValues.codigoLicitacion,
     //   results: state.searchResults
    };
};

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dispatch),
    // API: bindActionCreators(API, dispatch),
    // displayActions: bindActionCreators(displayActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyInputFieldsContainer);
