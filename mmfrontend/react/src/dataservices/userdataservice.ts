import DataServiceBase from './dataservicebase';
import { User } from '../types/user/user';
import AppURL from '../utilities/urls';
import AJAXResponse from './typings/ajaxresponse';

class UserDataService extends DataServiceBase {

    /**
     * Data service for authenticating the user.
     * @param username 
     * @param password 
     */
    public login(username: string, password: string): Promise<User> {
        const url = AppURL.BASE_URL + AppURL.USER_API_URL;
        const user: User = {
            email: username,
            password: password
        };
        return this.makeAJAXPostRequest(url, user);
    }
}

export default new UserDataService();