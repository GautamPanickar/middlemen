import { EventEmitter } from 'events';
import Dispatcher from '../actioncreators/dispatcher';
import ActionType from '../actions/typings/actiontypes';
import { User } from '../types/user/user';
import LoginAction from '../actions/loginaction';
import ErrorData from '../dataservices/typings/errordata';
import UserRegistrationAction from '../actions/userregistrationaction';

export class UserStore extends EventEmitter {
    // Store variables
    private _loggedInUser: User;

    // Events
    public static LOGIN_SUCCESSFUL: string = 'LoginSuccessful';
    public static LOGIN_UNSUCCESSFUL: string = 'LoginUnsuccessful';
    public static USER_REGISTRATION_SUCCESSFUL_EVENT: string = 'UserRegistrationSuccessfulEvent';
    public static USER_REGISTRATION_UNSUCCESSFUL_EVENT: string = 'UserRegistrationUnSuccessfulEvent';


    constructor() {
        super();

        // Registering the callback
        Dispatcher.register(this.dispatcherCallback.bind(this));
    }

    // Whenever the action is dipatched from an action dispatcher
    private dispatcherCallback(action: any) {
        switch(action.actionType) {
            case ActionType.LOGIN:
                const loginAction = action as LoginAction;
                this._loggedInUser = loginAction.user;
                if (this._loggedInUser) {
                    this.emit(UserStore.LOGIN_SUCCESSFUL);
                } else {
                    this.emit(UserStore.LOGIN_UNSUCCESSFUL);
                }
                break;
            case ActionType.USER_REGISTERED_ACTION:
                const regAction = action as UserRegistrationAction;
                this._loggedInUser = regAction.user;
                if (this._loggedInUser) {
                    this.emit(UserStore.USER_REGISTRATION_SUCCESSFUL_EVENT);
                } else {
                    this.emit(UserStore.USER_REGISTRATION_UNSUCCESSFUL_EVENT);
                }                
                break;
        }
    }

    /**
     * Returns the logged in user.
     */
    public get loggedInUser(): User {
        return this._loggedInUser;
    }
}

let UserStoreInstance = new UserStore();
export default UserStoreInstance;
