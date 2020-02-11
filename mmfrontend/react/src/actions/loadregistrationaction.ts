import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';

class LoadRegistrationAction {

    constructor() {
        Dispatcher.dispatch( {
            actionType: ActionType.LOAD_REGISTRATION_ACTION
        });
    }
}

export default LoadRegistrationAction;
