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



    handleSubmit = (data) => {
       // console.log("THE FOLLOWING DATA WILL BE SENT TO THE SERVER", data); //is going to be put in InputFieldsContainer since thats the comp that should
       //be reused on all views with search functionality

       this.props.items(data);
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

                <InputFieldsContainer 
                    organismosPublicos={this.props.organismosPublicos} 
                    estadosLicitacion={this.props.estadosLicitacion} 
                    onSubmit={this.handleSubmit}
                 />
                
            </div>
        )
           
    }

}

export default IntroductionComp;