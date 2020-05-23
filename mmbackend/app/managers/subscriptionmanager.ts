import { AppUtils } from '../utils/apputils';
import CustomException from '../utils/exceptions/customexception';
import PlanDTO from '../dtos/subscription/plandto';
import Plan from '../types/subscription/plan';
import SubscriptionService from '../services/subscription/subscriptionservice';

class SubscriptionManager {
    public subscriptionService: SubscriptionService;

    public constructor() {
        this.subscriptionService = new SubscriptionService();
    }

    /**
     * Saves the subscription plan.
     * @param dto 
     */
    public async savePlan(dto: PlanDTO): Promise<Plan> {
        const errors: string[] = this.validatePlan(dto);
        try {
            if (errors.length > 0) {
                throw new CustomException(errors.toString());
            } else {
                return await this.subscriptionService.savePlan(dto);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validates the properties of the plan.
     * @param dto 
     */
    private validatePlan(dto: PlanDTO): string[] {
        const errors: string[] = [];
        if (AppUtils.isEmpty(dto.name)) {
            errors.push('Name of the plan cannot be empty');
        }
        if (AppUtils.isEmpty(dto.description)) {
            errors.push('Description of the plan cannot be empty');
        }
        if (AppUtils.isEmpty(dto.app_id)) {
            errors.push('App details should be provided');
        }
        if (dto.active === undefined || dto.active === null) {
            dto.active = false;
        }
        if (!dto.features || dto.features.length <= 0) {
            errors.push('Features of the plan cannot be empty');
        }
        if (dto.price === undefined || dto.price === null) {
            errors.push('Price of the plan needs to be provided');
        }
        return errors;
    }
}

export default SubscriptionManager;