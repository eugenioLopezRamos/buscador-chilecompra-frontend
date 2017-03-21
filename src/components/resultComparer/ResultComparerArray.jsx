import React from 'react';
import ResultComparerTitle from './ResultComparerTitle';

export const ResultComparerArray = (props) => {
    let containers = [];
    //Arrays contain data, which we can toggle to show, thus we need to have refs
    // to target them with this.toggleOpen
    //We make a container for the array then iterate over its data with renderValues

    const refFn = (element) => {containers.push(element)};
    const toggleOpenFn = (event) => {props.toggleOpen(event, containers[containers.length - 1])}
    
    return (<div className="object-data-container type-array" key={props.number}>
               
                    <ResultComparerTitle 
                        keyName={props.keyName}
                        type="array"
                        handler={toggleOpenFn}
                
                    />
        
                <div className="object-container display-flex type-array" ref={refFn} key={`object-containerArray${props.number}`}>
                {
                    Object.keys(props.object).map((currentKey) => {

                        let keyName = null;

                        if(Object.keys(props.object).length > 1) {
                            keyName = `${parseInt(currentKey,10) + 1})`;
                        }
                        return <props.renderer
                                 object={props.object[currentKey]}
                                 keyName={keyName} 
                                 key={`ResultComparerObjectRenderer${currentKey}`}
                                 handleToggleOpen={props.toggleOpen}                              
                               />;
                    })
                }
                </div>
            </div>)
}

export default ResultComparerArray;