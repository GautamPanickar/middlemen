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
        return this.subscription.find({user_id: userId});
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

    /**
     * Activates the usbcription.
     * @param id 
     */
    public async activateSubscription(id: string) {
        try {
            let subscritpionToUpdate: Subscription = await this.findById(id);
            if (subscritpionToUpdate) {
                subscritpionToUpdate.activated = true;
                subscritpionToUpdate.companyId = AppUtils.uniqueCompanyId;
                subscritpionToUpdate.details.status = Enums.SubscriptionStatus.ACTIVE;
                let currentDate: Date = new Date();
                let nextDate: Date = new Date();
                nextDate.setFullYear(currentDate.getFullYear() + 1);
                subscritpionToUpdate.details.startedOn = currentDate;
                subscritpionToUpdate.details.nextBillingOn = nextDate;
                subscritpionToUpdate.details.cancelledOn = null;
                const updatedSubscription: Subscription = await this.subscription.save({...subscritpionToUpdate});
                return updatedSubscription;
            } else {
                throw new CustomException("Could not find the subscription");
            }
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }

    /**
     * Cancelas the usbcription.
     * @param id 
     */
    public async cancelSubscription(id: string) {
        try {
            let subscritpionToUpdate: Subscription = await this.findById(id);
            if (subscritpionToUpdate) {
                subscritpionToUpdate.activated = false;
                subscritpionToUpdate.details.status = Enums.SubscriptionStatus.CANCELED;
                subscritpionToUpdate.details.cancelledOn = new Date();
                const updatedSubscription: Subscription = await this.subscription.save({...subscritpionToUpdate});
                return updatedSubscription;
            } else {
                throw new CustomException("Could not find the subscription");
            }
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }
}

export default SubscriptionService;
