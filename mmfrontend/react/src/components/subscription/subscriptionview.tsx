import * as React from 'react';
import UserStoreInstance from '../../stores/userstore';
import Subscription from '../../types/user/subscription';
import SubscriptionDetails from '../../types/user/subscriptiondetails';
import { SubscriptionHelper } from '../../helpers/subscriptionhelper';
import { Enums } from '../../utilities/enums';

interface Props extends PropsBase {

}

interface State {

}

export class SubscripitonView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };

        // Bindings
        this.changePlan = this.changePlan.bind(this);
    }

    public render() {
        return (
            this.hasSubscriptions
            ?   <div id={this.props.id} key={this.props.key} className='box box-shadow dashboard-box bg-light'>
                    <div className='dash-box-heading mt-1'>
                        <h4 className='font-weight-light'>Subscription plans information</h4>
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
        UserStoreInstance.subscriptions.map((subscription: Subscription) => {
            let itemToRender = (
                <div className='plan-holder'>
                    <div className='row'>
                        <div className='col'>
                            {this.getPlanFragment(subscription.details.plan)}
                            {this.getStatusFragment(subscription.details.status)}
                            {this.getTotalPriceFragment(subscription.details.plan)}
                        </div>
                        <div className='col'>
                            {this.getStartedDateFragment(subscription.details)}
                            {this.hasSubscriptionStarted(subscription.details) ? this.getNextBillingFragment(subscription.details) : <></>}
                            {this.hasSubscriptionStarted(subscription.details) ? this.getCancelledOnFragment(subscription.details) : <></>}
                        </div>
                    </div>
                    {
                        this.hasSubscriptionStarted(subscription.details) && !subscription.details.cancelledOn
                        ?   <div className='mt-1 alert alert-info'>
                                <h6 >Congratulations on activating your plan and thank you for choosing us.</h6>
                                <h6>You can login to <strong><a href='javascript:void(0);' target='_blank'>AppName</a></strong> using the same credentials.</h6>
                            </div>
                        :   <></>
                    }
                    <div className='mt-1'>
                        <div className='text-center'>
                            <button className='btn btn-warning' onClick={this.changePlan.bind(this, subscription)}><i className='fas fa-exchange-alt'></i>&nbsp;Change Plan</button>
                        </div>
                    </div>
                </div>
            );
            subscripitonsToRender.push(itemToRender);
        });
        return subscripitonsToRender;
    }

    private getPlanFragment(plan: Enums.SubscriptionPlan): JSX.Element {
        return (
            <div>
                <p className='m-0 font-weight-light'>Plan chosen</p>
                <h3 className='font-weight-normal'>{SubscriptionHelper.getPlanInfo(plan).name}</h3>
            </div>
        );
    }

    private getStatusFragment(status: Enums.SubscriptionStatus): JSX.Element  {
        return (
            <div >
                <p className='m-0 font-weight-light'>Status of the subscription</p>
                <h4 className='font-weight-normal'>{SubscriptionHelper.getPlanStatus(status)}</h4>
            </div>
        );
    }

    private getTotalPriceFragment(plan: Enums.SubscriptionPlan): JSX.Element {
        return (
            <div>
                <p className='m-0 font-weight-light'>Total price</p>
                <h4 className='font-weight-normal'><i className='fas fa-rupee-sign'></i>{SubscriptionHelper.getPlanInfo(plan).price}</h4>
            </div>
        );
    }

    private getStartedDateFragment(details: SubscriptionDetails): JSX.Element {
        return(
            this.hasSubscriptionStarted(details)
            ?   <div>
                    <p className='m-0 font-weight-light'>Subscription commenced on</p>
                    <h4 className='font-weight-normal'>{details.startedOn}</h4>
                </div> 
            :   <div>
                    <p className='m-0 font-weight-light'>Your subscription has not been activated yet.
                        If you have already made the payment, then contact at <strong>contact@company.com</strong> for activating your subscription.</p>
                </div>    
        );
    }

    private getNextBillingFragment(details: SubscriptionDetails): JSX.Element {
        return(
            <div>
                <p className='m-0 font-weight-light'>Next billing on</p>
                <h4 className='font-weight-normal'>{details.nextBillingOn}</h4>
            </div>
        );
    }

    private getCancelledOnFragment(details: SubscriptionDetails): JSX.Element {
        return(
            <div>
                <p className='m-0 font-weight-light'>Subscription cancelled on</p>
                <h4 className='font-weight-normal'>{details.cancelledOn}</h4>
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
}