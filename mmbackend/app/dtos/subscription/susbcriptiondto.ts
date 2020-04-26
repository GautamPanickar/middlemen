import SubscriptionDetailsDTO from './subscriptiondetailsdto';

interface SubscriptionDTO {
    id: string;
    email: string;
    activated: boolean;
    details: SubscriptionDetailsDTO;
    user_id: string;
}

export default SubscriptionDTO;