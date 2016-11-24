import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import IntroductionComp from './IntroductionComp.jsx';
import SearchResults from './SearchResults.jsx';

class Content extends React.Component {

constructor(props, state) {
    super(props, state);

    this.state = {
        displayContent: "searchBox",
        login: state.login,
        searchValue: "",
        searchResults: [],
        organismosPublicos: { 
                                "1034640": "CORPORACION MUNICIPAL DE PEÑALOLEN PARA EL DESARROLLO SOCIAL ", 
                                "1224636": "Agencia Chilena de Eficiencia Energética", 
                                "7086": "Agencia de Cooperación Internacional de Chile - AGCI", 
                                "7193": "Agencia de Promoción de la Inversión Extranjera", 
                                "7212": "Agencia Nacional de Inteligencia", 
                                "111875": "ARMADA DE CHILE"
                            },
        estadosLicitacion: {
                                "Todos": "",
                                "Publicada": 5,
                                "Cerrada": 6,
                                "Desierta": 7,
                                "Adjudicada": 8,
                                "Revocada": 18,
                                "Suspendida": 19
                            }


    }


}

showSearchResults = (results) => {

    this.setState({searchResults: results})

}

componentDidMount = () => {

}

render = () => {

    return (
        <div> 
            <IntroductionComp  items={this.showSearchResults} organismosPublicos={this.state.organismosPublicos} estadosLicitacion={this.state.estadosLicitacion} />
            <SearchResults items={this.state.searchResults} estadosLicitacion={this.state.estadosLicitacion} />
        </div>
        )

    
}



}

Content.propTypes = {
    login: PropTypes.bool.isRequired
}

module.exports = Content;