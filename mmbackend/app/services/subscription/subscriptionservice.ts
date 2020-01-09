import SubscriptionModel from '../../models/subscription/subscriptionmodel';
import SubscriptionDTO from '../../dtos/subscription/susbcriptiondto';
import { AppUtils } from '../../utils/apputils';
import Subscription from '../../types/subscription/subscription';
import { Enums } from '../../utils/enums';
import SomethingWrongException from '../../utils/exceptions/base/somethingwrongexception';
import CustomException from '../../utils/exceptions/customexception';


class SubscriptionService {
    private subscription = SubscriptionModel;

    constructor() {
    }

    /**
     * Returns the subscriptions for the user.
     * @param userId 
     */
    public async findSubscriptionsForUser(userId: string) {
        return null;
    }

    /**
     * Returns the subcription for the given id.
     * @param id 
     */
    public async findById(id: string) {
        return this.subscription.findById(id);
    }

    /**
     * Saves the subscription for the user.
     * @param dto 
     * @param userId 
     */
    public async saveSubscription(dto: SubscriptionDTO, userId?: string) {
        if (AppUtils.isNotEmpty(dto.company)) {
            try {
                if(AppUtils.isEmpty(dto.id) && dto.details) {
                    // New Subscription is initially created with a pending status. 
                    // Only after the payment would the plan be activated.
                    dto.details.status = Enums.SubscriptionStatus.PENDING;
                    dto.details.startedOn = null;
                    const newSubscription: Subscription = await this.subscription.create({...dto,
                        user_id: AppUtils.isNotEmpty(userId) ? userId : dto.user_id, 
                        activated: false});
                    return newSubscription;
                } else {
                    // Exisiting subscription getting updated
                    if (await this.findById(dto.id)) {
                        const updatedSubscription: Subscription = await this.subscription.save({...dto});
                        return updatedSubscription;
                    } else {
                        throw new CustomException("Could not find the subscription");
                    }
                }
            } catch (error) {
                throw new SomethingWrongException(error);
            }
        }
    }
}

export default SubscriptionService;
