import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';

class LogoutAction {

    constructor() {
        Dispatcher.dispatch( {
            actionType: ActionType.LOGOUT
        });
    }
}

export default LogoutAction;