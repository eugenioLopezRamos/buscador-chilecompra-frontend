import React, {PropTypes} from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from  'redux';
import * as types from '../actions/actionTypes';


class ResultComparer extends React.Component {
    constructor(props) {
        super(props);
        this.objectTypeString = (target) => Object.prototype.toString.call(target);

       

    }

    isPrimitive = (target) => {
                let primitives = ["[object String]", "[object Number]", "[object Boolean]", "[object Null]", "[object Undefined]"]
                if(primitives.indexOf(Object.prototype.toString.call(target)) > -1) {
                    return true;
                }
                return false;
            }

    objectTransverser = (object) => {
        //returns an array with each "tree" of properties

        return Object.keys(object).map((element) => {

                    if(isPrimitive(object[element])) {
                        return {[element]: object[element]};
                    }
                    else {
                        return {[element]: objectTransverser(object[element])};
                    }
                });
    }

    // objectComparer = (object, secondObject, differencesAccumulator) => {

    //     const compareTheObjects = (firstObject, secondObject, accumulator) => {
    //         return Object.keys(object).reduce((differences, element) => {
    //                 //check if object[element] exists on both objects.If it does't, return that as a difference
    //                 if(!object[element] || !secondObject[element]) {
    //                     if(object[element] && !secondObject[element]) {
    //                         //TODO: refactor...
    //                         differences["removidos"] ? differences["removidos"][element] = object[element] : differences["removidos"] = {[element]: object[element]};
    //                         return differences;
    //                     }

    //                     if(secondObject[element] || !object[element]) {
    //                         //TODO: refactor this, too.
    //                         differences["añadidos"] ? differences["añadidos"][element] = secondObject[element] : differences["añadidos"] = {[element]: secondObject[element]};
    //                         return differences;
    //                     }
    //                 }
    //                 //value is a primitive? check if values are equal then return  {differences} with no changes if they are equal or
    //                 //differences with key [element] = {anterior: object[element], nuevo: secondObject[element]};
    //                 if(isPrimitive(object[element]) && isPrimitive(secondObject[element])) {
    //                     if(object[element] === secondObject[element]) {
    //                         return differences;
    //                     }else {
    //                         differences[element] = {anterior: object[element], nuevo: secondObject[element]};
    //                         return differences;
    //                     }
    //                 }
    //                 //Otherwise, iterate until you find a primitive 
    //                 else {
    //                     let subObjectDifferences = objectComparer(object[element], secondObject[element], {});
    //                     if(Object.keys(subObjectDifferences).length > 0) {
    //                         differences[element] = subObjectDifferences;
    //                     }
    //                     return differences;
    //                 }
    //             }, differencesAccumulator);
    //     }

    //     let differencesFirstToSecond = compareTheObjects(object, secondObject, differencesAccumulator);
    //     let differencesSecondToFirst = compareTheObjects(secondObject, object, differencesAccumulator);
    //     return Object.assign({}, differencesFirstToSecond, differencesSecondToFirst);
    // }


// objectComparer = (object, otherObject) => {
//         let firstDifferences  = {}
//         let secondDifferences = {}

//         let isPrimitive = (target) => {
//                 let primitives = ["[object String]", "[object Number]", "[object Boolean]", "[object Null]", "[object Undefined]"]
//                 if(primitives.indexOf(Object.prototype.toString.call(target)) > -1) {
//                     return true;
//                 }
//                 return false;
//             }

//         let compareTheObjects = (firstObject, secondObject, accumulator) => {
//             return Object.keys(firstObject).reduce((differences, element) => {
//                     //check if object[element] exists on both objects.If it does't, return that as a difference
//                     if(firstObject[element] === undefined || secondObject[element] === undefined) {







//                         if(firstObject[element] != undefined && secondObject[element] === undefined) {
//                             //TODO: refactor...
//                             differences["removidos"] ? differences["removidos"][element] = firstObject[element] : differences["removidos"] = {[element]: firstObject[element]};
//                             return differences;
//                         }

//                         if(firstObject[element] === undefined && secondObject[element] != undefined) {
//                             //TODO: refactor this, too.
//                             differences["añadidos"] ? differences["añadidos"][element] = secondObject[element] : differences["añadidos"] = {[element]: secondObject[element]};
//                             return differences;
//                         }




                        
//                     }
//                     //value is a primitive? check if values are equal then return  {differences} with no changes if they are equal or
//                     //differences with key [element] = {anterior: object[element], nuevo: secondObject[element]};
//                     if(isPrimitive(firstObject[element]) && isPrimitive(secondObject[element])) {
//                         if(firstObject[element] === secondObject[element]) {
//                             return differences;
//                         }else {
//                             differences[element] = {anterior: firstObject[element], nuevo: secondObject[element]};
//                             return differences;
//                         }
//                     }
//                     //Otherwise, iterate until you find a primitive 
//                     else {
//                         let subObjectDifferences = objectComparer(firstObject[element], secondObject[element], {});
//                         if(Object.keys(subObjectDifferences).length > 0) {
//                             differences[element] = subObjectDifferences;
//                         }
//                         return differences;
//                     }
//                 }, accumulator);
//         }

//         let differencesFirstToSecond = compareTheObjects(object, otherObject, firstDifferences);
//         console.log("diff111111", differencesFirstToSecond);
//         let differencesSecondToFirst = compareTheObjects(otherObject, object, secondDifferences);
//         console.log("difff222222", differencesSecondToFirst);
        
//         return {differencesFirstToSecond, differencesSecondToFirst}
//     };
    

objectComparer = (object, secondObject, differencesAccumulator) => {

        let diffFirstToSecond = Object.keys(object).reduce((differences, element) => {
                   // differences["removidos"] = {}
                   // differences["añadidos"] = {}
                    //check if object[element] exists on both objects.If it does't, return that as a difference
                    if(secondObject[element] === undefined) {
                        
                        differences["removidos"] ? differences["removidos"][element] = object[element] : differences["removidos"] = {[element]: object[element]};
                        return differences;
                        // if(secondObject[element] != undefined || object[element] === undefined) {
                        //     //TODO: refactor this, too.
                        //     differences["añadidos"] ? differences["añadidos"][element] = secondObject[element] : differences["añadidos"] = {[element]: secondObject[element]};
                        //     return differences;
                        // }
                    }

                    //value is a primitive? check if values are equal then return the same differences if they are equal or
                    //differences with key [element] = {anterior: object[element], nuevo: secondObject[element]};
                    if(isPrimitive(object[element]) && isPrimitive(secondObject[element])) {
                        if(object[element] === secondObject[element]) {
                            return differences;
                        }else {
                            differences[element] = {anterior: object[element], nuevo: secondObject[element]};
                            return differences;
                        }
                    }
                    //Otherwise, iterate until you find a primitive 
                    else {
                        let subObjectDifferences = objectComparer(object[element], secondObject[element], {});
                        if(Object.keys(subObjectDifferences).length > 0) {
                            differences[element] = subObjectDifferences;
                        }
                        return differences;
                    }
                }, differencesAccumulator);
        
        let diffSecondToFirst = Object.keys(secondObject).reduce((differences, element) => {
                   // differences["removidos"] = {}
                   // differences["añadidos"] = {}
                    //check if object[element] exists on both objects.If it does't, return that as a difference
                    if(object[element] === undefined) {
                            differences["añadidos"] ? differences["añadidos"][element] = secondOject[element] : differences["añadidos"] = {[element]: secondObject[element]};
                            return differences;
                       // }

                        // if(secondObject[element] != undefined || object[element] === undefined) {
                        //     //TODO: refactor this, too.
                        //     differences["añadidos"] ? differences["añadidos"][element] = secondObject[element] : differences["añadidos"] = {[element]: secondObject[element]};
                        //     return differences;
                        // }
                    }

                    //value is a primitive? check if values are equal then return the same differences if they are equal or
                    //differences with key [element] = {anterior: object[element], nuevo: secondObject[element]};
                    if(isPrimitive(object[element]) && isPrimitive(secondObject[element])) {
                        if(object[element] === secondObject[element]) {
                            return differences;
                        }else {
                            differences[element] = {anterior: object[element], nuevo: secondObject[element]};
                            return differences;
                        }
                    }
                    //Otherwise, iterate until you find a primitive 
                    else {
                        let subObjectDifferences = objectComparer(object[element], secondObject[element], {});
                        if(Object.keys(subObjectDifferences).length > 0) {
                            differences[element] = subObjectDifferences;
                        }
                        return differences;
                    }
                }, differencesAccumulator);

    return Object.assign({}, diffFirstToSecond, diffSecondToFirst);
   }


}





    render = () => {
        (<div>

        
        
        
        
        
        
        
        
        
        
        </div>)
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