import React from 'react';


class AutoFillerInput extends React.Component {
    constructor(state, props){
        super(state, props);
        this.state = ({
            selection: [],
            selectionResults: [],
            choices: [],
            selected: []
          //  choiceNames: ""
        })
    }

    handleChange = (event) => {

        let self = this;
        let selectionResults;
        let testRegex = new RegExp(event.target.value.toLowerCase());
       // console.log("CHOICES ON CHANGE", this.state.choices);

       /* let choices = Object.keys(this.state.choices).map (e => {
            return self.state.choices[e]["key"];
        });
        console.log("CHOICES", choices);*/
        selectionResults = this.state.choices.filter( (e, i) => {

            let key = Object.keys(self.state.choices[i])[0];

            if(testRegex.test(e[key].toLowerCase())) {
                return e;
            }
        })

        console.log("selectionresults ",  selectionResults);
      //  console.log("SELEC RESULT", selectionResults);
        let selected = selectionResults.length > 0 ? selectionResults[0] : [{"key":""}];// At first I tried to use the value of the first <option>, but then I realized that at 
        //this point its still the previous one (since the value will change on re-render after the props callback is called)
        if(!selectionResults) {
            selectionResults = [];
        }
        console.log("selected[key] ", selected);
        let newSelected = (() => {
           return Object.keys(selected)[0];
        })();

        console.log(newSelected);

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



// maybe it gets fucked up when resetting .selectionResults?
        console.log("THIS SELCTIONRESULTS", this.state.selectionResults);
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
                       // let value = document.querySelector("#opselect option").value;
                        console.log("autofiller promise succeeded");
                        self.props.onChange(Object.keys(self.state.choices[0])[0])
                        //self.props.onChange(value);
                    },
                    function fail() {
                        console.log("autofiller promise failed");
                    }
                )
                }    
    }



    render = () => {
        var self = this;
        var dVKey = this.state.selected.toString();
        console.log("dVKEY ", dVKey);
        var defaultValue = this.props.organismosPublicos[dVKey];
        console.log("this props op", this.props.organismosPublicos);
        console.log("defaultValue", defaultValue);
        console.log("THIS STATE", this.state);
   
        var kek = this.state.choices.map ( (e, i) => {

            if(Object.keys(e)[0] === self.state.selected) {
                return i;
            }


        });
        var newVallue ="";
        var ph = kek.filter (e => {
            if(e) {return e}
        })

        if(!ph) {
            return;
        }else {
            if(self.state.choices[ph]) {
                newVallue = self.state.choices[ph][dVKey];
            }
            
        }

         

        console.log("newVALLUE", newVallue);
       // const options = this.state.selectionResults;
       // console.log("SELECTION RESULTS RENDER", this.state.selectionResults);
      //  const selectionResults = Object.keys(this.state.selectionResults);



        console.log("this selected state", this.state.selected);
        // tira como defaultvlaue el INDEX del seleccionado antes de hacer el callback a props.

        return(
            <div className="selection-container">
                <input placeholder="Busca un organismo público (código o nombre)" id="opinput" onChange={this.handleChange}/>


                <select className="autofiller select" id="opselect" onChange={this.handleChangeSelect} value={newVallue}>
                {   
                    this.state.selectionResults.map ( (e, i) => {
                        let key = Object.keys(self.state.selectionResults[i])[0];
                        let value = self.state.selectionResults[i][key];
                     //   console.log("RENDER VALUE", value);
                        return <option className="options" key={"selection-" + (i+1) }>{value}</option>
                    })
                }
                </select>
            </div>
            )
    }


}


export default AutoFillerInput;

//                {console.log("state selected", self.state.selected)}
//{ console.log("choices", self.state.choices) }