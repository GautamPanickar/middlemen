import { Enums } from '../utilities/enums';
import { PlanDisplayInfo } from '../types/others/plandisplayinfo';
import SubscriptionDetails from '../types/user/subscriptiondetails';
import { AppUtils } from '../utilities/apputils';
import { Address } from '../types/user/address';

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

    /**
     * Checks if the subscription has expired.
     * @param subscription 
     */
    public static hasSubscriptionExpired(subscription: SubscriptionDetails): boolean {
        const nextBillingDate: Date = new Date(subscription.nextBillingOn);
        return AppUtils.isDateAfter(new Date(), nextBillingDate) && subscription.status.toString() !== 'CANCELED';
    }

    /**
     * Checks if the subscription is expiring today.
     * @param {SubscriptionDetails} subscription
     */
    public static isSubscriptionExpiringToday(subscription: SubscriptionDetails): boolean {
        const nextBillingDate: Date = new Date(subscription.nextBillingOn);
        return AppUtils.areSameDates(new Date(), nextBillingDate) && subscription.status.toString() !== 'CANCELED';
    }

    /**
     * Returns the subscriber address HTML as a string;
     * Note: This method could only be used for injecting as 'innerHTML'
     * @param {Address} address
     * @returns {string}
     */
    public static getSubscriberAddress(address: Address): string {
        return (
            '<p class="mb-0">' +
            address.line1 +
            ', ' +
            address.city +
            ', ' +
            'PIN: ' +
            address.zipCode +
            ', ' +
            address.state +
            ', ' +
            address.country +
            '</p>' +
            '<p class="m-0 font-weight-light"><small><i class="fas fa-envelope"></i> ' +
            address.email +
            '</small></p> '
        );
    }

     /**
     * Returns the plan status.
     */
    public static getPlanStatus(plan: Enums.SubscriptionStatus): string {
        switch (plan) {
            case Enums.SubscriptionStatus.ACTIVE: return 'ACTIVE';
            case Enums.SubscriptionStatus.PENDING: return 'PENDING';
            case Enums.SubscriptionStatus.CANCELED: return 'CANCELED';
            case Enums.SubscriptionStatus.DISABLED: return 'DISABLED';
        }
    }
}
