import React from 'react';


class SelectionField extends React.Component {

    constructor(props, state) {
        super(props, state);
    }

    handleChange = (e) => {
        
        console.log("handle change");
        this.props.onSelectionChange(e.target.value);

       return fetch('/test', {accept: 'application/json',}).then(function(response) { return response.json()})
       .then(function(response) {
           console.log("response", response.test);
        })



    }

    render = () => {
        return (
            <div>
                <label>Selecciona tu opcion</label>
                <select onChange={this.handleChange} >
                    <option>Uno</option>
                    <option>Dos</option>
                    <option>Tres</option>
                    <option>Cuatro</option>
                    <option>Cinco</option>         
                </select>
            </div>
            )
    }

}

export default SelectionField;