import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';
import { User } from '../types/user/user';

class UserInfoUpdateAction {
    private _user: User;

    constructor(user: User) {
        this._user = user;
        Dispatcher.dispatch( {
            actionType: ActionType.USER_INFO_UPDATED_ACTION,
            user: this.user
        });
    }

    /**
     * Gets the details of the updated user.
     */
    public get user(): User {
        return this._user;
    }
}

export default UserInfoUpdateAction;
