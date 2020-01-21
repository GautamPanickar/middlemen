import AJAXResponse from './typings/ajaxresponse';

const axios = require('axios').default;

class DataServiceBase {

    /**
     * Makes an AJAX POST request to the sever for creating or updating data.
     * @param url 
     * @param data 
     * @param params 
     */
    public makeAJAXPostRequest(url: string, data: any, params?: string[]): Promise<any> {
        axios({
            method: 'post',
            url: url,
            data: data
        }).then((response: AJAXResponse) => {
            return Promise.resolve(response.data);
        }, (error: Error) => {
            return Promise.reject(error);
        });
        return null;
    }

    /**
     *  Makes an AJAX PUT request to the server for updating data.
     * @param url 
     * @param data 
     * @param params 
     */
    public makeAJAXPutRequest(url: string, data: any, params?: string[]): Promise<any> {
        axios({
            method: 'put',
            url: url,
            data: data
        }).then((response: AJAXResponse) => {
            return Promise.resolve(response.data);
        }, (error: Error) => {
            return Promise.reject(error);
        });
        return null;
    }

    /**
     * Makes an AJAX Patch request to the server for performing light-weight updates.
     * @param url 
     * @param params 
     */
    public makeAJAXPatchRequest(url: string, params?: string[]): Promise<any> {
        axios({
            method: 'patch',
            url: url
        }).then((response: AJAXResponse) => {
            return Promise.resolve(response.data);
        }, (error: Error) => {
            return Promise.reject(error);
        });
        return null;
    }

    /**
     * Makes an AJAX Get request to the server for fetching data.
     * @param url 
     * @param params 
     */
    public makeAJAXGetRequest(url: string, params?: string[]): Promise<any> {
        axios({
            method: 'get',
            url: url
        }).then((response: AJAXResponse) => {
            return Promise.resolve(response.data);
        }, (error: Error) => {
            return Promise.reject(error);
        });
        return null;
    }
}

export default DataServiceBase;