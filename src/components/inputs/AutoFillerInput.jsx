import React from 'react';

class AutoFillerInput extends React.Component {
    constructor(props) {
        super(props);
     }

    componentDidMount = (props) => {
        // let self = this;
        // if(props.organismosPublicos.length > 1) {
        //     props.onInputChange(props.organismosPublicos, "");
        // } 
    }
    
    // componentWillReceiveProps = (nextProps) => {
    //     let self = this;
    //     if(nextProps.organismosPublicos != this.props.organismosPublicos) {

    //         //sets an empty filter, which in turn populates the organismosPublicosFilteredSubset with all the items in state.organismosPublicos.    
    //         self.props.onInputChange(nextProps.organismosPublicos, ""); 
    //         //this is a bit less performant than having the fetchOrganismosPublicos reducer set this, but that would mean a reducer would affect two parts of the state 
    //         //(or me having to restructure the whole state to manage this very specific case, which only happens once per browser pageload)
    //     }
    // }

    handleSelectionChange = (event) => {
        this.props.onSelectionChange(event);
    }

    handleInputChange = (event) => {

        this.props.onInputChange(this.props.organismosPublicos, event.target.value);
    }
  
    render = () => {
        let items = this.props.organismosPublicosFilteredSubset;
        return(
                <div className="selection-container">
                    <input 
                     value={this.props.organismosPublicosFilter}
                     ref="inputBox" 
                     className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                     placeholder="Busca un organismo público (código o nombre)" 
                     id="opinput" 
                     onChange={this.handleInputChange}
                     />
                
                    <select value={this.props.selectedOrganismoPublico} ref="selectBox" onChange={this.handleSelectionChange}>
                        { 
                            items.map( (e,i) => {

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


