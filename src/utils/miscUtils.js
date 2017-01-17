import objectAssign from 'object-assign';

export const capitalize = (string) => {
    
    let newString = string;
    return newString.split("").reduce((prev, curr) => {

        let newValue = "";
        if(prev.length === 0) {
            newValue = prev + curr.toUpperCase();
        }else {
            newValue = prev + curr;
        }
        return newValue;
    }, new String)
   
};


export const getObjectPropsWithValues = (object) =>  {
    //Check every property of an object. If the property is an object, run the function again
    // else, add the values to the response object
    // So, for example:
    // let nestedObj = {"nested1": {
        //                 "nested2": {
        //                             "nested3": "my value is here"
        //                             }
        //              }
        // }
    // then
    //getObjectPropsWithValues(nestedObj) returns: {nested3: "my value is here"}

    let response = {}
	
    let transverseProps = (o) => Object.keys(o).map((e) => {
        if(Object.prototype.toString.call(o[e]) === "[object Object]") {
            transverseProps(o[e])
        }else {
            response[e] = o[e];
        }
    });

    transverseProps(object);
    return response;
}

export const toJSON = (value) => {
    return JSON.stringify(value);
}


export const isPrimitive = (target) => {
                let primitives = ["[object String]", "[object Number]", "[object Boolean]", "[object Null]", "[object Undefined]"]
                if(primitives.indexOf(Object.prototype.toString.call(target)) > -1) {
                    return true;
                }
                return false;
}

export const objectTransverser = (object) => {
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

export const objectComparer = (object, secondObject, differencesAccumulator) => {
    //TODO: DRY this up
        let diffFirstToSecond = Object.keys(object).reduce((differences, element) => {
                    //check if object[element] exists on both objects.If it does't, return that as a difference
                    if(secondObject[element] === undefined) {                    
                        differences["removidos"] ? differences["removidos"][element] = object[element] : differences["removidos"] = {[element]: object[element]};
                        return differences;
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
/********************************************************************************************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */
        let diffSecondToFirst = Object.keys(secondObject).reduce((differences, element) => {
                    //check if object[element] exists on both objects.If it does't, return that as a difference
                    if(object[element] === undefined) {
                            differences["añadidos"] ? differences["añadidos"][element] = secondOject[element] : differences["añadidos"] = {[element]: secondObject[element]};
                            return differences;
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

    return objectAssign({}, diffFirstToSecond, diffSecondToFirst);
   }
