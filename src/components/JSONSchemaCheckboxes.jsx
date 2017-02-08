import React from 'react';
import * as utils from '../utils/miscUtils';
import objectAssign from 'object-assign';
import {chileCompraResponseExample} from '../utils/objectSchemaExamples'
import RESULTS_INITIAL_CHECKBOXES from '../constants/resultsInitialCheckboxes';

class JSONSchemaCheckboxes extends React.Component {
    //props: {schema: {...}}
    constructor(props) {
        super(props);

        this.state = {
            picked: RESULTS_INITIAL_CHECKBOXES
        }

        this.objectSchema = (() => {
            return utils.getObjectSchema(chileCompraResponseExample)
        })();

        this.containerCounter = 0;
        this.containers = new Array;
    }



    toggleDisplay = (target, event) => {
        //debugger
        let display = getComputedStyle(target).display;
        event.target.classList.toggle("json-schema-label-closed");
        event.target.classList.toggle("json-schema-label-open");


        if(display === "none") {
            target.className = "checkboxes-container";
            // event.target.classList.remove("json-schema-label-closed");
            // event.target.classList.add("json-schema-label-open");
        }else {
            target.className = "checkboxes-container no-display";
            // event.target.classList.add("json-schema-label-closed");
            // event.target.classList.remove("json-schema-label-open");
        }
    }



    checkColumnHandler = (target, event) => {
        let saveValue = target.slice(1);
        let newPicked = this.state.picked.slice();
       //create a new copy of the object.

       if(event.target.checked) {
            
            newPicked.push(saveValue);
            this.setState({picked: newPicked}, this.props.changeColumns(newPicked));
       }
       else {
            let toSplice = -1;
            //search the index of the item that's already in the array
            newPicked.map((element, index) => {
                if(JSON.stringify(element) === JSON.stringify(saveValue)) {
                    toSplice = index;
                };
            });
            //remove that item from the array
            newPicked.splice(toSplice,1);
            this.setState({picked: newPicked}, this.props.changeColumns(newPicked));
       }

    }


    applyColumnsChange = () => {
        this.props.changeColumns(this.state.picked);
    }

    renderCheckboxes = (object, tags) => {
        let self = this;
        //renders non primitves at the end (looks cleaner)
        let renderLater = new Array;

        //used as id for each container to be ref'd on the <label onClick> handler
        this.containerCounter++;

        //the current value of the counter
        let number = this.containerCounter;
        let currentTag = tags[tags.length - 1];
      
        return(
            <div>         
                {
                    utils.isOnlyNumbers(currentTag) ? 
                    <label className="json-schema-label json-schema-label-closed" onClick={(event) => {this.toggleDisplay(this.containers[number], event) }} >
                        <span className="glyphicon glyphicon-triangle-right"></span>
                        <span className="glyphicon glyphicon-triangle-bottom"></span>
                        {`${parseInt(currentTag) + 1})`}
                    </label>
                        : 
                    <label className="json-schema-label json-schema-label-closed" onClick={(event) => {this.toggleDisplay(this.containers[number], event) }} >
                        <span className="glyphicon glyphicon-triangle-right"></span>
                        <span className="glyphicon glyphicon-triangle-bottom"></span>
                        {utils.camelCaseToNormalCase(currentTag)}
                    </label>
                }
                <div className="checkboxes-container no-display" ref={(checkbox) => this.containers[number] = checkbox }>
 
                {   
                    object.map((element, index) => {
                        //If it's a primitive, return a checkbox;
                        if(utils.isPrimitive(element)) {
                            //decide if checked=true or checked=false on the <input>
                            let isChecked = () => {
                                let checked = false;
                                let pickedCheckboxes = this.state.picked.map(element => JSON.stringify(element));
                                let path = JSON.stringify(tags.concat(element).slice(1)); //removes "Base", keeps the rest
                                if(pickedCheckboxes.indexOf(path) > -1) {
                                    checked=true;
                                }
                                return checked;
                            }
                            return <label className="json-schema-checkbox-label" key={"label" + index }>
                                        {utils.camelCaseToNormalCase(element)}
                                      
                                        <input className="json-schema-checkbox" 
                                               type="checkbox" 
                                               key={"json-schema" + index}
                                               checked={isChecked()}
                                               onChange={ (box) => {this.checkColumnHandler(tags.concat(element), box)} }
                                        />
                                   </label>
                        }
                    //Else, create a function that, when called, renders this element.
                    // Then push it to the renderLater array, so it can be rendered later.
                   
                    let fn = () => { 

                            if(JSON.stringify(Object.keys(element)) === JSON.stringify(["Items"])) {
                                //console.log("element", element);
                                let newItems = {Items: ["Cantidad", "Listado"]};

                                return Object.keys(newItems).map ((subKey, subIndex) => {
                                    return self.renderCheckboxes(newItems[subKey], tags.concat(`${subKey}`));
                                });
                            }

                            return Object.keys(element).map ((subKey, subIndex) => {
                                return self.renderCheckboxes(element[subKey], tags.concat(`${subKey}`));
                            });
                        }         
                    renderLater.push(fn);
                    })

                   
                }
                {
                    renderLater.map(element => {
                        return element();
                    })
                }
                </div>
            
            </div>
        )
        

      


    } 

    render = () => {
         // debugger
        let schemaArray = this.objectSchema;

        return(
                <div className="fixed-size-searchTab-container">
                    <h4>Filtrar columnas</h4>
                    <div className="schema-object-container">
                        {this.renderCheckboxes(schemaArray, ["Base"])}
                    </div>

                </div>
                )


    }
}

export default JSONSchemaCheckboxes;