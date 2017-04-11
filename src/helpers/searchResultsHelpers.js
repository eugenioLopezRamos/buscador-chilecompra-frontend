import objectAssign from 'object-assign';
import * as utils from '../utils/miscUtils';

export const applyFilter = (selectedItems, results) => {
  
            let columns = results.map(currentResult => {
              
                let newObject = {};
                selectedItems.map(subElement => {
                //selectedItems is an array of arrays! Need to flatten.
                    return subElement.reduce((prev, curr, currIndex) => {

                    //on the last item, do special stuff
                    if(currIndex === subElement.length -1) {
                        let value = "No incluye campo o está vacío";
                        try { value = prev[curr]; }
                        catch(error){value = "No incluye campo o está vacío";}

                        //Some fields(keys of the JSON object) exist more than once, on different levels of "deepness" within
                        // the object's structure. In this case, we append the previous key, to make it
                        // easier to differentiate them
                        if(newObject[curr]) {
                            let previousItemKey = subElement[currIndex-1] ? subElement[currIndex-1] : "Base";
                            if(utils.isOnlyNumbers(previousItemKey)) {
                                previousItemKey = `${parseInt(previousItemKey) + 1})`;
                            }
                            return newObject[`${previousItemKey}${curr}`] = value;
                        }
                        return newObject[curr] = value;
                    }

                    return prev[curr];

                    }, currentResult.value);
                });
                
                return newObject;
            });

            return columns;
        };

export const sortByColumn = (field, order, searchQueryValues) => {
         //Currently disabled. 

         
         // It works, but the results are not stable so it looks really weird.
         // Once I solve the stability issue, this should be used 
         //when the totalresults count is <= 200 (or whatever the limit is)

           // So, here we'll have 2 ways of sorting. 
           // If results.count > {RESULTS_OFFSET_AMOUNT} from /src/constants/resultsOffset.js (as of this writing, 200)
           // send a request to the server, get the results again, order them, THEN send them back over to frontend
           // If results.count <= limit hacerlo local (that is, in the frontend)


           // This is done HERE: 
                    // if(this.props.results.count <= 200) {
                    //   //  alert("menor q 200");
                    //     let results = this.props.results;
                    //     return someFile.sortResultsInFrontend(results, field, order);

                    
                    // }
            // However the sort is not stable so it looks weird when you make it "change"
            // by spamming click on column X (which stays as is), which makes the other columns
            // move around

            let newQueryValues = objectAssign({}, searchQueryValues);
            // object assign doesnt deep clone.
            newQueryValues.order_by = objectAssign({}, searchQueryValues.order_by);
            newQueryValues.order_by.order = order;
       

            newQueryValues.order_by.fields = field;
            return newQueryValues;
            
         };