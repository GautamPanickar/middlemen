import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';
import Subscription from '../types/user/subscription';

class LoadSubscriptionAction {
    private _subscriptions: Subscription[];

    constructor(subscriptions: Subscription[]) {
        this._subscriptions = subscriptions;
        Dispatcher.dispatch( {
            actionType: ActionType.LOAD_SUBSCRIPTION_ACTION,
            subscriptions: this.subscriptions
        });
    }

    /**
     * Returns the loaded subscriptions for the user.
     */
    public get subscriptions(): Subscription[] {
        return this._subscriptions;
    }
}

export default LoadSubscriptionAction;
