import * as React from 'react';
import UserStoreInstance, { UserStore } from '../../stores/userstore';
import { PricingDashItem } from './pricingdashitem';
import { SubscriberDashItem } from './subscriberdashitem';
import { PaymentDashItem } from './paymentdashitem';
import { InvoiceDashItem } from './invoicedashitem';
import { SubscriptionHelper } from '../../helpers/subscriptionhelper';
import SubscriptionActionCreator from '../../actioncreators/subscriptionactioncreator';
import UserActionCreator from '../../actioncreators/useractioncreator';
import { SusbcriberInfoBox } from './subscriberinfobox';
import { Breadcrumb } from '../common/breadcrumb';
import { SubscripitonView } from '../subscription/subscriptionview';
import GenericActionCreator from '../../actioncreators/genericactioncreator';
import BreadcrumbItem from '../../types/others/breadcrumbitem';

interface Props extends PropsBase {

}

interface State {
    renderedOn?: number;
    showBreadCrumb?: boolean;
    activeScreen: string;
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state= {
            showBreadCrumb: false,
            activeScreen: ''
         };

        // Bindings
        this.onUserDetailsRefresh = this.onUserDetailsRefresh.bind(this);
        this.onViewPlansClick = this.onViewPlansClick.bind(this);
        this.onCancelPlansClick = this.onCancelPlansClick.bind(this);
        this.onChangePlansClick = this.onChangePlansClick.bind(this);
        this.onBuyAddonsClick = this.onBuyAddonsClick.bind(this);
    }

    public render() {
        return (
            UserStoreInstance.loggedInUser || UserStoreInstance.isLoggedIn
                ?   <div className='container-fluid'>
                        {
                            this.hasSubscriptionExpired
                                ? <div className='alert alert-warning'>
                                    <h6>Your subscription has expired. Kindly click 
                                        <a href='javascript:void(0);'>here </a>to update your plan.</h6>
                                    </div>
                                : <></>
                        }
                        {
                            this.isSubscriptionExpiringToday
                                ? <div className='alert alert-warning'>
                                    <h6>Your subscription will expire today. You can click 
                                        <a href='javascript:void(0);' >here </a>to cancel/update your subscription before it expires.</h6>
                                    </div>
                                : <></>
                        }
                        {
                            this.state.showBreadCrumb ? <Breadcrumb id={'breadCrumbHolder'} key={'key-breadCrumbHolder'} /> : <></>
                        }                        
                        <div className='m-1 dash-box-heading'>
                            <h1 className='display-4 font-weight-light'>{this.activeScreenHeading}</h1>
                            <hr />
                        </div>
                        <div className='row'>
                            <div className='col-lg-9 col-md-9'>
                                <div className='row'>
                                    {this.getActiveScreenItems()}
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-3 dashboard-subscriber-info'>
                                <SusbcriberInfoBox billingAddressOnly={false}/>
                            </div>
                        </div>
                    </div>
                :   <></>
        );
    }

    private getActiveScreenItems(): JSX.Element {
        switch (this.state.activeScreen) {
            case '': 
                return (<>
                    <div className='col-lg-3 col-md-3'>
                        <PricingDashItem id={'pricingDashItem'} key={'key-pricingDashItem'}
                            onViewCallback={this.onViewPlansClick} 
                            onCancelCallback={this.onCancelPlansClick}
                            onChangeCallback={this.onChangePlansClick}
                            onBuyAddonsCallback={this.onBuyAddonsClick}/>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                        <SubscriberDashItem id={'subscriberDashItem'} key={'key-subscriberDashItem'}/>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                        <PaymentDashItem id={'paymentDashItem'} key={'key-paymentDashItem'}/>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                        <InvoiceDashItem id={'invoiceDashItem'} key={'key-invoiceDashItem'}/>
                    </div>
                </>);
            case 'SubscriptionView': 
                return (<SubscripitonView id={'subscriptionViewBox'} key={'key-subscriptionViewBox'} />)
        }
    }

    private get activeScreenHeading(): string {
        switch (this.state.activeScreen) {
            case '': 
                return 'Subscription Dashboard';
            case 'SubscriptionView': 
                return 'View current plans';
        }
    }

    public componentDidMount() {
        if (!UserStoreInstance.loggedInUser && UserStoreInstance.isLoggedIn) {
            UserActionCreator.loadUserDetails();
        }

        // Listeners
        UserStoreInstance.addListener(UserStore.USER_DETAILS_LOADED_EVENT, this.onUserDetailsRefresh);
    }

    public componentWillUnmount() {
        UserStoreInstance.removeListener(UserStore.USER_DETAILS_LOADED_EVENT, this.onUserDetailsRefresh);
    }

    private get hasSubscriptionExpired(): boolean {
        return UserStoreInstance.subscriptions ? 
            SubscriptionHelper.hasSubscriptionExpired(UserStoreInstance.subscriptions[0].details) : false;
    }

    private get isSubscriptionExpiringToday(): boolean {
        return UserStoreInstance.subscriptions ? 
            SubscriptionHelper.hasSubscriptionExpired(UserStoreInstance.subscriptions[0].details) : false;
    }

    /**
     * When the user details is refreshed, re-fetch the subscriptions for the user.
     */
    private onUserDetailsRefresh(): void {
        SubscriptionActionCreator.loadSubscriptionsForUser(UserStoreInstance.loggedInUser._id);
    }

    private onViewPlansClick(): void {
        const item: BreadcrumbItem = {
            ukey: 'subscriptionsKEY-001',
            name: 'Subscriptions',
            parent: null,
            active: true
        };
        GenericActionCreator.updateBreadCrumb(item, 'PUSH');
        this.setState({
            activeScreen: 'SubscriptionView',
            showBreadCrumb: true
        });
    }

    private onCancelPlansClick(): void {
        this.setState({
            activeScreen: 'SubscriptionCancel'
        });
    }

    private onChangePlansClick(): void {
        this.setState({
            activeScreen: 'SubscriptionChange'
        });
    }

    private onBuyAddonsClick(): void {
        this.setState({
            activeScreen: 'BuyAddons'
        });
    }
}