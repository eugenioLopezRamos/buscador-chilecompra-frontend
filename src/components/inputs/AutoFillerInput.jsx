import React from 'react';

//here I can probably ddo something like:
//pass state.organismosPublicos as prop
// pass state.filter as prop (where state.filter would simply be the value of the inputbox)
// and do the filtering logic here instead of in an action

// and per the fuel app example, I'd insert the event listener as a prop passed by the parent (InputFieldsContainer)
// then have that prop trigger an action from /actions/ that dispatches to the state


// Seems likely I'll have to transform this into a regular component instead of functional component
// const AutoFillerInput = ({organismosPublicos, organismosPublicosFilter, onSelectionChange, onInputChange }) => {

//     const handleSelectionChange = (event) => {
//         onSelectionChange(event);
//     }
//     const handleInputChange = (event) => {
//         let newValue = event.target.value;

//         onInputChange(newValue);
//     }
  
//     let selectionResults = [];
//     let defaultValue = "";
//     let testRegex = new RegExp(organismosPublicosFilter.toLowerCase());
//     selectionResults = organismosPublicos.filter( (e, i) => {

//         let key = Object.keys(e)[0];
//         if(i === 0) {
//             defaultValue = key;
//         }

//         if(testRegex.test(e[key].toLowerCase())) {
//             return e[key];
//         }
//     })
//     //console.log("obj........", Object.keys(selectionResults));

//     return(
//             <div className="selection-container">
//                 <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" placeholder="Busca un organismo público (código o nombre)" id="opinput" onChange={handleInputChange}/>
            
//                 <select value={defaultValue} onChange={handleSelectionChange}>
//                     { 
//                         selectionResults.map( (e,i) => {

//                             let key = Object.keys(e)[0]
//                             return <option value={key} key={key}>{e[key]} ({key})</option>

//                             })
//                     }
//                 </select>
//             </div>  
//     )
// }
// export default AutoFillerInput;
class AutoFillerInput extends React.Component {//= ({organismosPublicos, organismosPublicosFilter, onSelectionChange, onInputChange }) => {
    constructor(props) {
        super(props);
    }

    componentDidUpdate = () => {
        this.props.onInputChange(this.refs.inputBox.value, this.refs.selectBox.value)
    }

    handleSelectionChange = (event) => {
        this.props.onSelectionChange(event);
    }
    handleInputChange = (event) => {
        let newValue = event.target.value;
       // console.log("THIS REFS SELBOX", this.refs.selectBox.value);
        let selectedValue = this.refs.selectBox.value;
        this.props.onInputChange(newValue, selectedValue);
    }
  
    render = () => {
        let selectionResults = [];
        let defaultValue = "";
        let testRegex = new RegExp(this.props.organismosPublicosFilter.toLowerCase());
        selectionResults = this.props.organismosPublicos.filter( (e, i) => {

            let key = Object.keys(e)[0];
            if(i === 0) {
                defaultValue = key;
            }

            if(testRegex.test(e[key].toLowerCase())) {
                return e[key];
            }
        })

        return(
                <div className="selection-container">
                    <input ref="inputBox" className="col-xs-12 col-md-10 col-lg-4 no-gutter" placeholder="Busca un organismo público (código o nombre)" id="opinput" onChange={this.handleInputChange}/>
                
                    <select ref="selectBox"onChange={this.handleSelectionChange}>
                        { 
                            selectionResults.map( (e,i) => {

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


