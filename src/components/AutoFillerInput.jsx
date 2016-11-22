import React from 'react';


class AutoFillerInput extends React.Component {
    constructor(state, props){
        super(state, props);
        this.state = ({
            selection: [],
            selectionResults: [],
            choices: [],
            selected: []
        })
    }

    handleChange = (event) => {

        let self = this;
        let selectionResults;
        let testRegex = new RegExp(event.target.value.toLowerCase());
        selectionResults = this.state.choices.filter( (e, i) => {

            let key = Object.keys(self.state.choices[i])[0];

            if(testRegex.test(e[key].toLowerCase())) {
                return e;
            }
        })

        let selected = selectionResults.length > 0 ? selectionResults[0] : [{"key":""}];// At first I tried to use the value of the first <option>, but then I realized that at 
        //this point its still the previous one (since the value will change on re-render after the props callback is called)
        if(!selectionResults) {
            selectionResults = [];
        }

        let newSelected = (() => {
           return Object.keys(selected)[0];
        })();

        this.setState({
            selectionResults: selectionResults,
            selected: selected
        }, () => {this.props.onChange(newSelected)})

    }

    handleChangeSelect = (event) => {
        // definitely improvable, but it's a start
        // http://stackoverflow.com/questions/23448937/react-retrieve-dynamic-child-key-upon-event should use this instead of querySelector to use keys from child elements
        let newValue = event.target.value;
        let matchRegex = new RegExp(newValue);
        let self = this;


        // When manually selecting/clearing this I should reset the values presented in <select> 
        
        //no deberia cambiar searchResults (quedarian los mismos), pero si deberia cambiar selected o similar, para poder dejar seleccionado el que vale
        // sin modificar el conjunto de los que se muestran  
        let toState = this.state.selectionResults.map (e => {
            let keyValue = Object.keys(e)[0];
            if(e[keyValue] === newValue) {
                return keyValue;
            }
        });

        toState = toState.filter (e => {
            if(e) { return e}
        });



        // probably should get the index on state and then just do this.state.choices[index] on <select> ?
        this.setState({selected: toState[0],
                        selectionResults: this.state.choices},
                        () => {
                                document.querySelector("#opinput").value = "";
                                this.props.onChange(self.state.selected);
                            })
            
        }




    componentWillReceiveProps = (nextProps) => {//this updates the state of the parent when the component receives the async props
            //via fetch from the rails API

                var choiceNames = [];
                if(this.props.organismosPublicos != nextProps.organismosPublicos) {
                    Object.keys(nextProps["organismosPublicos"]).forEach ((element,index,array) => {
                        //so, here instead of pushing the key's value (e.g. ["orgPub"]["6918"] => "Hospital Calvo Mackenna")
                        // I should just push the whole object and in the <select> push ["6918"] 
                        let key = element.toString();
                        let value = (nextProps["organismosPublicos"][element] + " (" + element + ")").toString();
                        let object = {};
                        object[key] = value;
                        choiceNames.push(object);
                    })

                this.setState({choices: choiceNames, 
                                selectionResults: choiceNames
                                });

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
                        self.props.onChange(Object.keys(self.state.choices[0])[0])
                    },
                    function fail() {
                        console.log("autofiller promise failed");
                    }
                )
                }    
    }



    render = () => {

        // let newVal = NewValueAction.js

        //change newVal to selectDefaultValue ^
        let newVal="";

        return(
            <div className="selection-container">
                <input className="col-xs-12 col-md-10 col-lg-4 no-gutter" placeholder="Busca un organismo público (código o nombre)" id="opinput" onChange={this.handleChange}/>


                <select className="autofiller select col-xs-12 col-md-10 col-lg-4 no-gutter" id="opselect" onChange={this.handleChangeSelect} value={newVal}>
                {   
                    this.state.selectionResults.map ( (e, i) => {
                        let key = Object.keys(self.state.selectionResults[i])[0];
                        let value = self.state.selectionResults[i][key];
                        return <option className="options" key={"selection-" + (i+1) }>{value}</option>
                    })
                }
                </select>
            </div>
            )
    }


}

export default AutoFillerInput;
