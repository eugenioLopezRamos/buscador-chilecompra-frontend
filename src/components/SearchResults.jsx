import React from 'react';

class SearchResults extends React.Component {

    constructor(props, state) {
        
        super(props, state);
    }

    render = () => {

        let listado = "";
       console.log(this.props.items);
        let resultsArray = [];

        Object.keys(this.props.items).forEach( key => {
            if(key === "Listado") {
                this.props.items[key].map ( (e, i, arr) => {
                    let assignedKey = i + 1;
                    resultsArray.push( {key: assignedKey, Nombre: e.Nombre})
                })
            }
        })
        return (<ul>{
                resultsArray.map(e => {
                    return <li key={e.key}>{e.Nombre}</li>
                })
                }</ul>)
    }
}

export default SearchResults;
            
          /*  this.props.items.map((el, i, array) => {
            console.log("prop", this.props.items);
               let number = i + 1;

               return <li key={number} className={"search-results"}>{el}</li>  


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
