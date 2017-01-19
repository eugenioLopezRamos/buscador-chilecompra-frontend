import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';
import * as utils from '../utils/miscUtils';
import objectAssign from 'object-assign';



class ResultComparer extends React.Component {
    constructor(props) {
        super(props);
        this.counter = 0;
        this.containers = [];

    }
        //props.results = {
 //           result1: {...},
  //          result2: {...},
//            result3: {...},
    //}       result4: {...}
    toggleOpen = (target) => {
        let currentDisplayStatus =  target.style.display;

        if(currentDisplayStatus === "none"){
            target.style.display = "flex";
        } 
        else {
            target.style.display = "none";
        }
    
    }

    //differences => [{result1 with result2}, {result2 with result3}, {result3 with result4}]
    differences = () => {
       return this.props.results.map((element, index) => {
                    if(index === this.props.results.length-1) {
                        return;
                    }
                    let toCompare = this.props.results.slice(index, index+2);
                    return utils.objectComparer(toCompare[0], toCompare[1], {});
                })
                .filter(e => e);
    }

    renderValues = (object, keyName) => {
        //TODO: refactor this.
        if(utils.isPrimitive(object)) {
            return <span className="primitive" key={`${keyName}${object}`}>{`${keyName}: ${object}`}</span>;
        }
        
        let objectType = Object.prototype.toString.call(object);
        if(objectType === "[object Array]") {
            this.counter++
            let number = this.counter;
            return (<div className="object-data-container" >

                        <span className="object-container-name" onClick={() => {this.toggleOpen(this.containers[number])} }>
                            {keyName}
                        </span>
                        <div className="object-container" ref={(element) => { this.containers[number] = element} }>
                        {
                            Object.keys(object).map((currentKey) => {
                                return this.renderValues(object[currentKey], null);
                            })
                        }
                        </div>
                    </div>)
        }
        if(objectType === "[object Object]") {
            this.counter++
            let number = this.counter;
            
            return (<div className="object-data-container">        
                        <span className="object-container-name" onClick={() => {this.toggleOpen(this.containers[number])} }>
                            {keyName}
                        </span>
                        <div className="object-container" ref={(element) => { this.containers[number] = element} }>
                        {
                            Object.keys(object).map((currentKey) => {
                                return this.renderValues(object[currentKey], currentKey);
                            })
                        }
                        </div>
                    </div>)
        }
    }

    render = () => {
        // We take the first result because that one should be shown in full
        // while in the others we'll show only the differences using utils.objectComparer(firstObject, secondObject, differencesContainer)

        let firstResult = this.props.results.slice(0, 1)[0];
        let differences = this.differences();

        let areThereDifferences = (() => {
                                            //Consider no differences if the only thing that was modified was FechaCreacion
                                            let sameAsEmpty = ["FechaCreacion"];                                     
                                            let differencesUniqueProperties = differences.map(result => result.value)
                                                                                .reduce((accumulator, current) => {
                                                                                        //find if the the keys.join() of current are in the accumulator.
                                                                                        // In case there's more than one key, it's irrelevant since we
                                                                                        // only care about the end result being ["FechaCreacion"] 
                                                                                        if(accumulator.indexOf(Object.keys(current).join()) > -1){
                                                                                            return accumulator;
                                                                                        }
                                                                                        return accumulator.concat(Object.keys(current));
                                                                                    }, []);
                                            return JSON.stringify(differencesUniqueProperties) != JSON.stringify(sameAsEmpty)
                                        }
                                    )();
        let renderDifferences = () => {
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
            <div className="result-comparer-main-title">
                Variaciones del resultado
            </div>

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
                    <div className="all-differences-title">
                        Detalle de variaciones
                    </div>
                    <div className="all-differences-each">
                        {renderDifferences()}
                    </div>
                </div>
            
            </div>
           {console.log("rendered refs", this.objectContainers, "REFS", this.refs, "THIS", this)}
        </div>
        
        )
        
    }


}

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