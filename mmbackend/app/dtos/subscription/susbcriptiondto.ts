import SubscriptionDetailsDTO from './subscriptiondetailsdto';

interface SubscriptionDTO {
    id: string;
    company: string;
    email: string;
    gstNumber: string;
    companyId: string;
    activated: boolean;
    details: SubscriptionDetailsDTO;
    user_id: string;
}

export default SubscriptionDTO;