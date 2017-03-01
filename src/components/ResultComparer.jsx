import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
//import {connect} from 'react-redux';
//import {bindActionCreators} from  'redux';
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
    toggleOpen = (event, target) => {
        event.stopPropagation();
        
        target.classList.toggle('display-flex');
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

    renderValues = (object, keyName) => {
        //TODO: refactor this?

        //Could do this with a switch too, maybe it would be more readable?
        //IF OBJECT IS A PRIMITIVE
        if(utils.isPrimitive(object)) {
            //simply render key : value in spans
            return <span className="primitive" key={`${keyName}${object}`}>
                    <span className="inPrimitive-key">{keyName}:</span>
                    <span className="inPrimitive-value"> {object}</span>
                  </span>;
        }
        
        // IF OBJECT IS AN ARRAY
        if(utils.isArray(object)) {
            this.counter++
            let number = this.counter;
            //Arrays contain data, which we can toggle to show, thus we need to have refs
            // to target them with this.toggleOpen
            //We make a container for the array then iterate over its data with renderValues
            return (<div className="object-data-container type-array" key={number}>
                        {/* this span has the array's name and is clickable to toggle the info's display status*/}
                        <span className="object-container-name type-array" onClick={(event) => {this.toggleOpen(event, this.containers[number])} }>
                            {keyName}
                        </span>
                        {/*this contains the data in the array (its keys)*/}
                        <div className="object-container display-flex type-array" ref={(element) => { this.containers[number] = element} } key={`object-containerArray${number}`}>
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
        //IF OBJECT IS A POJO
        if(utils.isPOJO(object)) {
            this.counter++
            let number = this.counter;
            //Same as above, container with a clickable span with the object's name (keyName) for toggling display and a <div> that contains the object's data.
            return (<div className="object-data-container type-pojo" key={number}>        
                        <span className="object-container-name type-pojo" onClick={(event) => {this.toggleOpen(event,this.containers[number])} } key={`objectContainerName${number}`}>
                            {keyName}
                        </span>
                        <div className="object-container display-flex type-pojo" ref={(element) => { this.containers[number] = element} } key={`object-containerObject${number}`}>
                        {
                            Object.keys(object).map((currentKey) => {
                                let keys = Object.keys(object);

                                let keyName = currentKey;
                                //if keyname is an int, turn it from zero indexed to 1 indexed => "add one"
                                
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
            <div className="result-comparer-root" style={{minWidth: document.documentElement.clientWidth * 0.85}}>  
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