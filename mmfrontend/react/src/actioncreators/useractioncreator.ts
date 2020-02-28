import LoginAction from '../actions/loginaction';
import UserDataService from '../dataservices/userdataservice';
import { User } from '../types/user/user';
import AJAXError from '../dataservices/typings/ajaxerror';
import LoadRegistrationAction from '../actions/loadregistrationaction';
import UserRegistrationAction from '../actions/userregistrationaction';
import AlertAction from '../actions/alertaction';
import LogoutAction from '../actions/logoutaction';
import LoadUserAction from '../actions/loaduseraction';
import { AppUtils } from '../utilities/apputils';
import StorageService from '../dataservices/storageservice';

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
                new LoginAction(undefined);
                new AlertAction(error.data.message);
            });
    }

    /**
     * Loads the registration section for user/susbcriber registration.
     */
    public static loadRegistrationSection(): void {
        new LoadRegistrationAction();
    }

    /**
     * Registers the user and fires corresponding action after successful regitration.
     * @param user 
     */
    public static register(user: User): void {
        UserDataService.register(user)
            .then((user: User) => {
                new UserRegistrationAction(user);
            }).catch((error: AJAXError) => {
                new AlertAction(error.data.message);
            });
    }

    /**
     * Action to logout the user.
     */
    public static logout(): void {
        new LogoutAction();
    }

    /**
     * Loads the details of the suer with the given user id.
     * If user id is not provided then stored userid is fetched from local/session storage.
     * @param userId 
     */
    public static loadUserDetails(userId?: string): void {
        if (AppUtils.isEmpty(userId)) {
            userId = StorageService.retrieveItem('loggedinuserid');
        }
        if (AppUtils.isNotEmpty(userId)) {
            UserDataService.loaduserById(userId)
                .then((user: User) => {
                    new LoadUserAction(user);
                }).catch((error: AJAXError) => {
                    // handle error via popup
                });
        }
    }
}

export default UserActionCreator;
