import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
//import {connect} from 'react-redux';
//import {bindActionCreators} from  'redux';
import * as types from '../../constants/actionTypes';
import * as utils from '../../utils/miscUtils';
import objectAssign from 'object-assign';
import ResultComparerObjectRenderer from './ResultComparerObjectRenderer';


class ResultComparer extends React.Component {
    constructor(props) {
        super(props);
        // this.counter = 0;
        // this.containers = [];

    }
        //props.results = {
 //           result1: {...},
  //          result2: {...},
//            result3: {...},
    //}       result4: {...}
    toggleOpen = (event, container) => {
        event.stopPropagation();
        event.target.classList.toggle('open');
        event.target.classList.toggle('closed');
        container.classList.toggle('display-flex');
    }

    //differences => [{result1 with result2}, {result2 with result3}, {result3 with result4}]
    differences = () => {
       return this.props.results.reduce((accumulator, element, index) => {
                    if(index === this.props.results.length-1) {
                        return accumulator;
                    }
                    let toCompare = this.props.results.slice(index, index+2);
                    accumulator.push(utils.objectComparer(toCompare[0], toCompare[1]));
                    return accumulator;
                }, [])
            
    }


    
    areThereDifferences = (() => {
                                    //Consider no differences if the only thing that was modified was FechaCreacion
                                    let toIgnore = JSON.stringify(["FechaCreacion"]);
                                    let netDifferencesArray = this.differences().reduce((accumulator, element) => {

                                        let stringifiedValue = JSON.stringify(Object.keys(element.value));
                                    
                                        if(stringifiedValue === toIgnore) {
                                            return accumulator;
                                        }else {
                                            accumulator.push(element.value);
                                            return accumulator;
                                        }
                                        
                                    }, [])

                                    let unignoredDifferencesAmount = netDifferencesArray.length;

                                    if(unignoredDifferencesAmount === 0) {
                                        return {
                                            value: false
                                        }
                                    }
                                    return {
                                        value: true,
                                        differences: netDifferencesArray
                                    }

                                })();




    render = () => {
        // We take the first result because that one should be shown in full
        // while in the others we'll show only the differences using utils.objectComparer(firstObject, secondObject, differencesContainer)

        let firstResult = this.props.results.slice(0, 1)[0];
        let differences = this.differences();
        let self = this;


        let renderDifferences = () => {
            if(self.areThereDifferences.value) {
                return differences
                        .map((currentResult, index) => {
                            if(!self.areThereDifferences.differences[index]) {
                                return null;
                            }
                            return (
                                    <div className="single-difference-container" key={`single-difference-container${index}`}>
                                    {
                                        Object.keys(currentResult.value).map((currentKey, index) => {
                                     
                                            return (
                                                    <div className="difference-item" key={`single-difference${index}`}>
                                                
                                                        <ResultComparerObjectRenderer
                                                                    key={`ResultComparerObjectRenderer${currentKey}`}
                                                                    handleToggleOpen={self.toggleOpen}
                                                                    object={currentResult.value[currentKey]}
                                                                    keyName={currentKey}
                                                                />                                                      
                                                   

                                                    </div>
                                                    );
                                        })
                                    }                
                                    </div>
                                    )  
                        })
            }
            return <div className="single-difference-container">Sin variaciones</div>;
        }
    

        return (
            <div className="result-comparer-root" style={{minWidth: document.documentElement.clientWidth * 0.85}}>  
                <div className="result-comparer-main-title">
                    Variaciones del resultado
                </div>

                <div className="main-result-comparer-container">
                    <div className="original-result-container">
                        <div className="original-result-title">Resultado</div>
                        { 
                            Object.keys(firstResult.value).map((currentKey) => {
                                return <ResultComparerObjectRenderer
                                            key={`ResultComparerObjectRenderer${currentKey}`}
                                            handleToggleOpen={self.toggleOpen}
                                            object={firstResult.value[currentKey]}
                                            keyName={currentKey}
                                        />
                            })
                        }
                    </div>

                    <div className="all-differences-container">
                        <div className="all-differences-title">   
                            <p className="all-differences-title-note">
                                En caso de haber variaciones sólo de FechaCreacion, estas se 
                                han obviado
                            </p>                         
                            <div className="detail">Detalle de variaciones</div>
                        </div>
                        <div className="all-differences-each">
                            {renderDifferences()}
                        </div>
                    </div>
                
                </div>
            </div>
        
        )
        
    }


}

ResultComparer.propTypes = {
    results: PropTypes.array.isRequired
}



export default ResultComparer;