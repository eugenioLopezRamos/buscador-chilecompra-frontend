import React, {PropTypes} from 'react';
    
    
const ResultsNavigatorButtonsRenderer = ({element, index, setOffset, isActive}) => {

        if(isActive === true) {
            return (<button className={`page-button button-number-${element} active`}
                            key={`page ${element}`}
                            onClick={() => {setOffset(element);}}>
                        {element + 1}
                    </button>);      
        }
    
        return (<button className={`page-button button-number-${element}`}
                        key={`page ${element}`}
                        onClick={() => {setOffset(element);}}>
                    {element + 1}
                </button>);        

};

ResultsNavigatorButtonsRenderer.propTypes = {
    element: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    setOffset: PropTypes.func.isRequired,
    isActive: PropTypes.bool
};

export default ResultsNavigatorButtonsRenderer;