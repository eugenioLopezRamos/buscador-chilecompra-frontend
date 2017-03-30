import React, {PropTypes} from 'react';
    
    
const ResultsNavigatorButtonsRenderer = ({element, index, setOffset, isActive}) => {
   
        if(isActive === true) {
            return (<button className={`page-button button-number-${index + 1} active`}
                            key={`page ${index}`}
                            onClick={() => {setOffset(index);}}>
                        {element + 1}
                    </button>);      
        }

        else {
    
            return (<button className={`page-button button-number-${index + 1}`}
                            key={`page ${index}`}
                            onClick={() => {setOffset(index);}}>
                        {element + 1}
                    </button>);        
        }
};

ResultsNavigatorButtonsRenderer.propTypes = {
    element: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    setOffset: PropTypes.func.isRequired,
    isActive: PropTypes.bool
};

export default ResultsNavigatorButtonsRenderer;