import { Enums } from '../../utilities/enums';

interface SubscriptionDetails {
    plan: Enums.SubscriptionPlan;
    status: Enums.SubscriptionStatus;
    cancelledOn?: Date;
    nextBillingOn?: Date;
    startedOn?: Date;
    previousPlan?: number;
    price?: number;    
}

export default SubscriptionDetails;