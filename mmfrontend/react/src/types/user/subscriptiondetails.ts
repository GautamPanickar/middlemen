import { Enums } from '../../utilities/enums';
import { Moment } from 'moment';

interface SubscriptionDetails {
    plan: Enums.SubscriptionPlan;
    status: Enums.SubscriptionStatus;
    cancelledOn?: Moment;
    nextBillingOn?: Moment;
    startedOn?: Moment;
    previousPlan?: number;
    price?: number;    
}

export default SubscriptionDetails;