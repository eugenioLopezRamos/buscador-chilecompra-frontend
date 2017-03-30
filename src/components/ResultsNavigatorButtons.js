import React from 'react';
import {RESULTS_OFFSET_AMOUNT}  from '../constants/resultsOffset';
import * as utils from '../utils/miscUtils';
import ResultsNavigatorButtonsRenderer from './ResultsNavigatorButtonsRenderer';

const ResultsNavigatorButtons = (props) => {
 
    const offset = RESULTS_OFFSET_AMOUNT;
    let goToPageInput = "";

    const maxAmountOfPages = 8;

    const incrementOffset = () => {
        // user clicks ">>"
        props.paginatorButtonClickHandler(offset);
    };

    const decrementOffset = () => {
        //user clicks "<<"
        props.paginatorButtonClickHandler(-offset);
    };

    const setOffset = (times) => {
        // user clicks button [1] or [3] or whatever number (a certain page number)
        // shouldn't exceed props.pages since that button wouldn't exist.
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

    const buttonsArray = (() => {

        let currentPage = props.currentPage;
        let pages = props.pages;

        //Generate a range [0, ...pages]
        let pagesArray =  Array.apply(null, {length: pages}).map((element, index) => index);

        //Divide the array in chunks
        // if props.pages = 16 and maxAmountOfPages = 8
        // You would end up with a new array [chunk1, chunk2]
        // where chunk1 and chunk2 are arrays of length = 8
        let chunkedArray = utils.chunkifyArray(pagesArray, maxAmountOfPages);

        //In which chunk index is the currentPage?
        let activePageArrayIndex = parseInt(currentPage/maxAmountOfPages);

        //Inside that chunk, what's the index of the activePage? 
        // [0, ..16] => chunkify => chunkedArray = [array[0,..7], array2[0, ..7]]
        // if active page is "9" => it would be located in chunkedArray[1][1]
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

                    <div className={`page-select-buttons buttons-offset-${buttonsArray.activePageIndex + 1}`}>
                    {
                        buttonsArray.activePageArray.map((element, index) => {

                            if(index === buttonsArray.activePageIndex) {
                                return (<ResultsNavigatorButtonsRenderer 
                                         element={element}
                                         key={element + index}
                                         index={index}
                                         setOffset={setOffset}
                                         isActive={true}
                                        />);
                            }
                                return (<ResultsNavigatorButtonsRenderer 
                                         element={element}
                                         key={element + index}
                                         index={index}
                                         setOffset={setOffset}                                  
                                         isActive={false}
                                        />);                        
                            
                        })
                    }
                    </div>

                    <button className="page-button prev-next" onClick={incrementOffset}>
                        {">>"}
                    </button>
                </div>
           </div>);


};

ResultsNavigatorButtons.propTypes = {
    pages: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    paginatorButtonClickHandler: React.PropTypes.func,
    pageButtonClickHandler: React.PropTypes.func
};

export default ResultsNavigatorButtons;



