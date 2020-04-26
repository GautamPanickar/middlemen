import SubscriptionDetails from './subscriptiondetails';

interface Subscription {
    _id: string;
    email: string;
    activated: boolean;
    details: SubscriptionDetails;
    user_id: string;
}

export default Subscription;