import React from 'react';
import * as utils from '../utils/miscUtils';
import objectAssign from 'object-assign';

class JSONSchemaCheckboxes extends React.Component {
    //props: {schema: {...}}
    constructor(props) {
        super(props);
        this.state = {
            picked: []
        }
        this.objectSchema = (() => {
      
        return this.props.results.reduce((prev, currentResult) => {
            let newSchema = utils.getObjectSchema(currentResult.value);
            //TODO: REFACTOR THIS, way too complicated to understand
            //  In short, since objectAssign shallow merges, deep merge that specific key ("Adjudicacion")

            let prevAdjudicacionValue;

            try {prevAdjudicacionValue = prev[0]["Listado"][0][0][21]["Adjudicacion"]}
            catch(error) {prevAdjudicacionValue = []}

            let currentAdjudicacionValue = newSchema[0]["Listado"][0][0][21]["Adjudicacion"];
            if(JSON.stringify(prevAdjudicacionValue) === JSON.stringify(currentAdjudicacionValue)) {
                return objectAssign(prev, newSchema)
            }
            newSchema[0]["Listado"][0][0][21] = {Adjudicacion: objectAssign(prevAdjudicacionValue, currentAdjudicacionValue) }

            return objectAssign(prev, newSchema);

        }, []) || null;

        })();

        this.containerCounter = 0;
        this.containers = new Array;
    }



    toggleDisplay = (target) => {
        let display = getComputedStyle(target).display;
       // console.log("display", display, "target", target);
        if(display === "none") {
            target.className = "checkboxes-container";
        }else {
            target.className = "checkboxes-container no-display";
        }
    }



    checkColumnHandler = (target, event) => {
        let saveValue = target.slice(1);
        let newPicked = this.state.picked.slice();
       //create a new copy of the object.

       if(event.target.checked) {
            
            newPicked.push(saveValue);
            this.setState({picked: newPicked});
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
            this.setState({picked: newPicked});
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

        //the tag to use on the label
        let currentTag = tags[tags.length - 1];
        // try {console.log(object.map(element => {return element}))}
        // catch(error) {debugger}
        //make parentTag an array, and in the <label> render only the last one (but keep all for reference)
        return(
            <div>         
                {
                    utils.isOnlyNumbers(currentTag) ? 
                    <label className="json-schema-label" onClick={ () => {this.toggleDisplay(this.containers[number]) }} >
                        {`${parseInt(currentTag) + 1})`}
                    </label>
                        : 
                    <label className="json-schema-label" onClick={ () => {this.toggleDisplay(this.containers[number]) }} >
                        {currentTag}
                    </label>
                }
                <div className="checkboxes-container no-display" ref={(checkbox) => this.containers[number] = checkbox }>
 
                {   
                   

                    object.map((element, index) => {
                        //If it's a primitive, return a checkbox;
                        if(utils.isPrimitive(element)) {
                        
                            return <label className="json-schema-checkbox-label" key={"label" + index }>
                                    {element}
                                        <input className="json-schema-checkbox" 
                                               type="checkbox" 
                                               key={"json-schema" + index}
                                               onChange={ (box) => {this.checkColumnHandler(tags.concat(element), box)} }
                                        />
                                   </label>
                        }
                    //Else, create a function that, when called, renders this element.
                    // Then push it to the renderLater array, so it can be rendered later.
                    let fn = () => { 
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
                    <div className="schema-object-container">
                        <div className="filter-columns-container">
                            <button 
                                className="btn btn-primary col-xs-6 col-md-4 col-xs-offset-3 col-md-offset-4"
                                onClick={this.applyColumnsChange}
                            >
                            Filtrar columnas
                            </button>
                        </div>
                        {this.renderCheckboxes(schemaArray, ["Base"])}
                    </div>

                </div>
                )


    }
}

export default JSONSchemaCheckboxes;