 
let utils = {
        
        saveToStorage: (header) => {
            if(!header["access-token"] || !header["uid"] || !header["client"] || !header["expiry"]) {
                // all of these headers must exist, otherwise if we refresh the localStorage the app will logout client side but not server side
                // These properties not existing happens because devise_token_auth has a default setting of minimum 5 seconds between token change
                // to allow for batch requests, so in those cases a new token will not be given

                return
            }else {
                localStorage.removeItem("session");
                localStorage.setItem("session", 
                                    JSON.stringify({"access-token": header["access-token"],
                                                    uid: header.uid,
                                                    client: header.client, 
                                                    expiry: header.expiry}));
            }
        },


        clearStorage: () => {
            localStorage.clear();
        },

        getNextAuthHeader: () => {

        },


        getCredsFromStorage: () => {

            return JSON.parse(localStorage.getItem("session"));
        },

        setQueryParams: () => {

            let params = utils.getCredsFromStorage();

            let query = Object.keys(params).reduce((prev, curr) => {
                if(curr === "expiry") { //if included => unauthorized parameter.
                    return prev;
                }
                let queryChunk = `${curr}=${params[curr]}`;
                prev.push(queryChunk);
                return prev;

            }, new Array).join("&");
            return query;
        },

        setHeaders: () => {

            let params = utils.getCredsFromStorage();

            let headers = Object.keys(params).reduce((prev, curr) => {
                if(curr === "expiry") {
                    return prev;
                }
                prev[curr] = params[curr];
                return prev;

            }, new Object);
            headers["Content-Type"] = "application/json";
            headers["Accept"] = "application/json";
            return headers;

        },


        headerToObject: (response) => {
            let headers = [];
            //this gives us headers as an array of the header's key:value pairs as an array => [key, value]
            // the end result is thus: headers === [[key1, value1], [key2, value2]..., [keyN, valueN]]
            for (var value of response.headers.entries()) {
                headers.push(value);
            }
            //transform the headers from array of arrays into POJO
            let parsedHeader = headers.reduce((prev, curr) => {

                prev[curr[0]] = curr[1];
                return prev;
            }, new Object); 
            return parsedHeader;
        }

 }

 export default utils;