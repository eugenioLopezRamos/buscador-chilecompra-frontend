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

    handleChange = (event) => {

        let self = this;
        let selectionResults;
        let testRegex = new RegExp(event.target.value.toLowerCase());
        selectionResults = this.state.choices.filter(e => {
            if(testRegex.test(e.toLowerCase())) {
                return e;
            }
        })

        let selected = selectionResults.length > 0 ? selectionResults[0] : "";// At first I tried to use the value of the first <option>, but then I realized that at 
        //this point its still the previous one (since the value will change on re-render after the props callback is called)
        if(!selectionResults) {
            selectionResults = [];
        }

        this.setState({
            selectionResults: selectionResults,
            selected: selected
        }, () => {this.props.onChange(selected)})

    }

    handleChangeSelect = (event) => {
        // definitely improvable, but it's a start
        // http://stackoverflow.com/questions/23448937/react-retrieve-dynamic-child-key-upon-event should use this instead of querySelector to use keys from child elements
        let newValue = event.target.value;
        this.setState({selectionResults: this.state.selectionResults, selected: newValue},
                        () => {
                                document.querySelector("#opinput").value = "";
                                this.props.onChange(newValue)
                            })
            
        }

    componentWillReceiveProps = (nextProps) => {//this updates the state of the parent when the component receives the async props
            //via fetch from the rails API

                var choiceNames = [];
                if(this.props.organismosPublicos != nextProps.organismosPublicos) {
                    console.log("nxt prop", nextProps);
                    Object.keys(nextProps["organismosPublicos"]).forEach ((element,index,array) => {        
                        choiceNames.push(nextProps["organismosPublicos"][element]);
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
                        console.log("autofiller promise succeeded");
                        self.props.onChange(value);
                    },
                    function fail() {
                        console.log("autofiller promise failed");
                    }
                )
                }    
    }



    render = () => {

        const selectionResults = this.state.selectionResults;
        
        return(
            <div className="selection-container">
                <input placeholder="Busca un organismo público (código o nombre)" id="opinput" onChange={this.handleChange}  />
                <select className="autofiller select" id="opselect" onChange={this.handleChangeSelect}>
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