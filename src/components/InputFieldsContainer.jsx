import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/InputFieldActions';
import {bindActionCreators} from 'redux';
import SearchResults from './SearchResults.jsx';
import DatePicker from './inputs/DateField.jsx';
import SelectionField from './inputs/SelectionField.jsx';
import AutoFillerInput from './inputs/AutoFillerInput.jsx';
import SearchField from './inputs/SearchField.jsx';

class InputFieldsContainer extends React.Component {
    constructor(state, props) {
        console.log("props", props);
        console.log("state", state);
        console.log("actions", actions);
        super(state,props);
    //    const test = this.props.test
    }

    onSearchFieldChange = (event) => {
        console.log("event", event.target.value);

    }

    render = () => {

        return (
                    <div className="container inputfields jumbotron">

                        <label>Selecciona una fecha</label>
                            <DatePicker />

                        <label>Código de licitación</label>
                            <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" id="cod-licitacion" placeholder="Buscar por código de licitación" />

                        <label>Estado de la licitación (código estado)</label>
                            <SelectionField estadosLicitacion={this.props.estadosLicitacion} onChange={this.props.actions.selectionFieldSelect} />

                        <label>Según comprador (código organismo público)</label>
                            <AutoFillerInput organismosPublicos={this.props.organismosPublicos} onChange={this.props.actions.pickOrganismoPublico}/>

                        <label>Según RUT proveedor</label>
                            <input id="rut-proveedor" placeholder="RUT del proveedor" onChange={this.props.actions.RUTInput}/>

                        <label>Según palabras clave</label>
                            <SearchField onChange={this.props.actions.searchFieldInput} />

                        <div className="col-xs-12">
                        <SearchResults results={this.props.test} />
                        </div>

                    </div>        
        );
   }
}

InputFieldsContainer.propTypes = {
    //prop1: PropTypes.{TYPE}.isRequired
    //results: PropTypes.object.isRequired,
    test: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
   // console.log("store", this.props.store)
    return {
      //  results: state.results,
        test: state.test,
        organismosPublicos: state.organismosPublicos,
        estadosLicitacion: state.estadosLicitacion
        // ownprop1: state.prop1,
        // ownprop1: state.prop2
        //...
        // ownpropN: state.propN
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(InputFieldsContainer);


