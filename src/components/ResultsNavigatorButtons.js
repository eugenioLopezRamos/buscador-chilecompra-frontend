import React from 'react';
import {RESULTS_OFFSET_AMOUNT}  from '../constants/resultsOffset';

class ResultsNavigatorButtons extends React.Component {
    constructor(props) {
        super(props);

        this.goToPageInput = null;
        this.offset = RESULTS_OFFSET_AMOUNT;

        this.showButtonsArray = (() => {
        //return numerated pages, [0...props.pages]
            return Array.apply(null, {length: props.pages}).map((element, index) => {return index})
        })();

        this.currentPageLocation = (() => {
            //is the current page in the first half ("head") or in the second half ("tails")
            // of the array?
            let middle = parseInt(this.showButtonsArray.length/2)
            let location = "";
        // debugger

            if(props.currentPage > middle) {
                location = "tail";
            }
            if(props.currentPage <= middle) {
                location = "head";
            }

            return location;
        })();

        this.state = {
            goToValue: ""
        }





    }



    incrementOffset = () => {
     
        this.props.paginatorButtonClickHandler(this.offset);
    }

    decrementOffset = () => {
        this.props.paginatorButtonClickHandler(-this.offset);
    }

    setOffset = (times) => {
        this.props.pageButtonClickHandler(this.offset * times);
    }

    setGoToValue = (event) => {
        this.setState({goToValue: event.target.value})
    } 

    handleGoTo = () => {
        let number = this.goToPageInput.value - 1;

        if(parseInt(number) != number) {
            alert("Ingrese un número");
            return;
        }
        
        if(number > this.props.pages) {
            alert(`Ingrese un numero entre 1 y ${this.props.pages}`);
            return;
        }
        this.setState({goToValue: ""}, this.props.pageButtonClickHandler(this.offset * number));
    }
    //use in view, to DRY it up


    buttonRenderer = (element, index, array) => {
        //TODO: Explain!
            let currentPage = this.props.currentPage;

            let show = array.slice(Math.max(currentPage -4, 0), currentPage).concat(array.slice(currentPage, currentPage +4))

            if(show.length < 8 && this.currentPageLocation === "tail") {
                let toAdd = 8-show.length;

                show = array.slice(currentPage - 4 - toAdd, currentPage).concat(show)

            }

            if(show.length < 8 && this.currentPageLocation === "head") {
                let toAdd = 8-show.length;
                show = show.concat(array.slice(currentPage, currentPage + 4 + toAdd))
            }

            if(index === this.props.currentPage) {

                return <span className="page-button active" key={`page ${index}`} onClick={() => {this.setOffset(index)}}>
                        {index+1}
                </span>      


            }
          
            else if(show.includes(index)) {
               return <span className="page-button" key={`page ${index}`} onClick={() => {this.setOffset(index)}}>
                        {index+1}
                </span>        
            }
        }


    

    render = () =>  <div>
                        <div>
                            <label>Mostrar página:</label>
                            <input 
                                type="number"
                                placeholder="Pagina"
                                ref={(input) => {this.goToPageInput = input}}
                                value={this.state.goToValue}
                                onChange={(event) => {this.setGoToValue(event)}}
                            />
                            <button onClick={this.handleGoTo}>Mostrar</button>
                        </div>

                        <button onClick={this.decrementOffset} >
                            Anterior
                        </button>
                        <div style={{display: "flex", maxWidth: "100vw"} }>
                        {
                            this.showButtonsArray.map((element, index, array) => {
                                return this.buttonRenderer(element, index, array);
                            })
                        }
                        </div>
                        <button onClick={this.incrementOffset}>
                            Siguiente
                        </button>
                </div>


}

export default ResultsNavigatorButtons;



