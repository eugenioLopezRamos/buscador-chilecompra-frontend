import React from 'react';


class SelectionField extends React.Component {

    constructor(props, state) {
        super(props, state);

        this.state = ({

        choices: ""

        })
    }

    componentDidMount = () => {
        var self = this;
        fetch("/estadoslicitacion", {accept: 'application/json', contentType: 'application/json'})
                    .then(function(response) { return response.json()})
                        .then(function(response) {
                            console.log("RESP", response);
                            self.setState({choices: response});
                        })
    }

    handleChange = (e) => {
        
        console.log("handle change");
        this.props.onSelectionChange(e.target.value);
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

        console.log("values", values);

        return (
            <div>
                <select onChange={this.handleChange} >
                  {
                      values.map( (e, i) => {
                          
                          console.log("eee", e);
                          return <option key={i}>{e}</option>

                        })
                  }      
                </select>
            </div>
            )
    }

}

export default SelectionField;