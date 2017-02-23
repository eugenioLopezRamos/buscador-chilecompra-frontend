import React from 'react';

const SelectionField = ({estadosLicitacion, onChange}) => {

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

        return (
            <div>
                <select className="col-xs-12 col-md-10 col-lg-4 no-gutter" onChange={handleChange} >
                  {
                      values.map((value, index) => {
                        
                          let valorKey = Object.keys(value)[0];
                          let valorTexto = value[valorKey];
                          return <option value={valorTexto} key={index}>{`${valorKey} (${valorTexto})`}</option>

                        })
                  }      
                </select>
            </div>
            )

}
export default SelectionField;
