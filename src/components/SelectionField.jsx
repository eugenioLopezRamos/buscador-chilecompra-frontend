import React from 'react';


class SelectionField extends React.Component {

    constructor(props, state) {
        super(props, state);
    }

    handleChange = (e) => {
        
        console.log("handle change");
        this.props.onSelectionChange(e.target.value);

    }

    render = () => {
        return (
            <select onChange={this.handleChange} >
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
                <option>Four</option>
                <option>Five</option>         
            </select>
            )
    }

}

export default SelectionField;