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

export const isArray = (object) => {
    return Object.prototype.toString.call(object) === "[object Array]";
}

export const isPOJO = (object) => {
    // POJO => "Plain Old Javascript Object"
    return Object.prototype.toString.call(object) === "[object Object]"
}
export const isOnlyNumbers = (object) => {
    return parseInt(object) == object; 
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

export const getObjectSchema = (object) => {
    //devuelve un objeto tipo:
    // {
//      Listado: ["a", "b", "c", {d:["z", "x", "y"]} ]
//          }
// con el schema del objeto dado
    let usedObject = object;

    return Object.keys(usedObject).reduce((accumulator, currentKey) => {

        if(isPrimitive(usedObject[currentKey])) {
            accumulator.push(currentKey);
            return accumulator;
        }
        accumulator.push({[currentKey]: getObjectSchema(usedObject[currentKey])});
        return accumulator;
    } , new Array) 
}

export const objectComparer = (object, secondObject, differencesAccumulator) => {
    
    //TODO: DRY this up
    // Remove differencesAccumulator, just set it here instead of as an argument

    const baseObject = object || {};
    const baseSecondObject = secondObject || {};

        let diffFirstToSecond = Object.keys(baseObject).reduce((differences, element) => {
                    //check if object[element] exists on both objects.If it does't, return that as a difference
                    if(baseSecondObject[element] === undefined) {                    
                        differences["Removidos"] ? differences["Removidos"][element] = baseObject[element] : differences["Removidos"] = {[element]: baseObject[element]};
                        return differences;
                    }

                    //value is a primitive? check if values are equal then return the same differences if they are equal or
                    //differences with key [element] = {anterior: baseObject[element], nuevo: baseSecondObject[element]};
                    if(isPrimitive(baseObject[element]) && isPrimitive(baseSecondObject[element])) {
                        if(baseObject[element] === baseSecondObject[element]) {
                            return differences;
                        }else {
                            differences[element] = {anterior: baseObject[element], nuevo: baseSecondObject[element]};
                            return differences;
                        }
                    }
                    //Otherwise, iterate until you find a primitive 
                    else {
                        let subObjectDifferences = objectComparer(baseObject[element], baseSecondObject[element], {});
                        if(Object.keys(subObjectDifferences).length > 0) {
                            differences[element] = subObjectDifferences;
                        }
                        return differences;
                    }
                }, differencesAccumulator);

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */
        let diffSecondToFirst = Object.keys(baseSecondObject).reduce((differences, element) => {
                    //check if baseObject[element] exists on both objects.If it does't, return that as a difference
                    if(baseObject[element] === undefined) {
                            differences["Añadidos"] ? differences["Añadidos"][element] = baseSecondObject[element] : differences["Añadidos"] = {[element]: baseSecondObject[element]};
                            return differences;
                    }

                    //value is a primitive? check if values are equal then return the same differences if they are equal or
                    //differences with key [element] = {anterior: baseObject[element], nuevo: baseSecondObject[element]};
                    if(isPrimitive(baseObject[element]) && isPrimitive(baseSecondObject[element])) {
                        if(baseObject[element] === baseSecondObject[element]) {
                            return differences;
                        }else {
                            differences[element] = {anterior: baseObject[element], nuevo: baseSecondObject[element]};
                            return differences;
                        }
                    }
                    //Otherwise, iterate until you find a primitive 
                    else {
                        let subObjectDifferences = objectComparer(baseObject[element], baseSecondObject[element], {});
                        if(Object.keys(subObjectDifferences).length > 0) {
                            differences[element] = subObjectDifferences;
                        }
                        return differences;
                    }
                }, differencesAccumulator);

    return objectAssign({}, diffFirstToSecond, diffSecondToFirst);
}

export const arrayObjectProperties = (object, start = 0, end = undefined) => {

    return object.keys.slice(start, end).reduce((accumulator, currentKey) => {       
            return accumulator.concat({[currentKey]: object[currentKey]});
        },[])
}
