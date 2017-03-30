import React from 'react'
    
    
const ResultsNavigatorButtonsRenderer = ({element, index, setOffset, isActive}) => {
   
        if(isActive === true) {
            return (<button className={`page-button button-number-${index + 1} active`}
                            key={`page ${index}`}
                            onClick={(event) => {setOffset(index, event);}}>
                        {element + 1}
                    </button>);      
        }

        else {
    
            return (<button className={`page-button button-number-${index + 1}`}
                            key={`page ${index}`}
                            onClick={(event) => {setOffset(index, event);}}>
                        {element + 1}
                    </button>);        
        }
    };
export default ResultsNavigatorButtonsRenderer;