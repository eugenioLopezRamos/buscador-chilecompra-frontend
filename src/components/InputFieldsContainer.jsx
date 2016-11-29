import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import mockResults from '../mocks/mockResults';
import emptyMockResults from '../mocks/emptyMockResults';
import SearchResults from './SearchResults.jsx';


class InputFieldsContainer extends React.Component {

   render = () => {
    
    return (
                <div className="container inputfields jumbotron">

                    <label>Selecciona una fecha</label>

                    <label>Código de licitación</label>
                    <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" id="cod-licitacion" placeholder="Buscar código de licitación" />

                    <label>Estado de la licitación (código)</label>
                 
                    <label>Según comprador (código organismo público)</label>

                    <label>Según RUT proveedor</label>
                    <input id="rut-proveedor" />

                    <label>Según palabras clave</label>

                    <div className="col-md-8">
                      <SearchResults results={this.props.results}/>
                    </div>
                </div>        
    );
   }
}

InputFieldsContainer.propTypes = {
    //prop1: PropTypes.{TYPE}.isRequired
    results: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {

    return {
        results: state.results
        // ownprop1: state.prop1,
        // ownprop1: state.prop2
        //...
        // ownpropN: state.propN
    }
}




export default connect(mapStateToProps)(InputFieldsContainer);


