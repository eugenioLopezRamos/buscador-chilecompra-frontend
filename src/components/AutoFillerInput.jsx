import React from 'react';


class AutoFillerInput extends React.Component {
    constructor(state, props){
        super(state, props);
        this.state = ({
            selection: "",
            selectionResults: [],
            choices: ""
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
      //  console.log("SELEC RESULT", selectionResults);
        let selected = selectionResults.length > 0 ? selectionResults[0] : [{"key":""}];// At first I tried to use the value of the first <option>, but then I realized that at 
        //this point its still the previous one (since the value will change on re-render after the props callback is called)
        if(!selectionResults) {
            selectionResults = [];
        }

        this.setState({
            selectionResults: selectionResults,
            selected: selected["key"]
        }, () => {this.props.onChange(Object.keys(selected)[0])})

    }

    handleChangeSelect = (event) => {
        // definitely improvable, but it's a start
        // http://stackoverflow.com/questions/23448937/react-retrieve-dynamic-child-key-upon-event should use this instead of querySelector to use keys from child elements
        let newValue = event.target.value;
        this.setState({selected: newValue},
                        () => {
                                document.querySelector("#opinput").value = "";
                                this.props.onChange(newValue);
                            })
            
        }

    componentWillReceiveProps = (nextProps) => {//this updates the state of the parent when the component receives the async props
            //via fetch from the rails API

                var choiceNames = [];
                if(this.props.organismosPublicos != nextProps.organismosPublicos) {


               //     console.log("nxt prop", nextProps);
                 //   console.log("next props", nextProps.organismosPublicos);
                   
                   
                   
                   // console.log("next props JSON", JSON.stringify(nextProps.organismosPublicos));
                 //   let JSONProps = JSON.stringify(nextProps, )
                  /*  Object.keys(nextProps["organismosPublicos"]).forEach ((element,index,array) => {
                        //so, here instead of pushing the key's value (e.g. ["orgPub"]["6918"] => "Hospital Calvo Mackenna")
                        // I should just push the whole object and in the <select> push ["6918"] 


                        choiceNames.push(nextProps["organismosPublicos"][element]);
                      


                    })*/
                    Object.keys(nextProps["organismosPublicos"]).forEach ((element,index,array) => {
                        //so, here instead of pushing the key's value (e.g. ["orgPub"]["6918"] => "Hospital Calvo Mackenna")
                        // I should just push the whole object and in the <select> push ["6918"] 
                        let key = element.toString();
                        //console.log("KEY VALUE IS ", key);
                        let value = nextProps["organismosPublicos"][element].toString();
                        //console.log("VALUE VALUE IS ", value);
                       // console.log("KEY VALUE IS ", key);
                       // console.log("PUSH ", {key: value});

                        let object = {};
                        object[key] = value;
                        choiceNames.push(object);
                    
                    //choiceNames.push(nextProps["organismosPublicos"][element]);
                    })

                   // console.log("CHOICENAMES", choiceNames);
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
       // const options = this.state.selectionResults;
       // console.log("SELECTION RESULTS RENDER", this.state.selectionResults);
      //  const selectionResults = Object.keys(this.state.selectionResults);
        
        return(
            <div className="selection-container">
                <input placeholder="Busca un organismo público (código o nombre)" id="opinput" onChange={this.handleChange}  />
                <select className="autofiller select" id="opselect" onChange={this.handleChangeSelect}>
                {   
                    this.state.selectionResults.map ( (e, i) => {
                        let key = Object.keys(self.state.selectionResults[i])[0]
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