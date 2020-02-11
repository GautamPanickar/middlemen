import SubscriptionDetails from './subscriptiondetails';

interface Subscription {
    id?: string;
    company?: string;
    email?: string;
    gstNumber?: string;
    companyId?: string;
    activated?: boolean;
    details?: SubscriptionDetails;
    user_id?: string;
}

export default Subscription;