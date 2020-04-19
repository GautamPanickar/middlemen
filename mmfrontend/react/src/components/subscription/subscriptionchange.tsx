import * as React from 'react';
import UserStoreInstance from '../../stores/userstore';
import Subscription from '../../types/user/subscription';
import SubscriptionDetails from '../../types/user/subscriptiondetails';
import { SubscriptionHelper } from '../../helpers/subscriptionhelper';
import { Enums } from '../../utilities/enums';
import { PriceBox } from '../register/pricebox';
import { AppUtils } from '../../utilities/apputils';
import moment = require('moment');

interface Props extends PropsBase {

}

interface State {
    chosenPlan: number;
    chosenSubscription: Subscription;
}

export class SubscripitonChange extends React.Component<Props, State> {

    private paidAmount: number;
    private balanceAmount: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            chosenPlan: undefined,
            chosenSubscription: undefined
        };

        // Bindings
        this.changePlan = this.changePlan.bind(this);
        this.onPlanChange = this.onPlanChange.bind(this);
        this.proceed = this.proceed.bind(this);
    }

    public render() {
        return (
            this.hasSubscriptions
            ?   <div id={this.props.id} key={this.props.key} className='box box-shadow dashboard-box bg-light'>
                    <div className='dash-box-heading mt-1'>
                        <h4 className='font-weight-light'>Upgrade/Downgrade your subscription</h4>
                        <hr/>
                    </div>
                    <div id='subscriptionPlansHolder'>
                        {this.getSubscriptionDetails()}
                    </div>
                </div>
            : <></>
        );
    }

    private getSubscriptionDetails(): Array<JSX.Element> {
        let subscripitonsToRender:Array<JSX.Element> = new Array<JSX.Element>();
        UserStoreInstance.subscriptions.map((subscription: Subscription, index: number) => {
            let itemToRender = (
                <div className='plan-holder'>
                    <div className='row'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    <ul id={'planChangeHolder-'+ (index + 1)} className='list-group list-group-flush'>
                                        <li className='list-group-item dashboard-box h3 font-weight-light'
                                            onClick={this.onPlanChange.bind(this, Enums.SubscriptionPlan.PLAN_1, subscription)}>
                                            <i className={'fas fa-check-circle' + (this.isTrial(subscription) ? ' text-success' : ' text-secondary-light')}></i>&nbsp;Trial
                                        </li>
                                        <li className='list-group-item dashboard-box h3 font-weight-light' 
                                            onClick={this.onPlanChange.bind(this, Enums.SubscriptionPlan.PLAN_2, subscription)}>
                                            <i className={'fas fa-check-circle' + (this.isLite(subscription) ? ' text-success' : ' text-secondary-light')}></i>&nbsp;Lite
                                        </li>
                                        <li className='list-group-item dashboard-box h3 font-weight-light' 
                                            onClick={this.onPlanChange.bind(this, Enums.SubscriptionPlan.PLAN_3, subscription)}>
                                            <i className={'fas fa-check-circle' + (this.isStandard(subscription) ? ' text-success' : ' text-secondary-light')}></i>&nbsp;Standard
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {
                                this.state.chosenPlan 
                                ?   <>
                                        <div>
                                            <p className='m-0 font-weight-light'>Plan chosen</p>
                                            <h3 className='font-weight-normal'>{SubscriptionHelper.getPlanInfo(this.state.chosenPlan).name}</h3>
                                        </div>
                                        <div>
                                            <p className='m-0 font-weight-light'>Price of the plan</p>
                                            <h3 className='font-weight-normal'><i className='fas fa-rupee-sign'></i>{SubscriptionHelper.getPlanInfo(this.state.chosenPlan).price}</h3>
                                        </div>
                                        {this.getAmountCalculationFragment(subscription)}
                                        {
                                            this.isCancelledPlan(subscription.details) 
                                            || (this.isChangingPlanBeforePayment(subscription.details) 
                                                && !this.hasActivePaymentOrder() 
                                                && !this.isSamePlanChosen(subscription.details))
                                            ?   <a href='javascript:void(0);'
                                                    className='btn btn-success float-right'
                                                    onClick={this.changePlan.bind(this, subscription)}><i className='fas fa-exchange-alt'></i>&nbsp;Update/Change Plan</a>
                                            :   <></>
                                        }
                                    </>
                                :   <></>
                            }
                        </div>
                        {this.getPricingFragment(subscription)}
                    </div>
                </div>
            );
            subscripitonsToRender.push(itemToRender);
        });
        return subscripitonsToRender;
    }

    private getAmountCalculationFragment(subscription: Subscription): JSX.Element {
        return (
            <>
                {
                    !this.isSamePlanChosen(subscription.details) && this.isDownGrade(subscription.details)
                    ?   <p className='m-0 font-weight-light'>
                            {
                                this.canDownGrade(subscription.details) 
                                ? 'You will have to pay the total price of the plan, since this is a downgrade.'
                                : 'You cannot downgrade the existing plan, unless the end of the current active billing cycle is reached.' +
                                'The current billingcycle will end on ' + this.getNextBillingDate(subscription.details) + '.'
                            }
                        </p>
                    :   <></>
                }
                {
                    !this.isSamePlanChosen(subscription.details) && !this.isDownGrade(subscription.details) && this.calculateBalanceAmountForPayment(subscription.details)
                    ?   <>
                            <div>
                                <p className='m-0 font-weight-light'>Paid amount for the old plan on <strong>{this.getStartDate(subscription.details)}</strong></p>
                                <h3 className='font-weight-normal'><i className='fas fa-rupee-sign'></i>{this.paidAmount}</h3>
                            </div>
                            <div className='card bg-white'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='m-0 font-weight-light'>You have used the old plan for</p>
                                            <h3 className='font-weight-normal'>{this.getBalanceAmount(subscription.details).previousDuration} Days</h3>
                                            <p className='m-0 font-weight-light'>Total amount exhausted for your previous usage</p>
                                            <h3 className='font-weight-normal'><i className='fas fa-rupee-sign'></i>{this.getBalanceAmount(subscription.details).exhaustedAmount}</h3>
                                        </div>
                                        <div className='col'>
                                            <p className='m-0 font-weight-light'>Your savings from previous plan</p>
                                            <h3 className='font-weight-normal'><i className='fas fa-rupee-sign'></i>{this.getBalanceAmount(subscription.details).previousSavings}</h3>
                                            <p className='m-0 font-weight-light'>Total amount payable for the new plan</p>
                                            <h3 className='font-weight-normal'><span className='badge badge-primary'><i className='fas fa-rupee-sign'></i>{this.getBalanceAmount(subscription.details).amountToPay}</span></h3>
                                        </div>
                                    </div>
                                </div>
                                {
                                    !this.isSamePlanChosen(subscription.details) && (!this.isDownGrade(subscription.details) || !this.canDownGrade(subscription.details) )
                                    ?   <div className='card-footer'>
                                            <a href='javascript:void(0);' className='btn btn-success float-right'
                                                onClick={this.proceed}><i className='far fa-check-circle'></i>&nbsp;Proceed</a>
                                        </div>
                                    :   <></>
                                }
                            </div>
                        </>
                    :   <></>
                }
            </>
        );
    }

    private getPricingFragment(subscription: Subscription): JSX.Element {
        return (
            <div className='col'>
                <div className='card'>
                    <div className='card-header'>
                        <span className='float-left plan-text'>Details of the chosen plan</span>
                    </div>
                    <div className='card-body'>
                        {
                            this.isTrial(subscription)
                            ?   <PriceBox id='trialPlanPriceBox' key='key-trialPlanPriceBox'
                                    planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_1)} />
                            : <></>
                        }
                        {
                            this.isLite(subscription)
                            ?   <PriceBox id='litePlanPriceBox' key='key-litePlanPriceBox'
                                    planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_2)} />
                            : <></>
                        }
                        {
                            this.isStandard(subscription)
                            ?   <PriceBox id='standardPlanPriceBox' key='key-standardPlanPriceBox'
                                    planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_3)} />
                            : <></>
                        }
                    </div>
                </div>
            </div>
        );
    }

    private get hasSubscriptions(): boolean {
        return UserStoreInstance.subscriptions && UserStoreInstance.subscriptions.length > 0 ? true : false;
    }

    private hasSubscriptionStarted(details: SubscriptionDetails): boolean {
        return (
            details.startedOn !== undefined
            && details.status !== Enums.SubscriptionStatus.PENDING
            && details.status !== Enums.SubscriptionStatus.CANCELED
        );       
    }

    private changePlan(subscription: Subscription): void {

    }

    private isTrial(subscription: Subscription): boolean {
        
        return this.state.chosenPlan
            ? this.state.chosenPlan === Enums.SubscriptionPlan.PLAN_1 && this.state.chosenSubscription.id === subscription.id
            : subscription.details.plan === Enums.SubscriptionPlan.PLAN_1 || subscription.details.plan === 0;
    }

    private isLite(subscription: Subscription): boolean {
        return this.state.chosenPlan
            ? this.state.chosenPlan === Enums.SubscriptionPlan.PLAN_2 && this.state.chosenSubscription.id === subscription.id
            : subscription.details.plan === Enums.SubscriptionPlan.PLAN_2 || subscription.details.plan === 1;
    }

    private isStandard(subscription: Subscription): boolean {
        return this.state.chosenPlan
            ? this.state.chosenPlan === Enums.SubscriptionPlan.PLAN_3 && this.state.chosenSubscription.id === subscription.id
            : subscription.details.plan === Enums.SubscriptionPlan.PLAN_3 || subscription.details.plan === 2;
    }

    /**
     * On plan selection change
     */
    private onPlanChange(plan: Enums.SubscriptionPlan, subscription: Subscription): void {
        this.setState({
            chosenPlan: plan,
            chosenSubscription: subscription
        });
    }

    private isCancelledPlan(details: SubscriptionDetails): boolean {
        return (
            details.status === Enums.SubscriptionStatus.CANCELED &&
            details.cancelledOn !== undefined
        );
    }

    private isSamePlanChosen(details: SubscriptionDetails): boolean {
        return SubscriptionHelper.areSamePlans(details.plan, this.state.chosenPlan);
    }

    /**
     * Checking if the plan is being downgraded or not.
     */
    private isDownGrade(details: SubscriptionDetails): boolean {
        return (
            details.status !== Enums.SubscriptionStatus.PENDING
            && details.startedOn
            && SubscriptionHelper.isPlanBeingDowngraded(details.plan, this.state.chosenPlan)
        );
    }

    /**
     * Checking if the subscription plan can be downgraded or not.
     */
    private canDownGrade(details: SubscriptionDetails): boolean {
        return AppUtils.areSameDates(details.nextBillingOn, moment());
    }

    private getStartDate(details: SubscriptionDetails): string {
        return AppUtils.getReadableDate(details.startedOn);
    }

    private getNextBillingDate(details: SubscriptionDetails): string {
        return AppUtils.getReadableDate(details.nextBillingOn);
    }

    /**
     * Checks whether or not to calculate the remainng amount to be paid.
     * This generally happens when we are upgrading a plan.
     */
    private calculateBalanceAmountForPayment(details: SubscriptionDetails): boolean {
        return (
            details.status.toString() !== 'PENDING' &&
            details.startedOn &&
            this.paidAmount >= 0
        );
    }

    /**
     * Calculates the balance amount to be paid for the newly chosen plan
     */
    private getBalanceAmount(details: SubscriptionDetails): any {
        this.balanceAmount = SubscriptionHelper.getBalanceAmount(details, this.state.chosenPlan).amountToPay;
        return this.balanceAmount;
    }

    private proceed(): void {

    }

    private isChangingPlanBeforePayment(details: SubscriptionDetails): boolean {
        return details.status === Enums.SubscriptionStatus.PENDING
            && !details.startedOn;
    }

    /**
     * Checks if there is an active payment order.
     */
    private hasActivePaymentOrder(): boolean {
        // return this.billingService.billing && this.billingService.billing.order && !this.billingService.billing.payment ? true : false;
        return false;
    }
}