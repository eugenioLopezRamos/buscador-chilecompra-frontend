import React from 'react';
import * as utils from '../utils/miscUtils';


const ObjectDetails = ({objectData}) => {

    const objectHandler = (object) => {
        //TODO: Add a renderLater like on JSONSchemaCheckboxes?
        return Object.keys(object).map((key, index) => {

            if(utils.isPrimitive(object[key])) {
                    if(!object[key]) {
                        return <div className="object-details-primitive" key={`object-details-primitive-${index}`}>{utils.camelCaseToPascalCase(key)}: (vacío)`</div>;
                    }
                    return <div className="object-details-primitive" key={`object-details-primitive-${index}`}>{utils.camelCaseToPascalCase(key)}: {object[key]}</div>;
            }

            return (<li className="object-details-subObject-title" key={`li-${index}`}>
                    {utils.camelCaseToPascalCase(key)}: <div key={`object-details-subobject-${index}`} className="object-details-subObject">{objectHandler(object[key])}</div>
                   </li>); 
        });
    };

    return(
        <ul key="base" className="object-details-root">
        {

            objectData.map((value, index) => {

                if(utils.isPrimitive(value)){
                        return (<div className="object-details-root-primitive" key={`primitive-base-div-${index}`}>
                                <h4>{`${index+1}) `}</h4>
                                <li key={`primitive-base-li-${index}`}>{value}</li>
                            </div>);
                }

                return (<div className="object-details-root-subObject" key={`object-base-div-${index}`}>
                        <h4 key={`object-base-h4-${index}`}>{`${index + 1}) `}</h4>
                        {objectHandler(value)}
                      </div>);

            })
        }

        </ul>
    );



};

ObjectDetails.propTypes = {
    objectData: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object])
};

export default ObjectDetails;