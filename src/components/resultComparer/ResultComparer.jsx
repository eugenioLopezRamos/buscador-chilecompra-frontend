import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
//import {connect} from 'react-redux';
//import {bindActionCreators} from  'redux';
import * as types from '../../constants/actionTypes';
import * as utils from '../../utils/miscUtils';
import objectAssign from 'object-assign';
import ResultComparerObjectRenderer from './ResultComparerObjectRenderer';
import * as resultComparerHelpers from './resultComparerHelper';
//TODO: See how to export resultComparerHelpers.netDifferencesRenderer into a SFC

class ResultComparer extends React.Component {
    constructor(props) {
        super(props);
        this.renderLaterFirstResult = [];
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
        let self = this;
       return this.props.results.reduce((accumulator, element, index, array) => {
                    if(index === this.props.results.length-1) {
                        return accumulator;
                    }
                    //takes chunks of two and compares them
                    let toCompare = this.props.results.slice(index, index+2);
                    
                    accumulator.push(utils.objectComparer(toCompare[0].value, toCompare[1].value));
                    return accumulator;
                }, [])
            
    }

    areThereDifferences = (() => resultComparerHelpers.areThereDifferences(this))(this);

    renderDifferences = (areThereDifferences, rendererGenerator) => resultComparerHelpers.netDifferencesRenderer(areThereDifferences, rendererGenerator);

    rendererGenerator = (currentResult, currentKey) => (<ResultComparerObjectRenderer
                                                                    key={`ResultComparerObjectRenderer${currentKey}`}
                                                                    handleToggleOpen={this.toggleOpen}
                                                                    object={currentResult[currentKey]}
                                                                    keyName={currentKey}
                                                        />) 

    render = () => {
        // We take the first result because that one should be shown in full
        // while in the others we'll show only the differences using utils.objectComparer(firstObject, secondObject, differencesContainer)

        let firstResult = this.props.results.slice(0, 1)[0].value;
        let self = this;
        let areThereDifferences = self.areThereDifferences;
        let rendererGenerator = self.rendererGenerator;
        let resultName = this.props.resultName ? `: ${this.props.resultName}` : "";

        return (
            <div className="result-comparer-root" style={{minWidth: document.documentElement.clientWidth * 0.85}}>  

                <div className="result-comparer-main-title">
                    {`Variaciones del resultado${resultName}`} 
                </div>

                <div className="main-result-comparer-container" >
                        <div className="original-result-container">
                            <div className="original-result-title">Resultado</div>
                            <div className="original-result-data">
                            { 
                                Object.keys(firstResult).map((currentKey) => {

                                    let elementReturner = () => this.rendererGenerator(firstResult, currentKey);

                                    return utils.isPrimitive(firstResult[currentKey]) ?
                                            this.renderLaterFirstResult.push(elementReturner) && null         
                                            :
                                            elementReturner();
                                })
                            }
                            {this.renderLaterFirstResult.map(elementReturner => elementReturner())}
                            </div>
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
                            {this.renderDifferences(areThereDifferences, rendererGenerator)}
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