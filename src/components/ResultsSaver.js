import React from 'react';
import Modal from './inputs/Modal.jsx';
import Flash from './Flash.jsx';

class ResultsSaver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      showModal: {show: false, type: "search"},
                      enteredSearchName: "",
                      enteredResultName: ""
                     }
    }
    
    onSearchNameInput = (event) => {
        this.setState({enteredSearchName: event.target.value});
    }

    onResultNameInput = (event) => {
        this.setState({enteredResultName: event.target.value});
    }

    handleSearches = () => {
        this.setState({showModal: {show: false}})
        this.props.handleSearches(this.state.enteredSearchName)
    }

    handleResults = () => {
        this.setState({showModal: {show: false}})
        this.props.handleResults(this.state.enteredResultName)        
    }

    showModal = (type) => {
        this.setState({showModal: {show: true, type}});
    }

    hideModal = () => {
        this.setState({showModal: {show: false}});
    }

    render = () => {
        return (
            <div className="col-xs-12 no-gutter save-search-buttons">
                <Modal 
                    isModalShown={this.state.showModal.show} 
                    handler={this.state.showModal.type === "search" ? this.handleSearches : this.handleResults }
                    hideModal={this.hideModal}
                    onInput={this.state.showModal.type === "search" ? this.onSearchNameInput : this.onResultNameInput }
                />
                <button type="button" className="btn btn-primary col-xs-6 col-md-4 col-md-offset-2 allow-wrap" onClick={() => {this.showModal("search")}}>Guardar parámetros de búsqueda (TBI)</button>
                <button type="button" className="btn btn-primary col-xs-6 col-md-4 allow-wrap" onClick={() => {this.showModal("result")}}>Guardar resultado de búsqueda (TBI)</button>
            </div>
            )
    }

}

export default ResultsSaver;