import React from 'react';

class SearchField extends React.Component {
    constructor(props, state) {
        super(props, state);

        this.state = {
            searchValue: ""
        }
    }

    handleChange = (e) => {this.setState({searchValue: e.target.value})}

    handleClick = (e) => {

        this.props.onChange(this.state.searchValue);
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

