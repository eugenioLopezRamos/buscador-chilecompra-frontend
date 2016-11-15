import React from 'react';
import SearchField from './SearchField.jsx'
import SelectionField from './SelectionField.jsx'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import AutoFillerInput from './AutoFillerInput.jsx'


class IntroductionComp extends React.Component {
    constructor(state, props) {

        super(state, props);
        this.state = {

            logged: true,
            submit: false,
            setDate: "",
            listaOrganismosPublicos: "",
            codigoLicitacion: "",
            estadoLicitacion: "",
            organismoPublico: "",
            rutProveedor: "",
            palabrasClave: ""
            
        }
    }

    componentWillMount = () => {
    /*    var self = this;
        fetch("/get_misc_info" + "?info=" + this.props.choices, {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
                console.log("RESP", response);
                self.setState({choices: response, value: self.state.choices[0]});
                }) */



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

    handleChangeOrganismoPublico = (e) => {
        this.setState({organismoPublico: e.target.value})
    }
    handleChangeRUTProveedor = (e) => {
        this.setState({rutProveedor: e.target.value})
    }

    handleChangePalabrasClave = (value) => {
        this.setState({palabrasClave: value})
    }

    sendParameters= (parameters) => {
        // por lo tanto, este deberia llamarse al clickear el boton "BUSCAR" (lupa) y hacer fetch con todos los parametros dados
        // y al final del fetch, mandar this.props.items(resultados_desde_el_server) para q se muestren en <SearchResults />

       // this.props.items(licitaciones);
    }






    componentDidUpdate = () => {

       console.log("componentdidupdate", this.state);

     }

// In this case im gonna have a lot of <SelectionField /> with props that will be the fields that the chilecompra API allows you to query
// then all of these will be sent to the rails API server when clicking the searchButton on <SearchField />. The returned JSON from the Rails API
// will then be presented in <SearchResults />

    render = () => {
        const {value, suggestions} = this.state;
        const inputProps = { 
            placeHolder: 'Escribe un valor',
            value,
            onChange: this.onChange
        }
        
        return (
            <div className="container">
                <h2 className="text-center">¿Qué es buscador ChileCompra?</h2>
                <br />
                <div className="text-center">Buscador Chilecompra es una app que te permite informarte fácilmente de las licitaciones que te interesan.
                <br />
                Busca, guarda, y recibe notificaciones cuando aparecen nuevas licitaciones.</div>
                <br />
                <p className="text-center">¡Intenta hacer una búsqueda!</p>
                <div className="container inputfields">

                    <label>Selecciona una fecha</label>
                    <DatePicker dateFormat="DD/MM/YYYY" todayButton={"Hoy"} selectedDate={this.setDate} />

                    <label>Código de licitación</label>
                    <input id="cod-licitacion" placeholder="Buscar código de licitación" onChange={this.handleChangeCodigoLicitacion} />

                    <label>Estado de la licitación (código)</label>
                    <SelectionField id="estado-licitacion" choices="organismos_publicos" onChange={this.handleChangeEstadoLicitacion} /> 

                    <label>Según comprador (organismo público)</label>
                    <AutoFillerInput id="organismos_publicos" choices="organismos_publicos" onChange={this.handleChangeOrganismoPublico} />

                    <label>Según RUT proveedor</label>
                    <input id="rut-proveedor" onChange={this.handleChangeRUTProveedor}/>

                    <label>Según palabras clave</label>
                    <SearchField  onChange={this.handleChangePalabrasClave} toSearch={this.sendParameters} />
                </div>
                
            </div>
        )
        
    }

}

export default IntroductionComp;