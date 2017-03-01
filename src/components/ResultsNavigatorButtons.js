import React from 'react';
import {RESULTS_OFFSET_AMOUNT}  from '../constants/resultsOffset';

const ResultsNavigatorButtons = (props) => {
 
    const offset = RESULTS_OFFSET_AMOUNT;
    let goToPageInput = "";

    const incrementOffset = () => {
     
        props.paginatorButtonClickHandler(offset);
    }

    const decrementOffset = () => {
        props.paginatorButtonClickHandler(-offset);
    }

    const setOffset = (times) => {
        props.pageButtonClickHandler(offset * times);
    }

    const handleGoTo = () => {
        let number = goToPageInput.value - 1;
        goToPageInput.value = "";

        if(parseInt(number) != number) {

            //TODO: Change alert into html
            alert("Ingrese un número");
            return;
        }
        
        if(number > props.pages) {
            alert(`Ingrese un numero entre 1 y ${props.pages}`);
            return;
        }
       
        props.pageButtonClickHandler(offset * number)
        
    }

    const showButtonsArray = (() => {
        //return numerated pages, [0...props.pages]
        return Array.apply(null, {length: props.pages}).map((element, index) => {return index})
    })()

    const currentPageLocation = (() => {
        //is the current page in the first half ("head") or in the second half ("tails")
        // of the array?
        let middle = parseInt(showButtonsArray.length/2)
        let location = "";
       // debugger

        if(props.currentPage > middle) {
            location = "tail";
        }
        if(props.currentPage <= middle) {
            location = "head";
        }

        return location;
    })()


    const buttonRenderer = (element, index, array) => {
        //TODO: Explain!
            let currentPage = props.currentPage;

            let show = showButtonsArray.slice(Math.max(currentPage -4, 0), currentPage).concat(showButtonsArray.slice(currentPage, currentPage +4))

            if(show.length < 8 && currentPageLocation === "tail") {
                let toAdd = 8-show.length;

                show = showButtonsArray.slice(currentPage - 4 - toAdd, currentPage).concat(show)

            }

            if(show.length < 8 && currentPageLocation === "head") {
                let toAdd = 8-show.length;
                show = show.concat(showButtonsArray.slice(currentPage, currentPage + 4 + toAdd))
            }

            if(index === props.currentPage) {

                return <button className="page-button active" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                        {index+1}
                       </button>      


            }
          
            else if(show.includes(index)) {
               return <button className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                        {index+1}
                      </button>        
            }
        }


    return <div className="results-navigator-buttons-container">
    
                <div className="page-picker-container">
                    <label className="show-page">Mostrar página:</label>
                    <div className="inputs">
                        <input 
                            type="number"
                            min="1"
                            max={props.pages}
                            placeholder="Página"
                            defaultValue={null}
                            ref={(input) => {goToPageInput = input}}
                            onChange={(event) => {goToPageInput = event.target}}
                        />
                        <span className="page-picker-text">
                            de {props.pages}
                        </span>
                        <button className="go-to-result-button" onClick={handleGoTo}>Ir</button>
                    </div>
                    
                </div>

                <div className="page-select-buttons-container">
                    <button className="page-button prev-next" onClick={decrementOffset} >
                        {"<<"}
                    </button>

                    <div className="page-select-buttons" style={{display: "flex", maxWidth: "100vw"} }>
                    {
                        Array.apply(null, {length: props.pages}).map((element, index, array) => {
                            return buttonRenderer(element, index, array);
                        })
                    }
                    </div>

                    <button className="page-button prev-next" onClick={incrementOffset}>
                        {">>"}
                    </button>
                </div>
           </div>


}

export default ResultsNavigatorButtons;



