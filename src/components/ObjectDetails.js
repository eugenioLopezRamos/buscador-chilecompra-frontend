import React from 'react';
import * as utils from '../utils/miscUtils';


const ObjectDetails = ({objectData}) => {
    console.log("PROPS", objectData);
    return(
        <ul>
        {

        Object.values(objectData).map((value, index) => {

            if(utils.isPrimitive(value)){
                return <li>{value}</li>
            }
            return <h1>{Object.keys(objectData)[index]}</h1>

        })

        }

        </ul>
    )



}

export default ObjectDetails;