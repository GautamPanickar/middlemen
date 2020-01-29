import AJAXResponse from './typings/ajaxresponse';
import AJAXError from './typings/ajaxerror';

const axios = require('axios').default;

class DataServiceBase {

    /**
     * Makes an AJAX POST request to the sever for creating or updating data.
     * @param url 
     * @param data 
     * @param params 
     */
    public makeAJAXPostRequest(url: string, data: any, params?: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: data
            })
            .then((response: AJAXResponse) => {
                resolve(response);
            })
            .catch((error: any) => {
                reject(error.response);
            });
        });
    }

    /**
     *  Makes an AJAX PUT request to the server for updating data.
     * @param url 
     * @param data 
     * @param params 
     */
    public makeAJAXPutRequest(url: string, data: any, params?: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: url,
                data: data
            })
            .then((response: AJAXResponse) => {
                resolve(response);
            })
            .catch((error: any) => {
                reject(error);
            });
        });
    }

    /**
     * Makes an AJAX Patch request to the server for performing light-weight updates.
     * @param url 
     * @param params 
     */
    public makeAJAXPatchRequest(url: string, params?: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'patch',
                url: url
            })
            .then((response: AJAXResponse) => {
                resolve(response);
            })
            .catch((error: any) => {
                reject(error);
            });
        });
    }

    /**
     * Makes an AJAX Get request to the server for fetching data.
     * @param url 
     * @param params 
     */
    public makeAJAXGetRequest(url: string, params?: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url
            })
            .then((response: AJAXResponse) => {
                resolve(response);
            })
            .catch((error: any) => {
                reject(error);
            });
        });
    }
}

export default DataServiceBase;