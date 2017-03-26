import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AutoFillerInput = (props) => {

    // const handleSelectionChange = (event) => {
    //     let {value} = event;
    //     props.onSelectionChange(value);
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
                        onChange={(value) => props.onSelectionChange(value)}
                        key="autofiller-select"
                        options={options}
                        placeholder="Busca un organismo público (código o nombre)"
                        clearable={false}
                    />
                </div>  

              
        )
}
export default AutoFillerInput;