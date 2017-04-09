import React from 'react';
import * as utils from '../utils/miscUtils';


export const CheckboxLabel = ({item, tag, id, isChecked, handler}) => (

            <label className="json-schema-checkbox-label" key={"label" + id }>
                    <span className="json-schema-checkbox-label text">
                        {utils.pascalCaseToSentenceCase(item)}
                    </span>
                
                    <input className="json-schema-checkbox" 
                        type="checkbox" 
                        key={"json-schema" + id}
                        checked={isChecked}
                        onChange={(event) => {handler(tag, event)} }
                    />
            </label>
)

export default CheckboxLabel;

