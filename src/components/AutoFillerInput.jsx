import React from 'react';


class AutoFillerInput extends React.Component {
    constructor(state, props){
        super(state, props);
        console.log("CONSTRUCOTR");
        this.state = ({
            selection: "",
            selectionResults: [],
            choices: "",
            choiceNames: ""
        })
    }


selectStatus = () => {
    let status;

    status = this.state.selectionResults.length === 0 ? "select-hidden" : "select";

    return status;

}

handleChange = (event) => {

    if(event.target.value.length < 3 && event.target.length > 0) {
        return;
    }
    if(event.target.value.length === 0) {
        selectionResults = this.state.choiceNames;
    }
    let testRegex = new RegExp(event.target.value.toLowerCase());
    var selectionResults = this.state.choices.filter(e => {
        if(testRegex.test(e.toLowerCase())) {
            return e;
        }
    })
  //  var newStartingIndex = this.state.choices.indexOf(selectionResults[0])
  //  var target = document.querySelector('#opselect');
  //  var change = new Event("change", {bubbles: true});

  //  target.dispatchEvent(change);
    this.setState({
        selectionResults: selectionResults
    })
//    console.log(newStartingIndex);

   // document.querySelector('#op-select').onchange();
      var selected = document.querySelector('#opselect option:first-of-type').value
      console.log("SELECTED", selected);
      this.props.onChange(selected);
   // this.props.onChange(selectionResults[0]);
}

onSelect = (event) => {
    //console.log(event);
    console.log("SELECT CHANGE");
}

componentWillReceiveProps = (nextProps) => {

            var choiceNames = [];
            if(this.props.organismosPublicos != nextProps.organismosPublicos) {
                console.log("nxt prop", nextProps);
                Object.keys(nextProps["organismosPublicos"]).forEach ((e,i,a) => {        
                    choiceNames.push(nextProps["organismosPublicos"][e]);
                })

            this.setState({choices: choiceNames, 
                            selectionResults: choiceNames});

            var setInitialValue = new Promise(function(resolve, reject) {
                if(document.querySelectorAll(".options")) {
                    resolve();
                }else {
                    throw error;
                }
            });

            var self = this;
            setInitialValue.then(
                function success() {
                    let value = document.querySelector("#opselect option").value;
                    console.log("succeeded");
                    self.props.onChange(value);
                },
                function fail() {
                    console.log("failed");
                }
            )









            }



       
}



render = () => {

    const selectionResults = this.state.selectionResults;
    
    return(
        <div className="selection-container">
            <input placeholder="Busca un organismo público (código o nombre)" onChange={this.handleChange}  />
            <select className="autofiller select" id="opselect" onChange={this.onSelect} >
            {   
                selectionResults.map ( (e, i) => {
                 
                        return <option className="options" key={"selection-" + (i+1) }>{e}</option>
                    
                
                })
            }
            </select>



        </div>
        )
}


}


export default AutoFillerInput;