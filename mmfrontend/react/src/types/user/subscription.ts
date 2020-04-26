import SubscriptionDetails from './subscriptiondetails';

interface Subscription {
    id?: string;
    email?: string;
    activated?: boolean;
    details?: SubscriptionDetails;
    user_id?: string;
}

export default Subscription;