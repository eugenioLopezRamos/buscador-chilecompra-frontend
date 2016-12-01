import React from 'react';

//here I can probably ddo something like:
//pass state.organismosPublicos as prop
// pass state.filter as prop (where state.filter would simply be the value of the inputbox)
// and do the filtering logic here instead of in an action

// and per the fuel app example, I'd insert the event listener as a prop passed by the parent (InputFieldsContainer)
// then have that prop trigger an action from /actions/ that dispatches to the state


// Seems likely I'll have to transform this into a regular component instead of functional component

class AutoFillerInput extends React.Component {//= ({organismosPublicos, organismosPublicosFilter, onSelectionChange, onInputChange }) => {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = (nextProps) => {
        let self = this;
        if(nextProps.organismosPublicos.length != this.props.organismosPublicos.length) {
            self.props.onInputChange(""); //sets an empty filter, which in turn populates the organismosPublicosFilteredSubset with all the items in state.organismosPublicos.
        }
    }

    handleSelectionChange = (event) => {
        this.props.onSelectionChange(event);
    }
    handleInputChange = (event) => {

        this.props.onInputChange(event.target.value);
    }
  
    render = () => {
         let items = this.props.organismosPublicosFilteredSubset;
        return(
                <div className="selection-container">
                    <
                     input ref="inputBox" 
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


