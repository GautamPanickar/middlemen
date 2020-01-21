import LoginAction from '../actions/loginaction';
import UserDataService from '../dataservices/userdataservice';
import { User } from '../types/user/user';

class UserActionDispatcher {

    /**
     * Logs in with the username and password
     * @param username 
     * @param password 
     */
    public static login(username: string, password: string): void {
        UserDataService.login(username, password)
            .then ((user: User) =>  {
                new LoginAction(user);
            }).catch((error: Error) => {

            });
    }
}

export default UserActionDispatcher;
