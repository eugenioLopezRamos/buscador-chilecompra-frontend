import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';
import * as utils from '../utils/miscUtils';



class ResultComparer extends React.Component {
    constructor(props) {
        super(props);
    }
        //props.results = {
 //           result1: {...},
  //          result2: {...},
//            result3: {...},
    //}       result4: {...}


    //differences => [{result1 with result2}, {result2 with result3}, {result3 with result4}]
    differences = () => {
       return this.props.results.map((element, index) => {
                    if(index === this.props.results.length-1) {
                        return;
                    }
                    let toCompare = this.props.results.slice(index, index+2);
                    console.log("index", index,"Tocompare", toCompare);
                    console.log("this props results", this.props.results);
                    return utils.objectComparer(toCompare[0], toCompare[1], {});
                })
                .filter(e => e);
    }

    renderValues = (object, keyName) => {
        //TODO: refactor this.
        if(utils.isPrimitive(object)) {
            return <span className="primitive">{`${keyName}: ${object}`}</span>;
        }
        
        let objectType = Object.prototype.toString.call(object);
        if(objectType === "[object Array]") {
            return (<div className="object-container">
                        <span className="object-container-name">{keyName}</span>
                        {
                            Object.keys(object).map((currentKey) => {
                                return this.renderValues(object[currentKey], null);
                            })
                        }
                    </div>)
        }
        if(objectType === "[object Object]") {
            return (<div className="object-container">
                        <span className="object-container-name">{keyName}</span>
                        {
                            Object.keys(object).map((currentKey) => {
                                return this.renderValues(object[currentKey], currentKey);
                            })
                        }
                    </div>)
        }

    }

    render = () => {
        // We take the first result because that one should be shown in full
        // while in the others we'll show only the differences with the previous one
        // example:
        //  first = {key1: "lalala",
        //           key2: "im happy",
        //           key3: "this is the third"
        //          }
        // second = {key1: "lalala",
        //           key2: "im sad",
        //           }
        //  so instead of showing second in full we'll show the differences:
        //                   {key2: "im sad",
        //                    removed: {key3: "this is the third"}
        //                   }
        //
        let firstResult = this.props.results.slice(0, 1)[0]; //utils.arrayObjectProperties(this.props.results, 0, 1);
       // let restOfResults = this.props.results.slice(1); //utils.arrayObjectProperties(this.props.results, 1);
        let differences = this.differences();
        let areThereDifferences = (() => {
                                            //Consider no differences if the only thing that was modified was FechaCreacion
                                            let sameAsEmpty = ["FechaCreacion"];
                                            let differenceKeys = Object.values(differences)//.map(result => Object.values(differences[result]))
                                         
                                            let kis = differences.map(result => result.value)
                                                       .reduce((accumulator, current) => {
                                                               //  debugger
                                                            if(accumulator.indexOf(Object.keys(current).join()) > -1){
                                                                return accumulator;

                                                            }
                                                            return accumulator.concat(Object.keys(current));
                                                        }, []);
                                            return JSON.stringify(kis) != JSON.stringify(sameAsEmpty)
                                        }
                                    )();
        let drawDifferences = () => {
            if(areThereDifferences) {
                return differences
                        .map((currentResult) => {
                            return (
                                    <div className="single-difference-container">
                                    {
                                        Object.keys(currentResult.value).map(currentKey => {
                                            return (
                                                    <div className="difference-item">
                                                        {this.renderValues(currentResult.value[currentKey], currentKey)}
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
        <div>
            <span className="">Variaciones del resultado</span>
            <div className="main-result-comparer-container">
                
                <div className="original-result-container">
                    <div className="original-result-title">Resultado</div>
                    { 
                        Object.keys(firstResult.value).map((currentKey) => {
                            return this.renderValues(firstResult.value[currentKey], currentKey);
                        })
                    }
                </div>
                <div className="all-differences-container">
                    <div className="all-differences-title">Detalle de variaciones</div>
                    <div className="all-differences-each">
                        {drawDifferences()}
                    </div>
                </div>
            
            </div>
        </div>
        )
    }


}



            // {
            //     differences.value.keys.map((currentKey) => {
            //         return renderValues(differences[currentKey], currentKey);
            //     })
            // }



ResultComparer.propTypes = {
    results: PropTypes.array.isRequired
}


function mapStateToProps(state, ownProps){
    return {
       // results: state.resultToCompare
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ResultComparer);