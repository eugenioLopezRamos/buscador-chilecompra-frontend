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
    // So {"nested1": {
        //                 "nested2": {
        //                             "nested3": "my value is here"
        //                             }
        //              }
        // }
    // becomes response: {nested3: "my value is here"}

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