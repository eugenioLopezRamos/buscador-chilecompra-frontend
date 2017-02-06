import React from 'react';
import {RESULTS_OFFSET_AMOUNT}  from '../constants/resultsOffset';

const ResultsNavigatorButtons = (props) => {
    console.log("RESULTS NAV PROPS", props);
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

    const buttonRenderer = (element, index, array) => {

        if(array.length < 8) {
            return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                        {index+1}
                   </span>
        }
        else {
            if(index < (props.currentPage - 5) || index > array.length - 5) {
                return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                            {index+1}
                       </span>
            }else if(index === 5) {
                return <span className="results-ellipsis">...</span>;
            }
            else {
                return null;
            }

        }



    /*if(index < 5 || index > array.length - 1 ? 
                                <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                                    {index+1}
                                </span>*/




    }



    return <div>
                <div>
                    <label>Mostrar desde:</label>
                    <input 
                        type="input"
                        placeholder="Valor desde donde iniciar"
                    />
                    <button>Mostrar</button>
                </div>

                <button onClick={decrementOffset} >
                    Anterior
                </button>
                <div style={{display: "flex", maxWidth: "100vw"} }>
                   {
                    Array.apply(null, {length: props.pages+1}).map(buttonRenderer)}
                </div>
                <button onClick={incrementOffset}>
                    Siguiente
                </button>
           </div>


}

export default ResultsNavigatorButtons;



