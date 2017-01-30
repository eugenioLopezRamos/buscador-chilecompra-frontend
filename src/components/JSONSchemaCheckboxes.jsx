import React from 'react';
import * as utils from '../utils/miscUtils';
import objectAssign from 'object-assign';
import {chileCompraResponseExample} from '../utils/objectSchemaExamples'

class JSONSchemaCheckboxes extends React.Component {
    //props: {schema: {...}}
    constructor(props) {
        super(props);
        this.state = {
            picked: [
                        ["FechaCreacion"],
                        ["Listado", "0", "Nombre"],
                        ["Listado", "0", "CodigoEstado"],
                        ["Listado", "0", "CodigoExterno"],
            ]
        }
        this.objectSchema = (() => {
    
            return utils.getObjectSchema(chileCompraResponseExample)
        // return this.props.results.reduce((prev, currentResult) => {
        //     let newSchema = utils.getObjectSchema(currentResult.value);
        //     //TODO: REFACTOR THIS, way too complicated to understand
        //     //  In short, since objectAssign shallow merges, deep merge that specific key ("Adjudicacion")

        //     let prevAdjudicacionValue;

        //     try {prevAdjudicacionValue = prev[0]["Listado"][0][0][21]["Adjudicacion"]}
        //     catch(error) {prevAdjudicacionValue = []}

        //     let currentAdjudicacionValue = newSchema[0]["Listado"][0][0][21]["Adjudicacion"];
        //     if(JSON.stringify(prevAdjudicacionValue) === JSON.stringify(currentAdjudicacionValue)) {
        //         return objectAssign(prev, newSchema)
        //     }
        //     newSchema[0]["Listado"][0][0][21] = {Adjudicacion: objectAssign(prevAdjudicacionValue, currentAdjudicacionValue) }

        //     return objectAssign(prev, newSchema);

        // }, []) || null;

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

        //make parentTag an array, and in the <label> render only the last one (but keep all for reference)
      
        return(
            <div>         
                {
                    utils.isOnlyNumbers(currentTag) ? 
                    <label className="json-schema-label" onClick={() => {this.toggleDisplay(this.containers[number]) }} >
                        {`${parseInt(currentTag) + 1})`}
                    </label>
                        : 
                    <label className="json-schema-label" onClick={() => {this.toggleDisplay(this.containers[number]) }} >
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

                        //Dejar listado como un solo item (un solo checkbox) y con eso despues renderearlo en el
                        //searchResults como un link (o bien como un popup similar a los del perfil)

                            //TODO: esto eliminaria "Items" y lo dejaria como link, q es mas apropiado xq el numero de Items
                            // cambia en cada Objeto
                        //    if(Object.keys(element).indexOf("Items") > -1) {
                            
                        //     return Object.values(element["Items"]).map((subKey, subIndex) => {
                        //        // return Object.keys(subKey).map((itemValue, itemIndex, array) => {
                        //        //     debugger
                             
                        //             if(subKey === "Cantidad") {
                        //                 return <div>
                        //                             <label className="json-schema-label" onClick={() => {this.toggleDisplay(this.containers[number]) }} >
                        //                                 {currentTag}
                        //                             </label>
                        //                             <label className="json-schema-checkbox-label" key={"label" + subIndex }>
                        //                                 {subKey}
                        //                                 <input className="json-schema-checkbox" 
                        //                                     type="checkbox" 
                        //                                     key={"json-schema" + subIndex}
                                                            
                        //                                     onChange={ (box) => {this.checkColumnHandler(tags.concat(subKey), box)} }
                        //                                 />
                        //                             </label>
                        //                         </div>
                        //             }
                        //               debugger
                        //             return Object.keys(subKey).map(object => {
                        //                 return <a href="#">{object}</a>
                        //             })
                        //        // }) 
                        //     });
                        //    }
                            if(JSON.stringify(Object.keys(element)) === JSON.stringify(["Items"])) {
                                console.log("element", element);
                                let newItems = {Items: ["Cantidad", "Listado"]};
                                // newItems["Items"] = {};
                                // newItems["Items"]["Cantidad"] = "Cantidad";
                                // newItems["Items"]["Listado"] = "Listado Items";
                                //let shallowItems = objectAssign({}, element["Items"], element["Items"]["Listado"] = "Listado Items");

                                //debugger
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