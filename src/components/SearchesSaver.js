import React, {PropTypes} from 'react';
import Modal from './inputs/Modal.jsx';
//import Flash from './Flash.jsx';

class SearchesSaver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      showModal: false,
                      enteredSearchName: "",
                     };
    }
    
    onSearchNameInput = (event) => {
        this.setState({enteredSearchName: event.target.value});
    }

    handleSearches = () => {

        this.setState({showModal: false, enteredSearchName: ""});
        this.props.handleSearches(this.state.enteredSearchName);
    }

    showModal = () => {
        this.setState({showModal: true});
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    render = () => {
        return (
            <div className="col-xs-12 no-gutter save-search-buttons">
                <Modal 
                    isModalShown={this.state.showModal} 
                    modalValue={this.state.enteredSearchName}
                    handler={this.handleSearches}
                    hideModal={this.hideModal}
                    onInput={this.onSearchNameInput}
                />
                <button 
                    type="button"
                    className="btn btn-primary col-xs-6 col-md-4 col-xs-offset-3 col-md-offset-4 allow-wrap" 
                    onClick={this.showModal}>
                    Guardar parámetros de búsqueda
                </button>

            </div>
            );
    }
}

SearchesSaver.propTypes = {
    handleSearches: PropTypes.func.isRequired
};

export default SearchesSaver;