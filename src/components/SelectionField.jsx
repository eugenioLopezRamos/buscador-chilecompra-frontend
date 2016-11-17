import React from 'react';


class SelectionField extends React.Component {

    constructor(props, state) {
        super(props, state);

        this.state = {
            selection: ""
        }
    }

 /*   componentDidUpdate = () => {
        if(typeof this.props.estadosLicitacion != "undefined") {
            console.log("estados", this.props.estadosLicitacion);
            var estadosLicitacion = this.props.estadosLicitacion[0];
        }else {
            var estadosLicitacion = "";
        }
        this.props.onChange(estadosLicitacion);
    }*/

    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    componentWillReceiveProps = (nextProps) => { //this updates the state of the parent when the component receives the async props
        //via fetch from the rails API

            var choiceNames = [];
            if(this.props.estadosLicitacion != nextProps.estadosLicitacion) {
             //   console.log("nxt prop lic", nextProps);
                Object.keys(nextProps["estadosLicitacion"]).forEach ((e,i,a) => {        
                    choiceNames.push(nextProps["estadosLicitacion"][e]);
                })

         /*   this.setState({choices: choiceNames, 
                            selectionResults: choiceNames});*/

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
                    let value = document.querySelector("#estadosLicitacion-select option").value;
               //     console.log("SEL autofiller promise succeeded");
                    self.props.onChange(value);
                },
                function fail() {
                    console.log("SEL autofiller promise failed");
                }
            )
            }    
    }

    render = () => {
        var values = []
        var self = this;
        if(typeof this.props.estadosLicitacion != "undefined") {
            Object.keys(self.props.estadosLicitacion).forEach(key => {
                let codigo;
                ["", undefined].includes(self.props.estadosLicitacion[key]) ? codigo = "" : codigo = " (" + self.props.estadosLicitacion[key] +")" ;
                values.push(key + codigo);

            })
        }

        return (
            <div>
                <select id="estadosLicitacion-select" onChange={this.handleChange} >
                  {
                      values.map( (e, i) => {
                          return <option key={i}>{e}</option>
                        })
                  }      
                </select>
            </div>
            )
    }

}

export default SelectionField;