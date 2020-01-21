interface AJAXResponse {
    // `data` is the response that was provided by the server
    data: any;
 
    // `status` is the HTTP status code from the server response
    status: number;
 
    // `statusText` is the HTTP status message from the server response
    statusText: string;
    
    // `headers` the headers that the server responded with
    // All header names are lower cased
    headers: any;
    
    // `config` is the config that was provided to `axios` for the request
    config: any;
    
    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request: any;
}

export default AJAXResponse;