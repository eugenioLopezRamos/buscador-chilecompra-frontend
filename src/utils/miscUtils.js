import objectAssign from 'object-assign';

export const capitalize = (string) => {
    if(!string) {return string;}
    return string.slice(0, 1)
                 .toUpperCase()
                 .concat(string.slice(1));
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

    let response = {};
	
    let transverseProps = (o) => Object.keys(o).map((e) => {
        if(Object.prototype.toString.call(o[e]) === "[object Object]") {
            transverseProps(o[e]);
        }else {
            response[e] = o[e];
        }
    });

    transverseProps(object);
    return response;
};

export const isArray = (object) => {
    return Object.prototype.toString.call(object) === "[object Array]";
};

export const isPOJO = (object) => {
    // POJO => "Plain Old Javascript Object"
    return Object.prototype.toString.call(object) === "[object Object]";
};
export const isOnlyNumbers = (object) => {
    return parseInt(object) == object; 
};

export const isPrimitive = (target) => {
                let primitives = ["[object String]", "[object Number]", "[object Boolean]", "[object Null]", "[object Undefined]"];
                if(primitives.indexOf(Object.prototype.toString.call(target)) > -1) {
                    return true;
                }
                return false;
};

export const objectTransverser = (object) => {
        //returns an array with each "tree" of properties
        return Object.keys(object).map((element) => {
                    if(isPrimitive(object[element])) {
                        return {[element]: object[element]};
                    }
                    return {[element]: objectTransverser(object[element])};
                });
};

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
    } , new Array); 
};

export const resultComparerFn = (object, secondObject) => {
    
    const baseObject = object || {};
    const secondBaseObject = secondObject || {};

    let diffFirstToSecond = compareObjects(baseObject, secondBaseObject, "Añadidos", whenUndefined, whenPrimitive, whenIsOtherType);
    let diffSecondToFirst = compareObjects(secondBaseObject, secondBaseObject, "Removidos", whenUndefined, whenPrimitive, whenIsOtherType);
    return objectAssign({}, diffFirstToSecond, diffSecondToFirst);
};

export const compareObjects = (firstObject, secondObject, differencesKeyName, whenUndefined, whenPrimitive, whenIsOtherType) => {

        return Object.keys(firstObject).reduce((differences, key) => {
                    //check if object[key] exists on both objects.If it does't, return that as a difference
                    if(secondObject[key] === undefined) {                
                        return whenUndefined(differences, differencesKeyName, firstObject, key);
                    }
                    //value is a primitive? check if values are equal then return the same differences if they are equal or
                    //differences with key [key] = {anterior: baseObject[key], nuevo: baseSecondObject[key]};
                    if(isPrimitive(firstObject[key]) && isPrimitive(secondObject[key])) {
                        return whenPrimitive(differences, firstObject, secondObject, key);
                    }
                    //Otherwise, iterate until you find a primitive 
                    return whenIsOtherType(differences, resultComparerFn, firstObject, secondObject, key);

                }, {});
};

export const whenUndefined = (differences, differencesKeyName, firstObject, key) => {

    if(differences[differencesKeyName]) {
        return differences[differencesKeyName][key] = firstObject[key];
    }
    return differences[differencesKeyName] = {[key]: firstObject[key]};
      
};

export const whenPrimitive = (differences, firstObject, secondObject, key) => {
    if(firstObject[key] === secondObject[key]) {
        return differences;
    }
    differences[key] = {Anterior: firstObject[key], Nuevo: secondObject[key]};
    return differences;    
};

export const whenIsOtherType = (differences, resultComparerFn, firstObject, secondObject, element) => {
    let subObjectDifferences = resultComparerFn(firstObject[element], secondObject[element], {});
    if(Object.keys(subObjectDifferences).length > 0) {
        differences[element] = subObjectDifferences;
    }
    return differences;
};


export const arrayObjectProperties = (object, start = 0, end = undefined) => {

    return object.keys.slice(start, end).reduce((accumulator, currentKey) => {       
            return accumulator.concat({[currentKey]: object[currentKey]});
        },[]);
};

export const toSentenceCase = (matcher, string) => {

    let matches = matcher(string);
    return matches.map((word, index) => {
                if(index > 0) {
                    return word.toLowerCase();
                }
                return word;
            }).join(" ");   
};

export const caseMatcher = (regex) => {

    const matcher = (regex, string, startIndex = 0, chunks = []) => {
        if(startIndex >= string.length) {
            return chunks;
        }
        let chunk = string.slice(startIndex).match(regex);
        // result is expected to be an array of matches
        // so no match => an array with just the original string
        if(!chunk || chunk.length === 0) {return [string];}
        let newIndex = startIndex + chunk[0].length;
        chunks.push(chunk[0]);
        return matcher(regex, string, newIndex, chunks);
    };
    return matcher.bind(undefined, regex);
};

export const pascalCaseMatcher = (() => {
    const pascalCaseRegex = new RegExp("[A-Z]{1}[a-z]*");
    return caseMatcher(pascalCaseRegex);
})();

export const pascalCaseToSentenceCase = toSentenceCase.bind(undefined, pascalCaseMatcher);


export const removeArrayFromArray = (array, containerArray) => {
    
    const arrayToRemove = JSON.stringify(array);
    //search the index of the item that's already in the array
    // This will return the LAST instance as it is a loop
    const toSplice = containerArray.reduce((accumulator, currentElement, index) => {
                        if(JSON.stringify(currentElement) === arrayToRemove) {
                            accumulator.push(index);
                        }
                        return accumulator;
                    }, []);

    if(toSplice.length === 0) {return containerArray;}
    //remove those items from the array
    toSplice.forEach((indexToSplice) => {
        containerArray.splice(indexToSplice, 1);
    }); 
    return containerArray;
};

export const chunkifyArray = (array, itemsPerChunk = 1) => {

    function createChunk(array, start, size, result = []) {

        if(start >= array.length) {
            return result;
        }

        let chunk = array.slice(start, start + size);
        result.push(chunk);

        return createChunk(array, start + size, size, result);
    }

    return createChunk(array, 0, itemsPerChunk);
};