import React from 'react';
import SearchField from './SearchField.jsx'
import SelectionField from './SelectionField.jsx'
import AutoFillerInput from './AutoFillerInput.jsx'
import DateField from './DateField.jsx'

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

    handleChangeDate = (value) => {
        console.log("DATE", value);
        let newValue = value;
        if(value === "Invalid date"){
            newValue = "";
        }
        
        this.setState({selectedDate: newValue})
    }

    handleChangeCodigoLicitacion = (e) => {
        this.setState({codigoLicitacion: e.target.value});
    }

    handleChangeEstadoLicitacion = (value) => {
      //  console.log("ESTADO LICITACION VAL", value);  
        this.setState({estadoLicitacion: value})
    }

    handleChangeOrganismoPublico = (org) => {
        //console.log("ORG PUBLICO VAL", org);
        this.setState({organismoPublico: org})
    }
    handleChangeRUTProveedor = (e) => {
        this.setState({rutProveedor: e.target.value})
    }

    handleChangePalabrasClave = (value) => {
        this.setState({palabrasClave: value})
    }

    sendParameters= () => {
        let self = this;
       // let parameters = JSON.stringify(this.state);
     //   console.log("parameters", parameters);
    //    console.log("STATE OBJECT KEYS", Object.keys(this.state));

        //This should be destructuring to form the params

        let query = Object.keys(self.state).map( e => {
            let stateKeyValue = self.state[e];
            if(stateKeyValue === "" || stateKeyValue.trim().length === 0) {
                return;
            }else {
                let returnValue = (e + "=" + stateKeyValue).toString();
                return returnValue;
            }
        })

        query = query.filter( e => {
            //eliminates undefined returned by .map when returning from empty strings.
            if(e) { return e; }
        })

        console.log("QUERY ARRAY", query);
        let queryExpression = query.join("&");

        console.log("QUERY EXP", queryExpression);




        fetch("/get_info?" + queryExpression, {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
                console.log("RESP", response);

                self.props.onSubmit(response);

            //    console.log("RESP", response);
            
            //  console.log("SUBMIT RESPONSE", Object.keys(response));
               // self.setState({choices: response, value: self.state.choices[0]});
                })

        // por lo tanto, este deberia llamarse al clickear el boton "BUSCAR" (lupa) y hacer fetch con todos los parametros dados
        // (que vendrian a ser todas o la mayoria de las keys del state)
        // y al final del fetch, mandar this.props.items(resultados_desde_el_server) para q se muestren en <SearchResults />

       // this.props.items(licitaciones);
    }


    render = () => {
       // console.log("ORG PUBLICO", this.state.organismoPublico);
       console.log(this.state);
        return(
                <div className="container inputfields">

                    <label>Selecciona una fecha</label>
                    <DateField onChange={this.handleChangeDate}/>

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