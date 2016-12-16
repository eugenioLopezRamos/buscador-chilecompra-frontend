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
import SearchTypesPicker from './searchTypes/SearchTypesPicker.jsx';

class InputFieldsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.getAppropiateInputFields = this.getAppropiateInputFields.bind(this);
    }

    getAppropiateInputFields = () => {
        switch(this.props.searchType){
            case "listado":
                return (
                        <div>
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
                        </div>
                        );

            case "proveedor":
                return (    <div>
                                <label>Según RUT proveedor</label>
                                <input
                                    className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                                    key="rut-proveedor" 
                                    placeholder="Ejemplo: 1.111.111-1"
                                    defaultValue={this.props.rutProveedor} 
                                    onChange={this.props.actions.RUTInput}/>
                            </div>
                )

            case "codigo":
                return (
                        <div>
                            <label>Código de licitación</label>
                            <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                                key="cod-licitacion" 
                                placeholder="Buscar por código de licitación"
                                defaultValue={this.props.codigoLicitacion} 
                                onChange={this.props.actions.codigoLicitacionInputChange}
                            />
                        </div>
                )
                
            default:
                return null;
                
        }




    }

    render = () => {

        return (    
                    
                    <div className="container inputfields jumbotron"> 
                        <SearchTypesPicker 
                            searchType={this.props.searchType}
                            onClick={this.props.displayActions.changeSearchType}
                        /> 
                        <label>Selecciona una fecha</label>
                        <DatePicker
                            startDate={this.props.date} 
                            setDate={this.props.actions.dateFieldSelect}
                        />
                        {this.getAppropiateInputFields()}
                        <label>Según palabras clave</label>
                            <SearchField onChange={this.props.actions.searchFieldInput} onSubmit={this.props.API.loadChilecompraData} />

                        <div className="col-xs-12 no-gutter">
                            <SearchResults results={this.props.searchResults} estadosLicitacion={this.props.estadosLicitacion}/>
                        </div>

                        <button type="button" className="btn btn-primary">Guardar parámetros de búsqueda (TBI)</button>

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
    selectedOrganismoPublico: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
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
        codigoLicitacion: state.inputFieldValues.codigoLicitacion
    };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    API: bindActionCreators(API, dispatch),
    displayActions: bindActionCreators(displayActions, dispatch)
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);


