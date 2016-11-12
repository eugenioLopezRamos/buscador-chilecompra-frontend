import React from 'react';

class SearchField extends React.Component {
    constructor(props, state) {
        super(props, state);

        this.state = {
            searchValue: this.props.searchValue,
            searchResults: {}
        }
    }

    handleChange = (e) => {
        this.setState({searchValue: e.target.value});

    
}

    handleClick = (e) => {
        let licitaciones = {"hola": "mundo"};//{"Cantidad":2,"FechaCreacion":"2016-11-11T20:49:53.897","Version":"v1","Listado":[{"CodigoExterno":"2241-4-LE16","Nombre":"SERVICIO DE APOYO Y MANTENTENCION  ","CodigoEstado":8,"FechaCierre":"2016-10-25T15:00:00"},{"CodigoExterno":"4903-1-LE16","Nombre":"Programa de Calidad de Vida Laboral","CodigoEstado":8,"FechaCierre":"2016-09-21T11:00:00"}]};

    //    this.props.onChange(this.state.searchValue);
        this.props.licitaciones(licitaciones);
    }



    render = () => {
                return (
                <div>
                    <input className="col-xs-10 col-md-7 col-md-offset-2 col-lg-5 col-lg-offset-3" type="search" onChange={this.handleChange}/>

                    <button className="align-right" type="submit" onClick={this.handleClick} >
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </div>
                )
    }



}

export default SearchField;

