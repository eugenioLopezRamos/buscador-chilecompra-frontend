import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/InputFieldActions';
import * as API from '../actions/fetchActions';
import {bindActionCreators} from 'redux';
import SearchResults from './SearchResults.jsx';
import DatePicker from './inputs/DateField.jsx';
import SelectionField from './inputs/SelectionField.jsx';
import AutoFillerInput from './inputs/AutoFillerInput.jsx';
import SearchField from './inputs/SearchField.jsx';

class InputFieldsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
                    <div className="container inputfields jumbotron">

                        <label>Selecciona una fecha</label>
                            <DatePicker />

                        <label>Código de licitación</label>
                            <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                                id="cod-licitacion" 
                                placeholder="Buscar por código de licitación" 
                                onChange={this.props.actions.codigoLicitacionInputChange}
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
                            <input id="rut-proveedor" placeholder="RUT del proveedor" onChange={this.props.actions.RUTInput}/>

                        <label>Según palabras clave</label>
                            <SearchField onChange={this.props.actions.searchFieldInput} onSubmit={this.props.API.loadChilecompraData} />

                        <div className="col-xs-12">
                            <SearchResults results={this.props.searchResults} estadosLicitacion={this.props.estadosLicitacion}/>
                        </div>

                    </div>        
        );
   }
}

InputFieldsContainer.propTypes = {

    searchResults: PropTypes.object.isRequired,
    organismosPublicos: PropTypes.array.isRequired,
    estadosLicitacion: PropTypes.object.isRequired,
    organismosPublicosFilter: PropTypes.string.isRequired,
    organismosPublicosFilteredSubset: PropTypes.array.isRequired,
    selectedOrganismoPublico: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {

    return {
        searchResults: state.searchResults,
        organismosPublicos: state.organismosPublicos,
        estadosLicitacion: state.estadosLicitacion,
        organismosPublicosFilter: state.inputFieldValues.organismosPublicosFilter,
        organismosPublicosFilteredSubset: state.inputFieldValues.organismosPublicosFilteredSubset,
        selectedOrganismoPublico: state.inputFieldValues.selectedOrganismoPublico,
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    API: bindActionCreators(API, dispatch)
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);


