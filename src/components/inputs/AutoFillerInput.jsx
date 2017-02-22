import React from 'react';

const AutoFillerInput = (props) => {

    const handleSelectionChange = (event) => {
       props.onSelectionChange(event);
    }

    const handleInputChange = (event) => {

        props.onInputChange(props.organismosPublicos, event.target.value);
    }

       
        return(
        
                <div className="selection-container">
                    <input 
                        value={props.organismosPublicosFilter}
                
                        className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                        placeholder="Busca un organismo público (código o nombre)" 
                        onChange={handleInputChange}
                        />
                    <select value={props.selectedOrganismoPublico} onChange={handleSelectionChange} key="autofiller-select">
                        {   
                    
                            props.organismosPublicosFilteredSubset.map((e,i) => {
                        
                                let key = Object.keys(e)[0]
                                return <option value={key} key={key}>{e[key]} ({key})</option>

                                })
                        }
                    </select>
                </div>  
              
        )
}
export default AutoFillerInput;


