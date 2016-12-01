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
            //console.log("FIRED");

          //  console.log("nextProps", nextProps);
            let newValue = ""
            let firstValue = nextProps.organismosPublicos[0];
            //console.log("firsval", firstValue);
            // let selectedValue = ""
            // if(Object.keys(firstValue)[0]){
            //     selectedValue = Object.keys(firstValue)[0];
            // } 
            //console.log("newval props", newValue, "selec val", selectedValue);
            self.props.onInputChange(newValue);
        }
      //  this.props.onInputChange(this.refs.inputBox.value, this.refs.selectBox.value) // this triggers 2 effects when the only thing we need to do
      // is getting a default value on fetch success
    }

    handleSelectionChange = (event) => {
        this.props.onSelectionChange(event);
    }
    handleInputChange = (event) => {
        let newValue = event.target.value;
       // console.log("THIS REFS SELBOX", this.refs.selectBox.value);
       // let selectedValue = this.refs.selectBox.value;
        //console.log("evt handler values NEW", newValue, "evt hand SELC", selectedValue);
        this.props.onInputChange(newValue);
    }
  
    render = () => {
         let items = this.props.organismosPublicosFilteredSubset;
        // let defaultValue = "";
        // let testRegex = new RegExp(this.props.organismosPublicosFilter.toLowerCase());
        
        // selectionResults = this.props.organismosPublicos.filter( (e, i) => {

        //     let key = Object.keys(e)[0];
        //     if(i === 0) {
        //         defaultValue = key;
        //     }

        //     if(testRegex.test(e[key].toLowerCase())) {
        //         return e[key];
        //     }
        // })
        

        return(
                <div className="selection-container">
                    <
                     input ref="inputBox" 
                     className="col-xs-12 col-md-10 col-lg-4 no-gutter" 
                     placeholder="Busca un organismo público (código o nombre)" 
                     id="opinput" 
                     onChange={this.handleInputChange}
                     />
                
                    <select value={this.props.selectedOrganismoPublico} ref="selectBox"onChange={this.handleSelectionChange}>
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


