import { Enums } from '../utilities/enums';
import { PlanDisplayInfo } from '../types/others/plandisplayinfo';

export class SubscriptionHelper {

    /**
     * Returns the plan information for display with minimum details for the given plan.
     */
    public static getPlanInfo(plan: Enums.SubscriptionPlan): PlanDisplayInfo {
        switch (plan) {
            case Enums.SubscriptionPlan.PLAN_1: return { name: 'Plan 1', price: 0 };
            case Enums.SubscriptionPlan.PLAN_2: return { name: 'Plan 2', price: 1000 };
            case Enums.SubscriptionPlan.PLAN_3: return { name: 'Plan 3', price: 2000};
        }
    }

    /**
     * Returns the default details of the plan given.
     * @param plan 
     */
    public static getDefaultPlansInfo(plan: Enums.SubscriptionPlan): PlanDisplayInfo {
        switch (plan) {
            case Enums.SubscriptionPlan.PLAN_1: 
                return { name: 'Plan 1', price: 0, subText: [
                    'Lorem ipsum dolor sit amet',
                    'Excepteur sint occaecat cupidatat',
                    'Duis aute irure dolor'
                ]};
            case Enums.SubscriptionPlan.PLAN_2: 
                return { name: 'Plan 2', price: 1000, subText: [
                    'Lorem ipsum dolor sit amet',
                    'Excepteur sint occaecat cupidatat',
                    'Duis aute irure dolor'
                ]};
            case Enums.SubscriptionPlan.PLAN_3: 
                return { name: 'Plan 3', price: 2000, subText: [
                    'Lorem ipsum dolor sit amet',
                    'Excepteur sint occaecat cupidatat',
                    'Duis aute irure dolor'
                ]};
        }
    }
}
