import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SelectionField = ({selected, estadosLicitacion, onChange}) => {

        const handleChange = (event) => {
            onChange(event);
        }

        let values = [];
        if(typeof estadosLicitacion != "undefined") {
            //Object format = {"suspendida": "19"}. Will look into it later if this format is still the most appropiate one (instead of {"19": "suspendida"});
            values = Object.keys(estadosLicitacion).map(nombreEstado => {
                let codigo;
                estadosLicitacion[nombreEstado] ? codigo = `${estadosLicitacion[nombreEstado]}` : codigo = "*";

                let newObject = {};
                let newKey = nombreEstado;
                newObject[newKey] = codigo;

                return newObject;

            })
        }

        const options = values.map((element, index) => {

            let key = Object.keys(element)[0];
            let value = element[key];

            return {value, key, label:`${key} (${value})` }

        });

        return (
            <div>

                    <Select
                        value={selected}
                        onChange={handleChange}
                        key="estado-licitacion-select"
                        options={options}
                        clearable={false}
                    />

            </div>
            )

}
export default SelectionField;
