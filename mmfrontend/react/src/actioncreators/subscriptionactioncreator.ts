import Subscription from '../types/user/subscription';
import SubscriptionDataService from '../dataservices/subscriptiondataservice';
import LoadSubscriptionAction from '../actions/loadsubscriptionaction';
import AJAXError from '../dataservices/typings/ajaxerror';

class SubscriptionActionCreator {

    /**
     * Loads all the susbcriptions for the user with the given id.
     * @param userId 
     */
    public static loadSubscriptionsForUser(userId: string): void {
        SubscriptionDataService.loadByUser(userId)
            .then ((subscriptions: Subscription[]) =>  {
                new LoadSubscriptionAction(subscriptions);
            }).catch((error: AJAXError) => {
                // Error pripagation. May be the error popup.
            });
    }
}

export default SubscriptionActionCreator;