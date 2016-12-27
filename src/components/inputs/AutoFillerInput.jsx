import React from 'react';

class AutoFillerInput extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleSelectionChange = (event) => {
        this.props.onSelectionChange(event);
    }

    handleInputChange = (event) => {

        this.props.onInputChange(this.props.organismosPublicos, event.target.value);
    }
    
    render = () => {
        let self = this;
        return(
        
                <div className="selection-container">
                    <input 
                        value={this.props.organismosPublicosFilter}
                
                        className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                        placeholder="Busca un organismo público (código o nombre)" 
                        id="opinput" 
                        onChange={this.handleInputChange}
                        />
                    <select value={this.props.selectedOrganismoPublico} onChange={this.handleSelectionChange} key="autofiller-select">
                        {   
                    
                            this.props.organismosPublicosFilteredSubset.map((e,i) => {
                           
                                let key = Object.keys(e)[0]
                                return <option value={key} key={key}>{e[key]} ({key})</option>

                                })
                        }
                    </select>
                </div>  
              
        )
    }
}
export default AutoFillerInput;


