import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';

class AlertAction {
    private _message: string;
    private _type: string;

    constructor(message: string, type?: string) {
        this._message = message;
        this._type = type;
        Dispatcher.dispatch( {
            actionType: ActionType.ALERT_ACTION,
            message: this.message,
            hasSpinner: this.type
        });
    }

    /**
     * Returns the laert message.
     */
    public get message(): string {
        return this._message;
    }

    /**
     * Returns the alert type.
     */
    public get type(): string {
        return this._type;
    }
}

export default AlertAction;
