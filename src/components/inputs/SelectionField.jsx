import React from 'react';

const SelectionField = ({estadosLicitacion, onChange}) => {

        const handleChange = (event) => {
            onChange(event);
        }

        var values = []
        if(typeof estadosLicitacion != "undefined") {
            //Object format = {"suspendida": "19"}. Will look into it later if this format is still the most appropiate one (instead of {"19": "suspendida"});
            values = Object.keys(estadosLicitacion).map(nombreEstado => {
                let codigo;
                ["", undefined].includes(estadosLicitacion[nombreEstado]) ? codigo = "" : codigo = ` (${estadosLicitacion[nombreEstado]})`;

                let newObject = {};
                let newKey = nombreEstado;
                newObject[newKey] = nombreEstado + codigo;

                return newObject;

            })
        }

        return (
            <div>
                <select className="col-xs-12 col-md-10 col-lg-4 no-gutter" id="estadosLicitacion-select" onChange={handleChange} >
                  {
                      values.map( (e, i) => {

                          let valorKey = Object.keys(e)[0];
                          let valorTexto = e[valorKey];

                          return <option value={valorKey} key={i}>{valorTexto}</option>

                        })
                  }      
                </select>
            </div>
            )

}
export default SelectionField;
