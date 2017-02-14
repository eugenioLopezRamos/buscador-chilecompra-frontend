import React from 'react';
import {debouncer} from '../../utils/miscUtils';
const SearchField = (props) => {

    const handleChange = (event) => {
        props.onChange(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        props.onSubmit();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div>
            <input className="col-xs-10 col-md-10" value={props.value} type="search" onChange={handleChange}/>
            <button className="col-xs-2 fullheight-btn align-right" type="submit" onSubmit={handleSubmit} onClick={handleClick} >
                <span className="glyphicon glyphicon-search"></span>
            </button>
        </div>
    )
}
export default SearchField;