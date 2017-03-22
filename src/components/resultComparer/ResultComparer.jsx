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
        this.renderLaterFirstResult = [];
        this.renderLaterDifferences = [];
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

    areThereDifferences = (() => {
                                    //Consider no differences if the only thing that was modified was FechaCreacion
                                    let toIgnore = JSON.stringify(["FechaCreacion"]);
                                    let netDifferencesArray = this.differences().reduce((accumulator, element) => {

                                        let stringifiedValue = JSON.stringify(Object.keys(element));
                                    
                                        if(stringifiedValue === toIgnore) {
                                            return accumulator;
                                        }else {
                                            accumulator.push(element);
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
    //   debugger

        let renderDifferences = () => {
            if(self.areThereDifferences.value) {
                return self.areThereDifferences.differences
                        .map((currentResult, index) => {
                            if(!self.areThereDifferences.differences[index]) {
                                return null;
                            }
                            return (
                                    <div className="single-difference-container" key={`single-difference-container${index}`}>
                                    {
                                        Object.keys(currentResult).map((currentKey, index) => {
                                            let elementReturner = () => this.rendererGenerator(currentResult, currentKey)
                                            return (
                                                    <div className="difference-item" key={`single-difference${index}`}>

                                                        {
                                                        utils.isPrimitive(currentResult[currentKey]) ?
                                                            this.renderLaterDifferences.push(elementReturner) && null
                                                            :
                                                            elementReturner()
                                                        }
                                                   
                                                    </div>
                                                    );
                                        })
                                    }
                                    {
                                        this.renderLaterDifferences.map(elementReturner => elementReturner())
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
                    {`Variaciones del resultado: ${this.props.resultName}`} 
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