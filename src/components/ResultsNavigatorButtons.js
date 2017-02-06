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
                <div style={{display: "flex"}}>
                   {
                    Array.apply(null, {length: props.pages+1}).map((element, index) => {
                        return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                                {index+1}
                                </span>
                   }) }
                </div>
                <button onClick={incrementOffset}>
                    Siguiente
                </button>
           </div>


}

export default ResultsNavigatorButtons;



