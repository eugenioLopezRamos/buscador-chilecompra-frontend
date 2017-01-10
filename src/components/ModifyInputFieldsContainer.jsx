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

class ModifyInputFieldsContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {

            date: props.defaults.date,
            rutProveedor: props.default.rutProveedor,
            palabrasClave: props.defaults.palabrasClave,
            codigoLicitacion: props.defaults.codigoLicitacion,
            organismosPublicosFilter: props.defaults.organismosPublicosFilter,
            selectedEstadoLicitacion: props.defaults.selectedEstadoLicitacion,
            selectedOrganismoPublico: props.defaults.selectedOrganismoPublico

        }

        this.actions = {
            setDate: this.setState({date: actions.dateFieldSelect.value}), //sets date
            pickOrganismoPublico: this.setState({selectedOrganismoPublico: actions.pickOrganismoPublico.value}), //when <select>'ing the org publico
            autoFillerInputChange: this.setState({}), //when typing the name of the org publico in the input
            RUTInput: this.setState({rutProveedor: actions.RUTInput.value}), // typing the RUT...
            codigoLicitacionInputChange: this.setState({codigoLicitacion: actions.codigoLicitacionInputChange.value}) , //typing the codigoLicitacion
            searchFieldInput: this.setState({palabrasClave: actions.palabrasClave.value}), //typing the palabrasClave
            saveModifications: this.setState({}),//save modifications
        }

            // setDate={this.props.actions.dateFieldSelect}
            // onSelectionChange={this.props.actions.pickOrganismoPublico}
            // onInputChange={this.props.actions.autoFillerInputChange}
            // onChange={this.props.actions.RUTInput}
            // onChange={this.props.actions.codigoLicitacionInputChange}
            // onChange={this.props.actions.searchFieldInput} 
            // onSubmit={this.props.API.loadChilecompraData} 

    }
    render = () => {

        return (    
                
                    <div className="container inputfields jumbotron"  style={{"min-height": document.documentElement.clientHeight}}> 
 
                        <label>Selecciona una fecha (vacio=todas)</label>
                        <DatePicker
                            startDate={this.state.date} 
                            setDate={this.actions.setDate}
                        />

                        <label>Estado de la licitación (código estado)</label>
                            <SelectionField estadosLicitacion={this.props.estadosLicitacion} onChange={this.props.actions.selectionFieldSelect} />

                        <label>Según comprador (código organismo público)</label>
                            <AutoFillerInput 
                                organismosPublicos={this.props.organismosPublicos}
                                organismosPublicosFilter={this.props.organismosPublicosFilter}
                                organismosPublicosFilteredSubset={this.props.organismosPublicosFilteredSubset}
                                selectedOrganismoPublico={this.props.selectedOrganismoPublico} 

                                //modify these
                                onSelectionChange={this.props.actions.pickOrganismoPublico}
                                onInputChange={this.props.actions.autoFillerInputChange}
                            />

                        <label>Según RUT proveedor</label>
                        <input
                            className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                            key="rut-proveedor" 
                            placeholder="Ejemplo: 1.111.111-1"
                            defaultValue={this.state.rutProveedor} 
                            onChange={this.props.actions.RUTInput}
                        />
                    
                        <label>Código de licitación</label>
                        <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                            key="cod-licitacion" 
                            placeholder="Buscar por código de licitación"
                            defaultValue={this.state.codigoLicitacion}


                            onChange={this.props.actions.codigoLicitacionInputChange}
                        />
                        
                        
                        <label>Según palabras clave</label>
                            <SearchField 
                                value={this.state.palabrasClave} 
                                onChange={this.props.actions.searchFieldInput} 
                                onSubmit={this.props.API.loadChilecompraData} 
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
       // date: state.inputFieldValues.date,
       // searchType: state.searchType,
       // rutProveedor: state.inputFieldValues.rutProveedor,
       // palabrasClave: state.inputFieldValues.palabrasClave,
       // codigoLicitacion: state.inputFieldValues.codigoLicitacion,
        results: state.searchResults
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
