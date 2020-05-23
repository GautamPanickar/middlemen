import SubscriptionModel from '../../models/subscription/subscriptionmodel';
import SubscriptionDTO from '../../dtos/subscription/susbcriptiondto';
import { AppUtils } from '../../utils/apputils';
import Subscription from '../../types/subscription/subscription';
import { Enums } from '../../utils/enums';
import SomethingWrongException from '../../utils/exceptions/base/somethingwrongexception';
import CustomException from '../../utils/exceptions/customexception';
import PlanDTO from '../../dtos/subscription/plandto';
import Plan from '../../types/subscription/plan';
import PlanModel from '../../models/subscription/planmodel';


class SubscriptionService {
    private subscription = SubscriptionModel;
    private plan = PlanModel;

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
        try {
            if (AppUtils.isEmpty(dto.id) && dto.details) {
                // New Subscription is initially created with a pending status. 
                // Only after the payment would the plan be activated.
                dto.details.status = Enums.SubscriptionStatus.PENDING;
                dto.details.startedOn = undefined;
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
                    throw new CustomException('Could not find the subscription');
                }
            }
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }

    /**
     * Activates the usbcription.
     * @param id 
     */
    public async activateSubscription(id: string) {
        try {
            const subscritpionToUpdate: Subscription = await this.findById(id);
            if (subscritpionToUpdate) {
                subscritpionToUpdate.activated = true;
                subscritpionToUpdate.details.status = Enums.SubscriptionStatus.ACTIVE;
                const currentDate: Date = new Date();
                const nextDate: Date = new Date();
                nextDate.setFullYear(currentDate.getFullYear() + 1);
                subscritpionToUpdate.details.startedOn = currentDate;
                subscritpionToUpdate.details.nextBillingOn = nextDate;
                subscritpionToUpdate.details.cancelledOn = undefined;
                const updatedSubscription: Subscription = await this.subscription.save({...subscritpionToUpdate});
                return updatedSubscription;
            } else {
                throw new CustomException('Could not find the subscription');
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
            const subscritpionToUpdate: Subscription = await this.findById(id);
            if (subscritpionToUpdate) {
                subscritpionToUpdate.activated = false;
                subscritpionToUpdate.details.status = Enums.SubscriptionStatus.CANCELED;
                subscritpionToUpdate.details.cancelledOn = new Date();
                const updatedSubscription: Subscription = await this.subscription.save({...subscritpionToUpdate});
                return updatedSubscription;
            } else {
                throw new CustomException('Could not find the subscription');
            }
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }

    /**
     * Returns the subcription plan for the given id or app.
     * @param id 
     * @param appId 
     */
    public async findPlanById(id: string, appId?: string) {
        if (AppUtils.isNotEmpty(appId)) {
            return this.plan.find({_id: id, app_id: appId});
        } else {
            return this.plan.findById(id);
        }
    }

    /**
     * Finds the subscription plans for the app
     * @param appId 
     */
    public async findPlansForApp(appId: string) {
        return this.plan.find({app_id: appId});
    }

    /**
     * Saves the subscription plan for the user.
     * Only admins can do this stuff.
     * @param dto
     */
    public async savePlan(dto: PlanDTO) {
        try {
            if (AppUtils.isEmpty(dto._id)) {
                dto.code = AppUtils.getPlanCode(dto.name);
                const newPlan: Plan = await this.plan.create({...dto});
                return newPlan;
            } else {
                // Updating an exisiting plan
                const planToUpdate: Plan = await this.findPlanById(dto._id, dto.app_id);
                if (planToUpdate) {
                    planToUpdate.active = dto.active;
                    planToUpdate.updatedBy = dto.updatedBy;
                    planToUpdate.features = dto.features;
                    planToUpdate.name = dto.name;
                    planToUpdate.description = dto.description;
                    planToUpdate.price = dto.price;
                    const model = new PlanModel(planToUpdate);
                    const updatedPlan: Plan = await model.save();
                    return updatedPlan;
                }
                
            }
        } catch (error) {
            throw new SomethingWrongException(error);
        }
        return dto;
    }
}

export default SubscriptionService;
