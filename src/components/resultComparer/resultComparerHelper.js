import React from 'react';
import * as utils from '../../utils/miscUtils';

export const netDifferencesRenderer = (netDifferences, renderer) => {

    let renderLaterDifferences = [];
    console.log("ARETHERE", netDifferences, "RENDER", renderer);
    if(!netDifferences.value) {
        return null;
    }
    if(netDifferences.value) {
        return netDifferences.differences
                .map((currentResult, index) => {
                    if(!netDifferences.differences[index]) {
                        return null;
                    }
                    return <div className="single-difference-container" key={`single-difference-container${index}`}>
                      
                            {
                          
                                Object.keys(currentResult).map((currentKey, index) => {
                                    let elementReturner = () => renderer(currentResult, currentKey)
                                    console.log("element", elementReturner())
                                    return (
                                            <div className="difference-item" key={`single-difference${index}`}>
                                                {
                                                utils.isPrimitive(currentResult[currentKey]) ?
                                                    renderLaterDifferences.push(elementReturner) && null
                                                    :
                                                    elementReturner()
                                                }
                                            </div>
                                            );
                                })
                            
                            }
                   
                       
                                {renderLaterDifferences.map(elementReturner => elementReturner())}
                     
                                   
                            </div>
                            
                })
    }
    else {
        return <div className="single-difference-container">Sin variaciones</div>;
    }

}




export const areThereDifferences = (thisValue) => {
                                    //Consider no differences if the only thing that was modified was FechaCreacion
                                    let toIgnore = JSON.stringify(["FechaCreacion"]);
                                    let netDifferencesArray = thisValue.differences().reduce((accumulator, element) => {

                                        let stringifiedValue = JSON.stringify(Object.keys(element));
                                    
                                        if(stringifiedValue === toIgnore) {
                                            return accumulator;
                                        }else {
                                            accumulator.push(element);
                                            return accumulator;
                                        }
                                        
                                    }, [])

                                    let unignoredDifferencesAmount = netDifferencesArray.length;

                                    if(unignoredDifferencesAmount === 0) {
                                        return {
                                            value: false
                                        }
                                    }
                                    return {
                                        value: true,
                                        differences: netDifferencesArray
                                    }

                                };