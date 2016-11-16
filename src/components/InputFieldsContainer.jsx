
import React from 'react';
import SearchField from './SearchField.jsx'
import SelectionField from './SelectionField.jsx'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import AutoFillerInput from './AutoFillerInput.jsx'

class InputFieldsContainer extends React.Component {
    constructor(state, props) {
        super(state, props);




        this.state = {
            selectedDate: "",
            codigoLicitacion: "",
            estadoLicitacion: "",
            organismoPublico: "",
            rutProveedor: "",
            palabrasClave: ""

        }



    }

    setDate = (value) => {
        this.setState({selectedDate: value})
    }

    handleChangeCodigoLicitacion = (e) => {
        this.setState({codigoLicitacion: e.target.value});
    }

    handleChangeEstadoLicitacion = (value) => {
        this.setState({estadoLicitacion: value})
    }

    handleChangeOrganismoPublico = (org) => {
        console.log("ORG PUBLICO VAL", org);
        this.setState({organismoPublico: org})
    }
    handleChangeRUTProveedor = (e) => {
        this.setState({rutProveedor: e.target.value})
    }

    handleChangePalabrasClave = (value) => {
        this.setState({palabrasClave: value})
    }

    sendParameters= (parameters) => {
        // por lo tanto, este deberia llamarse al clickear el boton "BUSCAR" (lupa) y hacer fetch con todos los parametros dados
        // (que vendrian a ser todas o la mayoria de las keys del state)
        // y al final del fetch, mandar this.props.items(resultados_desde_el_server) para q se muestren en <SearchResults />

       // this.props.items(licitaciones);
    }


    render = () => {
       // console.log("ORG PUBLICO", this.state.organismoPublico);
        return(
                <div className="container inputfields">

                    <label>Selecciona una fecha</label>
                    <DatePicker dateFormat="DD/MM/YYYY" todayButton={"Hoy"} selectedDate={this.setDate} />

                    <label>Código de licitación</label>
                    <input id="cod-licitacion" placeholder="Buscar código de licitación" onChange={this.handleChangeCodigoLicitacion} />

                    <label>Estado de la licitación (código)</label>
                    <SelectionField id="estado-licitacion" choices="estados_licitacion" estadosLicitacion={this.props.estadosLicitacion} onChange={this.handleChangeEstadoLicitacion} /> 

                    <label>Según comprador (organismo público)</label>
                    <AutoFillerInput 

                        id="organismos_publicos" 
                        choices="organismos_publicos" 
                        organismosPublicos={this.props.organismosPublicos}
                        onChange={this.handleChangeOrganismoPublico}
                        
                     />

                    <label>Según RUT proveedor</label>
                    <input id="rut-proveedor" onChange={this.handleChangeRUTProveedor}/>

                    <label>Según palabras clave</label>
                    <SearchField  onChange={this.handleChangePalabrasClave} onSubmit={this.sendParameters} />

                </div>
                    )
    }


}

export default InputFieldsContainer;