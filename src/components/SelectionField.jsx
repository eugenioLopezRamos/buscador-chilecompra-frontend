import React from 'react';


class SelectionField extends React.Component {

    constructor(props, state) {
        super(props, state);
    }

    componentDidUpdate = () => {
      /*  var self = this;
        fetch("/get_misc_info" + "?info=" + this.props.choices, {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
                console.log("RESP", response);
                self.setState({choices: response});
                }) */
        if(typeof this.props.estadosLicitacion != "undefined") {
            console.log("estados", this.props.estadosLicitacion);
            var estadosLicitacion = this.props.estadosLicitacion[0];
        }else {
            var estadosLicitacion = "";
        }
        this.props.onChange(estadosLicitacion);
    }

    componentDidUpdate = () => {

    }

    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render = () => {
        var values = []
        var self = this;
        if(typeof this.props.estadosLicitacion != "undefined") {
            Object.keys(self.props.estadosLicitacion).forEach(key => {
                let codigo;
                ["", undefined].includes(self.props.estadosLicitacion[key]) ? codigo = "" : codigo = " (" + self.props.estadosLicitacion[key] +")" ;
                values.push(key + codigo);

            })
        }



        return (
            <div>
                <select id="estadosLicitacion-select" onChange={this.handleChange} >
                  {
                      values.map( (e, i) => {
                          return <option key={i}>{e}</option>
                        })
                  }      
                </select>
            </div>
            )
    }

}

export default SelectionField;