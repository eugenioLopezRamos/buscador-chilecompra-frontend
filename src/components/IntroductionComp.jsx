import React from 'react';
import SearchField from './SearchField.jsx'


class IntroductionComp extends React.Component {
    constructor(state, props) {
        super(state, props);
        this.state = {
            logged: true,
            submit: false,
            searchValue: "¿Qué es ChileCompra?"
        }
    }
    
    handleChange = (value) => {

        this.setState({searchValue: value});

    }

    render = () => {

        return (
            <div className="container">
                <h2 className="text-center">{this.state.searchValue}</h2>
                <br />
                <div className="text-center">Buscador Chilecompra es una app que te permite informarte fácilmente de las licitaciones que te interesan.
                Busca, guarda, y recibe notificaciones cuando aparecen nuevas licitaciones.</div>
                <br />
                <p className="text-center">¡Intenta hacer una búsqueda!</p>

                <SearchField onChange={this.handleChange} />

            </div>
        )
        
    }

}

export default IntroductionComp;