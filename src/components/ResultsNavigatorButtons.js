import React from 'react';
import {RESULTS_OFFSET_AMOUNT}  from '../constants/resultsOffset';
import * as utils from '../utils/miscUtils';


const ResultsNavigatorButtons = (props) => {
 
    const offset = RESULTS_OFFSET_AMOUNT;
    let goToPageInput = "";
    let pageSelectButtons = null;
    const maxAmountOfPages = 8;

    const incrementOffset = () => {
        // user clicks ">>"
        props.paginatorButtonClickHandler(offset);
    };

    const decrementOffset = () => {
        //user clicks "<<"
        props.paginatorButtonClickHandler(-offset);
    };

    const setOffset = (times, event) => {
        // user clicks button [1] or [3] or whatever number (a certain page number)
        // shouldn't exceed props.pages since that button wouldn't exist.

      //  const buttonWidth = getComputedStyle(event.target).width;

        // if(times > currentPage) {
        //     pageSelectButtons.style.transform = `translate(-${buttonWidth}px, 0)`
        // }
        // if(times < currentPage) {
        //     pageSelectButtons.style.transform = `translate(${buttonWidth}px, 0)`        
        // }

//hide them with margins!
//pageSelectButtons.firstElementChild.style.marginLeft = `${buttonWidth}

        props.pageButtonClickHandler(offset * times);
    };

    const handleGoTo = () => {
        //user types in a page number on the input field
        let number = goToPageInput.value - 1;
        goToPageInput.value = "";

        if(parseInt(number) != number) {

            //TODO: Change alert into html
            alert("Ingrese un número");
            return;
        }
        
        if(number > props.pages) {
            //TODO: use a small component (<Flash> or <Modal>)
            alert(`Ingrese un numero entre 1 y ${props.pages}`);
            return;
        }

        props.pageButtonClickHandler(offset * number);
        
    };

    const showButtonsArray = (() => {
        //return numerated pages, [0...props.pages]
        return Array.apply(null, {length: props.pages}).map((element, index) => index);
    })();

    // const currentPageLocation = (() => {
    //     //is the current page in the first half ("head") or in the second half ("tails")
    //     // of the array?
    //     let middle = parseInt(showButtonsArray.length/2)
    //     let location = "";
    //    // debugger

    //     if(props.currentPage > middle) {
    //         location = "tail";
    //     }
    //     if(props.currentPage <= middle) {
    //         location = "head";
    //     }

    //     return location;
    // })()


    const buttonRenderer = (element, index, array, isActive = false) => {
            if(isActive === true) {

                return (<button className={`page-button button-number-${index + 1} active`} key={`page ${index}`} onClick={(event) => {setOffset(index, event);}}>
                        {element + 1}
                       </button>);      
            }

            else {
               return (<button className={`page-button button-number-${index + 1}`} key={`page ${index}`} onClick={(event) => {setOffset(index, event);}}>
                        {element + 1}
                      </button>);        
            }
        };


    const buttonsArray = (() => {

        let currentPage = props.currentPage;
        let pages = props.pages;

        let pagesArray =  Array.apply(null, {length: pages}).map((element, index) => index);

        let chunkedArray = utils.chunkifyArray(pagesArray, maxAmountOfPages);

        let activePageArrayIndex = parseInt(currentPage/maxAmountOfPages);


        let activePageArray = chunkedArray[activePageArrayIndex];
        let activePageIndex = activePageArray.indexOf(currentPage);
        

        return {activePageArray, activePageIndex};

    })();


    
    return (<div className="results-navigator-buttons-container">
    
                <div className="page-picker-container">
                    <label className="show-page">Mostrar página:</label>
                    <div className="inputs">
                        <input 
                            type="number"
                            min="1"
                            max={props.pages}
                            placeholder="Página"
                            defaultValue={null}
                            ref={(input) => {goToPageInput = input;}}
                            onChange={(event) => {goToPageInput = event.target;}}
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

                    <div className={`page-select-buttons buttons-offset-${buttonsArray.activePageIndex + 1}`} ref={(element) => pageSelectButtons = element}>
                    {
                        buttonsArray.activePageArray.map((element, index, array) => {
                            if(index === buttonsArray.activePageIndex) {
                                return buttonRenderer(element, index, array, true);
                            }
                                return buttonRenderer(element, index, array);                           
                            
                        })
                    }
                    </div>

                    <button className="page-button prev-next" onClick={incrementOffset}>
                        {">>"}
                    </button>
                </div>
           </div>);


};

export default ResultsNavigatorButtons;



