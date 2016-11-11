import React from 'react';



class SearchBox extends React.Component {
    constructor(state, props) {
        super(state, props);
        this.state = {
            logged: true,
            submit: false
        }
    }
    
    handleChange = (e) => {

        this.setState({searchValue: e.target.value});

    }

    handleSubmit = (e) => {
        
        this.setState({submit: true});
        this.props.callbackParent(this.state);
        this.setState({submit: false});

    }
    render = () => {

        return (
            <div className="container">
                <h2 className="text-center">¿Qué es buscador Chilecompra?</h2>
                <br />
                <div className="text-center">Buscador Chilecompra es una app que te permite informarte fácilmente de las licitaciones que te interesan.
                Buscar, guarda, y recibe notificaciones cuando aparecen nuevas licitaciones.</div>
                <br />
                <p className="text-center">¡Intenta hacer una búsqueda!</p>

                <input className="col-xs-10 col-md-7 col-md-offset-2 col-lg-5 col-lg-offset-3" type="search" onChange={this.handleChange}/>

                <button className="align-right" type="submit" onSubmit={this.handleSubmit} >
                    <span className="glyphicon glyphicon-search"></span>
                </button>

            </div>
        )
        
    }

}

export default SearchBox;