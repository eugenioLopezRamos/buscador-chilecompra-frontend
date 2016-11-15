import React from 'react';

class SearchResults extends React.Component {

    constructor(props, state) {
        
        super(props, state);
    }

    render = () => {

        let listado = "";
       console.log(this.props.items);
        let resultsArray = [];
        let extCodesArray = [];
        let codigoEstadoArray = [];

        Object.keys(this.props.items).forEach( key => {
            if(key === "Listado") {
                this.props.items[key].map ( (e, i, arr) => {
                    let assignedKey = i + 1;
                    resultsArray.push( {key: assignedKey, Nombre: e.Nombre});
                    extCodesArray.push( {key: assignedKey, CodigoExterno: e.CodigoExterno } );
                    codigoEstadoArray.push({ key: assignedKey, CodigoEstado: e.CodigoEstado} );
                })
            }

        })
        return (<ul>{
                resultsArray.map( (e, i) => {
                    return <li className="search-results" key={e.key}>

                                <span className="search nombre" key={"nombre key" + e.key} >
                                    {e.Nombre}
                                </span>

                                <span className="search codigo-externo" key={"codigoExterno key " + extCodesArray[i].key} >
                                    {extCodesArray[i].CodigoExterno}
                                </span>

                                <span className="search codigo-estado" key={"codigoEstado key " + codigoEstadoArray[i].key} >
                                    {codigoEstadoArray[i].CodigoEstado}
                                </span>

                          </li>
                })
                }</ul>)
    }
}

export default SearchResults;
            
          /*  this.props.items.map((el, i, array) => {
            console.log("prop", this.props.items);
               let number = i + 1;

               return <li key={number} className={"search-results"}>{el}</li>  



            if(key === "CodigoExterno") {
                this.props.items[key].map (e => {
                    let assignedKey = i + 1;
                    extCodesArray.push({ key: assignedKey, CodigoExterno: e.CodigoExterno });
                });
            }

            if(key === "CodigoEstado") {
                this.props.items[key].map (e => {
                    let assignedKey = i + 1;
                    codigoEstadoArray.push({ key: assignedKey, CodigoEstado: e.CodigoEstado });
                })
            }

##############################################
##############################################
##############################################
            var response = JSON.parse(xhr.responseText);
                var responseKeys = Object.keys(response);

                responseKeys.forEach(function (key) {

                    if (key === "fields") {

                        var innerJSON = Object.keys(response[key]);

                        innerJSON.forEach(function (innerKey) {

                            document.getElementById(innerKey).innerHTML = response[key][innerKey];

                        });

                    }

            })
            
                   Object.keys(this.props.items).forEach(function(key) {
                if(key === "Listado") {
                    console.log("key", key);
                    Object.keys(key).forEach( nombre => {return <li>{nombre}</li>})
                }
                

            })
     
            
            
            
            
            
            
            */
