import React from 'react';


class AutoFillerInput extends React.Component {
    constructor(state, props){
        super(state, props);
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

   // let selectionResults = [];
    if(event.target.value.length < 3 && event.target.length > 0) {
        return;
    }
    if(event.target.value.length === 0) {
        selectionResults = this.state.choiceNames;
    }
    //need to add something to throttle this without losing user input!!

    let testRegex = new RegExp(event.target.value.toLowerCase());
    let selectionResults = this.state.choiceNames.filter(e => {
        if(testRegex.test(e.toLowerCase())) {
            return e;
        }
    })

    this.setState({
        selectionResults: selectionResults
    })
}

componentDidMount = () => {
    var self = this;
    fetch("/get_misc_info" + "?info=" + this.props.choices, {accept: 'application/json', contentType: 'application/json'})
        .then(function(response) { return response.json()})
        .then(function(response) {
            console.log("RESP", response);
            let choiceNames = [];
            Object.keys(response).forEach (e => {
                choiceNames.push(response[e]);
            })
            self.setState({choices: response,
                           choiceNames: choiceNames,
                            selectionResults: choiceNames});
         })
}



render = () => {

    const selectionResults = this.state.selectionResults;

    return(
        <div className="selection-container">
            <input placeholder="Busca un organismo público (código o nombre)" onChange={this.handleChange} />
            <select className="autofiller select" >
            {   
                selectionResults.map ( (e, i) => {
                 
                        return <option key={"selection-" + (i+1) }>{e}</option>
                    
                
                })
            }
            </select>



        </div>
        )
}


}


export default AutoFillerInput;