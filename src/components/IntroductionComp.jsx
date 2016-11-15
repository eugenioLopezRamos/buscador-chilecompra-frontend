import React from 'react';
import InputFieldsContainer from './InputFieldsContainer'


class IntroductionComp extends React.Component {
    constructor(state, props) {

        super(state, props);
        this.state = {

            logged: true,
            submit: false,
            
        }
    }

    componentWillMount = () => {


    /*    var self = this;
        fetch("/get_misc_info" + "?info=" + this.props.choices, {accept: 'application/json', contentType: 'application/json'})
            .then(function(response) { return response.json()})
            .then(function(response) {
                console.log("RESP", response);
                self.setState({choices: response, value: self.state.choices[0]});
                }) */

    }

    handleSubmit = (data) => {
        console.log("THE FOLLOWING DATA WILL BE SENT TO THE SERVER", data);
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

                <InputFieldsContainer organismosPublicos={this.props.organismosPublicos} estadosLicitacion={this.props.estadosLicitacion} onSubmit={this.handleSubmit} />
                
            </div>
        )
        
    }

}

export default IntroductionComp;