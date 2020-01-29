import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';
import { User } from '../types/user/user';
import ErrorData from '../dataservices/typings/errordata';

class LoginAction {
    private _user: User;
    private _loginError: ErrorData;

    constructor(user: User, error?: ErrorData) {
        this._user = user;
        this._loginError = error;
        Dispatcher.dispatch( {
            actionType: ActionType.LOGIN,
            user: this.user,
            loginError: this.loginError
        });
    }

    /**
     * Gets the details of the logged in user.
     */
    public get user(): User {
        return this._user;
    }

    /**
     * Returns the error if any.
     */
    public get loginError(): ErrorData {
        return this._loginError;
    }
}

export default LoginAction;
