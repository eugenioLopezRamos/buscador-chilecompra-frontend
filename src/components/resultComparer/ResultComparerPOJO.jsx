import React from 'react';
import ResultComparerTitle from './ResultComparerTitle';
import * as utils from '../../utils/miscUtils';

const ResultComparerPOJO = (props) => {
    let containers = [];
    let renderLater = []

    const refFn = (element) => {containers.push(element)};
    const toggleOpenFn = (event) => {props.toggleOpen(event, containers[containers.length - 1])}
    
    return (
    
            <div className="object-data-container type-pojo" key={props.number}>        
              
                    <ResultComparerTitle 
                        keyName={props.keyName}
                        type="array"
                        handler={toggleOpenFn}
                    />

              
                <div className="object-container display-flex type-pojo" ref={refFn} key={`object-containerObject${props.number}`}>
                {
                    Object.keys(props.object).map((currentKey) => {
                        let keys = Object.keys(props.object);

                        let keyName = currentKey;
                        //if keyname is an int, turn it from zero indexed to 1 indexed => "add one"
                         //   debugger
                        if(parseInt(keyName) == keyName) {
                            keyName = `${parseInt(keyName) + 1})`;
                            if(keys.length === 1) {
                                keyName = null;
                            }
                        }
                    
                        let element = <props.renderer
                                            object={props.object[currentKey]}
                                            keyName={keyName} 
                                            key={`ResultComparerObjectRenderer${currentKey}`}
                                            handleToggleOpen={props.toggleOpen}                              
                                        />;
                        let elementReturner = () => (element);

                        return utils.isPrimitive(props.object[currentKey]) ? 
                            renderLater.push(elementReturner) && null         
                            :
                            element;
                    })
                }
                {
                    renderLater.map(elementReturner => elementReturner())
                }
                </div>
            </div>)

}

export default ResultComparerPOJO;