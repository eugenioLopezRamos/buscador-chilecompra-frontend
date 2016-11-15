import React from 'react';


class SelectionField extends React.Component {

    constructor(props, state) {
        super(props, state);

        this.state = ({

            value: "",
            choices: ""

        })
    }

    componentWillMount = () => {
        var self = this;
        fetch("/get_misc_info" + "?info=" + this.props.choices, {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
                console.log("RESP", response);
                self.setState({choices: response});
                }) 
    }

    handleChange = (event) => {
        
        console.log("handle change", event);
        this.props.onChange(event.target.value);
    }

    render = () => {
       // console.log("state", this.state.choices);
        var values = []
        var self = this;
        Object.keys(self.state.choices).forEach(key => {
            console.log("object keys", key);
            let codigo;
            ["", undefined].includes(self.state.choices[key]) ? codigo = "" : codigo = " (" + self.state.choices[key] +")" ;
            values.push(key + codigo);

        })


        return (
            <div>
                <select onChange={this.handleChange} value={this.state.value} >
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