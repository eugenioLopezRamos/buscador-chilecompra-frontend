import React from 'react';
import * as utils from '../utils/miscUtils';
import objectAssign from 'object-assign';
import {chileCompraResponseExample} from '../utils/objectSchemaExamples'
import {RESULTS_INITIAL_CHECKBOXES} from '../constants/resultsInitialCheckboxes';
import CheckboxLabel from './CheckboxLabel.jsx';


class JSONSchemaCheckboxes extends React.Component {
    //props: {schema: {...}}
    constructor(props) {
        super(props);

        this.state = {
            picked: RESULTS_INITIAL_CHECKBOXES
        }

        this.objectSchema = utils.getObjectSchema(chileCompraResponseExample);

        this.containerCounter = 0;
        this.containers = new Array;
        this.tags = [];

    }



    toggleDisplay = (target, event) => {
  
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

     //decide if checked=true or checked=false on the <input>
    isChecked = (fullTag) => {
        let checked = false;

        let path = JSON.stringify(fullTag.slice(1)); //removes "Base", keeps the rest
        let pickedCheckboxes = this.state.picked.map(element => JSON.stringify(element));
        if(pickedCheckboxes.indexOf(path) > -1) {
            checked=true;
        }
        return checked;
    }

    checkColumnHandler = (tag, event) => {
        // saveValue => the "tag" excluding the 0th element ("Base") which is only cosmetic
        let saveValue = tag.slice(1);
        // makes a copy of the state.picked property
        let newPicked = this.state.picked.slice();
       //create a new copy of the object.
       
       // if event.target.checked is true, it means that IT WAS
       // unchecked (since the event fires onChange => it changed from !checked to checked)
       if(event.target.checked) {
            
            newPicked.push(saveValue);
            this.setState({picked: newPicked}, this.props.changeColumns(newPicked));
       }
       else {
           //if it was checked => !checked then remove the tag
            let splicedArray = utils.removeArrayFromArray(saveValue, newPicked);
            this.setState({picked: splicedArray}, this.props.changeColumns(splicedArray));
       }

    }

    renderCheckboxes = (object, tags) => {
        let self = this;
        //keep each array of tags as an instance variable so they can be tested...
        this.tags.push(tags);
        //renders non primitves at the end (looks cleaner)
        let renderLater = new Array;

        //used as id for each container to be ref'd on the <label onClick> handler
        this.containerCounter++;

        //the current value of the counter
        let number = this.containerCounter;

        let currentTag = tags[tags.length - 1];
        
        let currentTagString = utils.isOnlyNumbers(currentTag) ? `${parseInt(currentTag) + 1})` : utils.camelCaseToPascalCase(currentTag);

        return(
            <div>         
                {
                    <label className="json-schema-label json-schema-label-closed" onClick={(event) => {this.toggleDisplay(this.containers[number], event) }} >
                        <span className="glyphicon glyphicon-triangle-right"></span>
                        <span className="glyphicon glyphicon-triangle-bottom"></span>
                        {currentTagString}
                    </label>
                }
                <div className="checkboxes-container no-display" ref={(checkbox) => this.containers[number] = checkbox }>
                    <div className="labels-container">
                        {   
                            object.map((element, index) => {
                                //If it's a primitive, return a checkbox;
                                if(utils.isPrimitive(element)) {
                                    let fullTag = tags.concat(element);
                                    let isChecked = this.isChecked(fullTag);
                                    //adds to the instance var tags - Used for testing only.
                                    this.tags.push(fullTag);
                                    return <CheckboxLabel 
                                                key={"checkboxlabel"+ index}
                                                item={element}
                                                tag={fullTag}
                                                id={index}
                                                isChecked={isChecked}
                                                handler={this.checkColumnHandler} 
                                            />
                                }
                            
                            //Else, create a function that, when called, renders this element.
                            // Then push it to the renderLater array, so it can be rendered later.
                        
                                let fn = () => { 

                                        if(JSON.stringify(Object.keys(element)) === JSON.stringify(["Items"])) {
                                            //Since this is a special case,values are hardcoded
                                            let newItems = {Items: ["Cantidad", "Listado"]};

                                            return Object.keys(newItems).map ((subKey, subIndex) => {
                                                return self.renderCheckboxes(newItems[subKey], tags.concat(`${subKey}`));
                                            });
                                        }

                                        return Object.keys(element).map ((subKey, subIndex) => {
                                            return self.renderCheckboxes(element[subKey], tags.concat(`${subKey}`));
                                        });
                                    };

                            renderLater.push(fn);
                            })

                        
                        }
                        </div>
                        
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

        return(
                <div className="json-schema-checkboxes-container">
                    <h4>Filtrar columnas</h4>
                    <div className="schema-object-container">
                        {this.renderCheckboxes(this.objectSchema, ["Base"])}
                    </div>

                </div>
                )


    }
}

export default JSONSchemaCheckboxes;