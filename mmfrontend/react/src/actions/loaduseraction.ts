import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';
import { User } from '../types/user/user';

class LoadUserAction {
    private _user: User;

    constructor(user: User) {
        this._user = user;
        Dispatcher.dispatch( {
            actionType: ActionType.LOAD_USER_ACTION,
            user: this.user
        });
    }

    /**
     * Gets the details of the user.
     */
    public get user(): User {
        return this._user;
    }
}

export default LoadUserAction;
