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

export const camelCase = (string) => {

    //is it a camelCase string?
    if(string.match(/[a-z]{1}[\w+]*([A-Z]{1}[\w+]*)+/)[0] != string) {
        throw new Error("No es camelCase!");
    }
    else{
        return string;
    }
}

export const kebabCase = (string) => {

    if(string.split("-")[0] === string) {
        // "kebab-case".split("-") => ["kebab", "case"] => "kebab-case".split("-")[0] === "kebab" != "kebab-case"
        throw new Error("No es kebab-case")
    }else {
        return string;
    }


}

export const snakeCase = (string) => {

    if(string.split("_")[0] === string) {

        throw new Error("No es snakeCase");

    }else {

        return string;

    }

}

export const determineCase = (string) => {
    


}

export const toCase = (toCase, string) => {




}


export const changeCase = (string, fromCase, toCase) => {

 
            

}