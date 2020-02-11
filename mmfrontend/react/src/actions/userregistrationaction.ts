import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';
import { User } from '../types/user/user';

class UserRegistrationAction {
    private _user: User;

    constructor(user: User) {
        this._user = user;
        Dispatcher.dispatch( {
            actionType: ActionType.USER_REGISTERED_ACTION,
            user: this.user
        });
    }

    /**
     * Gets the details of the registered user.
     */
    public get user(): User {
        return this._user;
    }
}

export default UserRegistrationAction;
