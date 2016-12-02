import React from 'react';

const SearchField = (props) => {

    console.log("change handler prop in <SearchField />", props);

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
            <input className="col-xs-8 col-md-10" type="search" onChange={handleChange}/>

            <button className="col-xs-2 fullheight-btn align-right" type="submit" onSubmit={handleSubmit} onClick={handleClick} >
                <span className="glyphicon glyphicon-search"></span>
            </button>
        </div>
    )

}


export default SearchField;