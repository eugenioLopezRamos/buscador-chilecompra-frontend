import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AutoFillerInput = (props) => {

    const handleSelectionChange = (event) => {
        let {value} = event;
        props.onSelectionChange(value);
    }

    // const handleInputChange = (event) => {
    //     let {value} = event.target || event;
    //     props.onInputChange(props.organismosPublicos, value);
    // }

    const options = props.organismosPublicosFilteredSubset.map((orgNames, index) => {
    
        let key = Object.keys(orgNames)[0];
        let value = orgNames[key];

        return {value: key, key, label: `${value} (${key})`}

    });
       
        return(
                <div className="selection-container">
                    <Select 
                        value={props.selectedOrganismoPublico}
                        onChange={handleSelectionChange}
                        key="autofiller-select"
                        options={options}
                    />
                </div>  

              
        )
}
export default AutoFillerInput;

/*
                    <select value={props.selectedOrganismoPublico} onChange={handleSelectionChange} key="autofiller-select">
                        {   
                    
                            props.organismosPublicosFilteredSubset.map((e,i) => {
                        
                                let key = Object.keys(e)[0]
                                return <option value={key} key={key}>{e[key]} ({key})</option>

                                })
                        }
                    </select>*/
/*
                    <div className="selection-container">
                    <input 
                        value={props.organismosPublicosFilter}
                
                        className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                        placeholder="Busca un organismo público (código o nombre)" 
                        onChange={handleInputChange}
                        />
                    <Select 
                        value={props.selectedOrganismoPublico}
                        onChange={handleSelectionChange}
                        key="autofiller-select"
                        options={options}
                    />

                </div>  */