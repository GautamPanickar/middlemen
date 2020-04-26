import DataServiceBase from './dataservicebase';
import { User } from '../types/user/user';
import AppURL from '../utilities/urls';
import AJAXResponse from './typings/ajaxresponse';
import AJAXError from './typings/ajaxerror';
import StorageService from './storageservice';
import { AppUtils } from '../utilities/apputils';

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
                // Store the JWT token into local storage
                const jwt = response.data.token;
                if (jwt && AppUtils.isNotEmpty(jwt.token)) {
                    StorageService.storeItem('authenticationtoken', jwt.token);
                }
                // May have to cast the json to correct object.
                resolve(response.data.user);
            })
            .catch((error: AJAXError) => {
                reject(error);
            });
        });
    }

    /**
     * Data service for registering a new user/susbcriber.
     * @param user 
     */
    public register(user: User): Promise<any> {
        const url = AppURL.BASE_URL +  AppURL.AUTH_API_URL + '/register';
        return new Promise((resolve, reject) => {
            this.makeAJAXPostRequest(url, user)
                .then((response: AJAXResponse) => {
                    // May have to cast the json to correct object.
                    resolve(response.data.user);
                })
                .catch((error: AJAXError) => {
                    reject(error);
                });
        });
    }

    /**
     * Data service for loading the suer details by user id.
     * @param userId 
     */
    public loaduserById(userId: string): Promise<any> {
        const url = AppURL.BASE_URL + AppURL.USER_API_URL + '/' + userId;
        return new Promise((resolve, reject) => {
            this.makeAJAXGetRequest(url)
            .then((response: AJAXResponse) => {
                // May have to cast the json to correct object.
                resolve(response.data.user);
            })
            .catch((error: AJAXError) => {
                reject(error);
            });
        });
    }

   /**
    * Data service for updating the user/subscriber info.
    * @param id 
    * @param user 
    * @param field 
    */
    public updateInfo(id: string, user: User, field: string): Promise<any> {
        const url = AppURL.BASE_URL +  AppURL.USER_API_URL + '/' + id + '/update?field=' + field;
        return new Promise((resolve, reject) => {
            this.makeAJAXPatchRequest(url, user)
                .then((response: AJAXResponse) => {
                    // May have to cast the json to correct object.
                    resolve(response.data.user);
                })
                .catch((error: AJAXError) => {
                    reject(error);
                });
        });
    }

    /**
     * Data service for updating an existing user/susbcriber.
     * @param user 
     */
    public update(user: User): Promise<any> {
        const url = AppURL.BASE_URL +  AppURL.USER_API_URL + '/' + user._id;
        return new Promise((resolve, reject) => {
            this.makeAJAXPutRequest(url, user)
                .then((response: AJAXResponse) => {
                    // May have to cast the json to correct object.
                    resolve(response.data.user);
                })
                .catch((error: AJAXError) => {
                    reject(error);
                });
        });
    }
}

export default new UserDataService();