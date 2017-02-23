import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../constants/actionTypes';
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
        let currentDisplayStatus = target.style.display;

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
                    //console.log("compare 1", toCompare[0], "tocompare 2", toCompare[1]);
                    return utils.objectComparer(toCompare[0], toCompare[1], {});
                })
                .filter(e => e);
    }

    renderValues = (object, keyName) => {
        //TODO: refactor this.
        if(utils.isPrimitive(object)) {
            return <span className="primitive" key={`${keyName}${object}`}>
                    <span className="inPrimitive-key">{keyName}:</span>
                    <span className="inPrimitive-value"> {object}</span>
                  </span>;
        }
        
        let objectType = Object.prototype.toString.call(object);
        if(objectType === "[object Array]") {
            this.counter++
            let number = this.counter;
            return (<div className="object-data-container" key={number}>

                        <span className="object-container-name" onClick={() => {this.toggleOpen(this.containers[number])} }>
                            {keyName}
                        </span>
                        <div className="object-container" ref={(element) => { this.containers[number] = element} } key={`object-containerArray${number}`}>
                        {
                            Object.keys(object).map((currentKey) => {

                                let keyName = null;

                                if(Object.keys(object).length > 1) {
                                    keyName = `${parseInt(currentKey,10) + 1})`;
                                }
                                return this.renderValues(object[currentKey], keyName);
                            })
                        }
                        </div>
                    </div>)
        }
        if(objectType === "[object Object]") {
            this.counter++
            let number = this.counter;
            
            return (<div className="object-data-container" key={number}>        
                        <span className="object-container-name" onClick={() => {this.toggleOpen(this.containers[number])} } key={`objectContainerName${number}`}>
                            {keyName}
                        </span>
                        <div className="object-container" ref={(element) => { this.containers[number] = element} } key={`object-containerObject${number}`}>
                        {
                            

                            Object.keys(object).map((currentKey) => {
                                let keys = Object.keys(object);

                                let keyName = currentKey;

                                if(parseInt(keyName) == keyName) {
                                    keyName = `${parseInt(keyName) + 1})`;
                                    if(keys.length === 1) {
                                        keyName = null;
                                    }
                                }
                            
                                return this.renderValues(object[currentKey], keyName);
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
                                            let toIgnore = JSON.stringify(["FechaCreacion"]);
                                            let netDifferencesArray = differences.map(element => {

                                                let stringifiedValue = JSON.stringify(Object.keys(element.value));
                                            
                                                if(stringifiedValue === toIgnore) {
                                                    return null;
                                                }else {
                                                return element.value;
                                                }
                                                
                                            })

                                            let unignoredDifferencesAmount = netDifferencesArray.filter(e => e != null).length;

                                            if(unignoredDifferencesAmount === 0) {
                                                return {
                                                    value: false
                                                }
                                            }
                                            return {
                                                value: true,
                                                differences: netDifferencesArray
                                            }

                                        }
                                    )();

        let renderDifferences = () => {
            if(areThereDifferences.value) {
                return differences
                        .map((currentResult, index) => {
                            if(!areThereDifferences.differences[index]) {
                                return null;
                            }
                            return (
                                    <div className="single-difference-container" key={`single-difference-container${index}`}>
                                    {
                                        Object.keys(currentResult.value).map((currentKey, index) => {
                                            return (
                                                    <div className="difference-item" key={`single-difference${index}`}>
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
            <div style={{minWidth: document.documentElement.clientWidth * 0.85}}>  
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
                            <p className="all-differences-title-note">
                                En caso de haber variaciones sólo de FechaCreacion, estas se 
                                han obviado
                            </p>                         
                            Detalle de variaciones
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