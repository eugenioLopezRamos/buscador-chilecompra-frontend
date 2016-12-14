export const saveToStorage = (header) => {
    console.log("SAVE TO STORAGE HEADER", header);
    localStorage.setItem("session", 
                         JSON.stringify({"access-token": header["access-token"],
                                         uid: header.uid,
                                         client: header.client, 
                                         expiry: header.expiry}));
}
export const clearStorage = () => {
    localStorage.clear();
}

export const getNextAuthHeader = () => {




}

export const getFromStorage = () => {

    return JSON.parse(localStorage.getItem("session"));
}

export const headerToObject = (response) => {
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

