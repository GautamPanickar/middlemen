import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';
import { User } from '../types/user/user';

class LoginAction {
    private _user: User;

    constructor(user: User) {
        this._user = user;
        Dispatcher.dispatch( {
            actionType: ActionType.LOGIN,
            user: this.user
        });
    }

    /**
     * Gets the details of the logged in user.
     */
    public get user(): User {
        return this._user;
    }
}

export default LoginAction;
