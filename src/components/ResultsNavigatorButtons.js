import React from 'react';
import {RESULTS_OFFSET_AMOUNT}  from '../constants/resultsOffset';

const ResultsNavigatorButtons = (props) => {
 
    const offset = RESULTS_OFFSET_AMOUNT;

    const incrementOffset = () => {
     
        props.paginatorButtonClickHandler(offset);
    }

    const decrementOffset = () => {
        props.paginatorButtonClickHandler(-offset);
    }

    const setOffset = (times) => {
        props.pageButtonClickHandler(offset * times);
    }

    const getActivePage = (index) => {
        if(index + 1 === props.currentPage) {
            return "page-button active";
        } 
        return "page-button";
    }

    const showButtonsArray = (() => {
        //return numerated pages, [0...props.pages]
        return Array.apply(null, {length: props.pages}).map((element, index) => {return index})
    })()

    const currentPageLocation = (() => {

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

                return <span className="page-button active" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                        {index+1}
                </span>      


            }
          
            else if(show.includes(index)) {
               return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                        {index+1}
                </span>        
            }
        }



    return <div>
                <div>
                    <label>Mostrar página:</label>
                    <input 
                        type="input"
                        placeholder="Pagina"
                    />
                    <button>Mostrar</button>
                </div>

                <button onClick={decrementOffset} >
                    Anterior
                </button>
                <div style={{display: "flex", maxWidth: "100vw"} }>
                   {
                    Array.apply(null, {length: props.pages}).map((element, index, array) => {
                        return buttonRenderer(element, index, array);
                    })
                   }
                </div>
                <button onClick={incrementOffset}>
                    Siguiente
                </button>
           </div>


}

export default ResultsNavigatorButtons;



