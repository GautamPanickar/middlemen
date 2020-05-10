import { Enums } from '../utilities/enums';
import { PlanDisplayInfo } from '../types/others/plandisplayinfo';
import SubscriptionDetails from '../types/user/subscriptiondetails';
import { AppUtils } from '../utilities/apputils';
import { Address } from '../types/user/address';
import { Moment } from 'moment';
import moment = require('moment');
import BalanceAmount from '../components/typings/balanceamount';

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
        return AppUtils.isDateAfter(moment(), subscription.nextBillingOn) && subscription.status.toString() !== 'CANCELED';
    }

    /**
     * Checks if the subscription is expiring today.
     * @param {SubscriptionDetails} subscription
     */
    public static isSubscriptionExpiringToday(subscription: SubscriptionDetails): boolean {
        return AppUtils.areSameDates(moment(), subscription.nextBillingOn) && subscription.status.toString() !== 'CANCELED';
    }

    /**
     * Returns the subscriber address HTML as a string;
     * Note: This method could only be used for injecting as 'innerHTML'
     * @param {Address} address
     * @returns {string}
     */
    public static getSubscriberAddress(address: Address): string {
        return (
            address.line1 +
            ', ' +
            address.city +
            ', ' +
            'PIN: ' +
            address.zipCode +
            ', ' +
            address.state +
            ', ' +
            address.country + ', ' +
            address.email
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

    /**
     * Checks if the plans are same.
     */
    public static areSamePlans(paidPlan: Enums.SubscriptionPlan, chosenPlan: Enums.SubscriptionPlan): boolean {
        return paidPlan === chosenPlan;
    }

    /**
     * Checks if the subscription plan is being downgraded.
     */
    public static isPlanBeingDowngraded(paidPlan: Enums.SubscriptionPlan, chosenPlan: Enums.SubscriptionPlan): boolean {
        const paidPlanPrice: number = Number(this.getPlanInfo(paidPlan).price);
        const chosenPlanPrice: number = Number(this.getPlanInfo(chosenPlan).price);
        return chosenPlanPrice < paidPlanPrice;
    }

    /**
     * Returns the balance amount to pay when upgrading or downgrading a subscription.
     * @param subscriptionDetails 
     * @param chosenPlan 
     */
    public static getBalanceAmount(subscriptionDetails: SubscriptionDetails, chosenPlan: Enums.SubscriptionPlan): BalanceAmount {
        const oldStartDate: Moment = subscriptionDetails.startedOn;
        const oldBillingDate: Moment = subscriptionDetails.nextBillingOn;
        const currentDate: Moment = moment();
        const oldPlanDurationInDays: number = Math.abs(oldStartDate.diff(oldBillingDate, 'days'));
        const oldPlanPricePerDay: number = Math.round(subscriptionDetails.price / oldPlanDurationInDays);
        const oldPlanDurationTillDate: number = Math.abs(oldStartDate.diff(currentDate, 'days'));
        const exhaustedPriceForOldPlan: number = Math.round(oldPlanDurationTillDate * oldPlanPricePerDay);
        const oldPlanSavings: number = subscriptionDetails.price - exhaustedPriceForOldPlan;
        const amountPayable = Number(SubscriptionHelper.getPlanInfo(chosenPlan).price) - oldPlanSavings;
        return {
            previousDuration: oldPlanDurationTillDate,
            exhaustedAmount: exhaustedPriceForOldPlan,
            previousSavings: oldPlanSavings,
            amountToPay: amountPayable
        };
    }
}
