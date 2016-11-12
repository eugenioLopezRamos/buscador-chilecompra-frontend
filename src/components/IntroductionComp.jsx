import React from 'react';
import SearchField from './SearchField.jsx'


class IntroductionComp extends React.Component {
    constructor(state, props) {

        super(state, props);
        this.state = {
            logged: true,
            submit: false,
        
            
        }
    }
    
    handleChange = (value) => {
        
        this.setState({searchValue: value});

    }

    showResults = (json) => {
        var parsedJSON = JSON.stringify(json);
        //console.log("json", json, "parsedJSON", parsedJSON);
      //  alert(json["hola"]);
        this.props.items(json);
    }

    render = () => {

        return (
            <div className="container">
                <h2 className="text-center">¿Qué es buscador ChileCompra?</h2>
                <br />
                <div className="text-center">Buscador Chilecompra es una app que te permite informarte fácilmente de las licitaciones que te interesan.
                <br />
                Busca, guarda, y recibe notificaciones cuando aparecen nuevas licitaciones.</div>
                <br />
                <p className="text-center">¡Intenta hacer una búsqueda!</p>

                <SearchField onChange={this.handleChange} licitaciones={this.showResults} />

            </div>
        )
        
    }

}

export default IntroductionComp;