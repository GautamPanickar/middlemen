import DataServiceBase from './dataservicebase';
import { User } from '../types/user/user';
import AppURL from '../utilities/urls';
import AJAXResponse from './typings/ajaxresponse';
import AJAXError from './typings/ajaxerror';

class UserDataService extends DataServiceBase {

    /**
     * Data service for authenticating the user.
     * @param username 
     * @param password 
     */
    public login(username: string, password: string): Promise<any> {
        const url = AppURL.BASE_URL + AppURL.AUTH_API_URL + '/login';
        const user: User = {
            email: username,
            password: password
        };
        return new Promise((resolve, reject) => {
            this.makeAJAXPostRequest(url, user)
            .then((response: AJAXResponse) => {
                // May have to cast the json to correct object.
                resolve(response.data);
            })
            .catch((error: AJAXError) => {
                reject(error);
            });
        });
    }
}

export default new UserDataService();