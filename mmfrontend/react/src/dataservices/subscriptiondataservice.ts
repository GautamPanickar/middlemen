import DataServiceBase from './dataservicebase';
import AppURL from '../utilities/urls';
import AJAXResponse from './typings/ajaxresponse';
import AJAXError from './typings/ajaxerror';

class SubscriptionDataService extends DataServiceBase {

    /**
     * Data service for loading susbcriptions for the user.
     * @param userId 
     */
    public loadByUser(userId: string): Promise<any> {
        const url = AppURL.BASE_URL + AppURL.SUBSCRIPTION_URL + '/user/' + userId;
        return new Promise((resolve, reject) => {
            this.makeAJAXGetRequest(url)
            .then((response: AJAXResponse) => {
                // May have to cast the json to correct object.
                resolve(response.data.subscriptions);
            })
            .catch((error: AJAXError) => {
                reject(error);
            });
        });
    }
}

export default new SubscriptionDataService();