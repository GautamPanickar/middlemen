import { EventEmitter } from 'events';
import Dispatcher from '../actiondispatchers/dispatcher';
import ActionType from '../actions/typings/actiontypes';
import { User } from '../types/user/user';
import LoginAction from '../actions/loginaction';

class UserStore extends EventEmitter {
    // Store variables
    private _loggedInUser: User;

    // Events
    public static LOGIN_SUCCESSFUL: string = 'LoginSuccessful';

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
                this.emit(UserStore.LOGIN_SUCCESSFUL);
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

export default UserStore;
