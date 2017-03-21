import React from 'react';
import ResultComparerPrimitive from './ResultComparerPrimitive';
import ResultComparerPOJO from './ResultComparerPOJO';
import ResultComparerArray from './ResultComparerArray';
import * as utils from '../../utils/miscUtils';

const ResultComparerObjectRenderer = (props) => {
    // //props {
    //     handleToggleOpen: fn(),
    //     object: {},
    //     keyName: "string",
    // }


    let renderLater = [];

    let counter = 0;


        //Could do this with a switch too, maybe it would be more readable?
        //IF OBJECT IS A PRIMITIVE
        if(utils.isPrimitive(props.object)) {
            //simply render key : value in spans
            return <ResultComparerPrimitive
                    key={`primitive${counter + 1000* Math.random()}`}
                    keyName={props.keyName}
                    value={props.object}
                    />
        }
        
        // IF OBJECT IS AN ARRAY
        if(utils.isArray(props.object)) {
            //We wont have a wrapper div around the items of the array,
            //since those will be handled either by isPOJO or isPrimitive
            // so we need to skip 1 on the counter, hence +2;
            counter = counter + 2;
            let number = counter;

            return <ResultComparerArray
                                    key={`array${number}`}
                                    number={number}
                                    keyName={props.keyName}
                                    toggleOpen={props.handleToggleOpen}
                                    object={props.object}
                                    renderer={ResultComparerObjectRenderer}
                                />

        }
        //IF OBJECT IS A POJO
        if(utils.isPOJO(props.object)) {
            counter++
            let number = counter;
            //Same as above, container with a clickable span with the object's name (keyName) for toggling display and a <div> that contains the object's data.
            return <ResultComparerPOJO 
                                    key={`pojo-${number}`}
                                    number={number}
                                    keyName={props.keyName}
                                    toggleOpen={props.handleToggleOpen}
                                    object={props.object}
                                    renderer={ResultComparerObjectRenderer}
                     />
                            


        }
  

  


}

export default ResultComparerObjectRenderer;