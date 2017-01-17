import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';



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
        props.results.map((element, index) => {
            if(index === props.results.length) {
                return;
            }
            let toCompare = props.results.slice(index, index+1);
            return objectComparer(toCompare[0], toCompare[1]);
        });
    }

    renderValues = (object, keyName) => {
        if(isPrimitive(object)) {
            return <span className="primitive">{`${keyName}: ${object}`}</span>;
        }
        
        let objectType = Object.prototype.toString.call(object);
        if(objectType === "[object Array]") {
            return (<div className="object-container">
                        <span className="object-container-name">{keyName}</span>
                        {
                            object.keys.map((currentKey) => {
                                return renderValues(object[currentKey], currentKey);
                            })
                        }
                    
                    
                    </div>)
        }
        if(objectType === "[object Object]") {
            return (<div className="object-container">
                        <span className="object-container-name">{keyName}</span>
                        {
                            object.keys.map((currentKey) => {
                                return renderValues(object[currentKey], currentKey);
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
        let firstResult = copyObjectProperties(this.props.results, 0, 1);
        let restOfResults = copyObjectProperties(this.props.results, 1);

        return (
        <div className="main-result-comparer-container">
            {
                firstResult.keys.map((element) => {
                    return renderValues(element);
                })
            }

            {
                differences.keys.map((currentKey) => {
                    return renderValues(restOfResults[currentKey], currentKey);
                })
            }

        
        </div>
        )
    }


}






ResultComparer.propTypes = {
    results: PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps){
    return {
        results: state.resultToCompare
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ResultComparer);