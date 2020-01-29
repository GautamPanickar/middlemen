import LoginAction from '../actions/loginaction';
import UserDataService from '../dataservices/userdataservice';
import { User } from '../types/user/user';
import AJAXError from '../dataservices/typings/ajaxerror';

class UserActionCreator {

    /**
     * Logs in with the username and password
     * @param username 
     * @param password 
     */
    public static login(username: string, password: string): void {
        UserDataService.login(username, password)
            .then ((user: User) =>  {
                new LoginAction(user);
            }).catch((error: AJAXError) => {
                new LoginAction(undefined, error.data);
            });
    }
}

export default UserActionCreator;
