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


            if(props.currentPage >= 5) {

                    if(index === props.currentPage) {
                            return <span className="page-button active" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                                        {index+1}
                                </span>

                    }

                    if(index > props.currentPage - 5 && index < props.currentPage) {

                            return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                                        {index+1}
                                </span>
                    }

                    if(index < props.currentPage + 5 && index > props.currentPage) {

                            return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                                        {index+1}
                                </span>


                    }
            }
            if(props.currentPage < 5) {

                if(index === props.currentPage) {
                    return <span className="page-button active" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                                {index+1}
                        </span>
                }

                if(index < props.currentPage && index > props.currentPage - 5 ) {
                    return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                        {index+1}
                    </span>

                }

                if(index >  props.currentPage && index < (9)  ) {

                    return <span className="page-button" key={`page ${index}`} onClick={() => {setOffset(index)}}>
                        {index+1}
                    </span>

                }
            }

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



