import React from 'react';
import SearchField from './SearchField.jsx'
import SelectionField from './SelectionField.jsx'

class IntroductionComp extends React.Component {
    constructor(state, props) {

        super(state, props);
        this.state = {
            logged: true,
            submit: false,
            active: 1
            
        }
    }
    
    handleChange = (value) => {
        
        this.setState({searchValue: value});

    }

    showResults = (licitaciones) => {
        this.props.items(licitaciones);
    }

    handleSelectionChange = (value) => {

        this.setState({active: value})

    }

    componentDidUpdate = () => {

       console.log(this.state.active);

     }

// In this case im gonna have a lot of <SelectionField /> with props that will be the fields that the chilecompra API allows you to query
// then all of these will be sent to the rails API server when clicking the searchButton on <SearchField />. The returned JSON from the Rails API
// will then be presented in <SearchResults />

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

                <SelectionField active={this.state.active} onSelectionChange={this.handleSelectionChange} />
                
                <SearchField onChange={this.handleChange} licitaciones={this.showResults} />

            </div>
        )
        
    }

}

export default IntroductionComp;