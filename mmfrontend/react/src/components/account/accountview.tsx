import * as React from 'react';
import UserStoreInstance from '../../stores/userstore';
import { SubscriptionHelper } from '../../helpers/subscriptionhelper';
import { User } from '../../types/user/user';
import { AppUtils } from '../../utilities/apputils';

interface Props extends PropsBase {

}

interface State {

}

export class AccountView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };

        // Bindings
        this.onEditClick = this.onEditClick.bind(this);
    }

    public render() {
        return (
            <div id={this.props.id} key={this.props.key} className='box box-shadow dashboard-box bg-light'>
                <div className='dash-box-heading mt-1'>
                    <h4 className='font-weight-light'>Subscriber information</h4>
                    <hr/>
                </div>
                <div className='row'>
                    <div className='col'>
                        {this.name}
                        <hr/>
                        {this.email}
                        {this.company}
                        {this.companyId}
                        {this.phone}
                        {this.gst}
                    </div>
                    <div className='col'>
                        {this.contactAddress}
                        {this.billingAddress}
                    </div>
                </div>
                <div className='mt-1'>
                    <div className='text-center'>
                        <a href='javascript:void(0);' className='btn btn-warning'
                                onClick={this.onEditClick}><i className='fas fa-user-edit'></i>&nbsp;Edit Information</a>
                    </div>
                </div>
            </div>
        );
    }

    private get name(): JSX.Element {
        return AppUtils.isNotEmpty(this.currentSubscriber.name)
            ?   <div>
                    <p className='m-0 font-weight-light'>Name of the subscriber</p>
                    <h3 className='font-weight-normal'>{this.currentSubscriber.name}</h3>
                </div>
            :   <></>;

    }

    private get email(): JSX.Element {
        return AppUtils.isNotEmpty(this.currentSubscriber.name)
            ?   <div className='row'>
                    <span className='col'>
                        <p className='m-0 font-weight-light float-left'>Email</p>
                    </span>
                    <span className='col'>
                        <h5 className='font-weight-normal float-right'>{this.currentSubscriber.email}</h5>
                    </span>
                </div>
            :   <></>;

    }

    private get company(): JSX.Element {
        return AppUtils.isNotEmpty(this.currentSubscriber.company)
            ?   <div className='row'>
                    <span className='col'>
                        <p className='m-0 font-weight-light float-left'>Company</p>
                    </span>
                    <span className='col'>
                        <h5 className='font-weight-normal float-right'>{this.currentSubscriber.company}</h5>
                    </span>
                </div>
            :   <></>;

    }

    private get companyId(): JSX.Element {
        return AppUtils.isNotEmpty(this.currentSubscriber.companyId)
            ?   <div className='row'>
                    <span className='col'>
                        <p className='m-0 font-weight-light float-left'>Company Unique ID</p>
                    </span>
                    <span className='col'>
                        <h5 className='font-weight-normal float-right'>{this.currentSubscriber.companyId}</h5>
                    </span>
                </div>
            :   <></>;

    }

    private get phone(): JSX.Element {
        return AppUtils.isNotEmpty(this.currentSubscriber.name) && this.currentSubscriber.contactAddress
            ?   <div className='row'>
                    <span className='col'>
                        <p className='m-0 font-weight-light float-left'>Phone</p>
                    </span>
                    <span className='col'>
                        <h5 className='font-weight-normal float-right'>{this.currentSubscriber.contactAddress.phone}</h5>
                    </span>
                </div>
            :   <></>;
    }

    private get gst(): JSX.Element {
        return AppUtils.isNotEmpty(this.currentSubscriber.gstNumber)
            ?   <div className='row'>
                    <span className='col'>
                        <p className='m-0 font-weight-light float-left'>GST Number</p>
                    </span>
                    <span className='col'>
                        <h5 className='font-weight-normal float-right'>{this.currentSubscriber.gstNumber}</h5>
                    </span>
                </div>
            :   <></>;
    }

    private get contactAddress(): JSX.Element {
        return this.currentSubscriber.contactAddress
            ?   <div className='mt-1'>
                    <p className='m-0 font-weight-light'>Contact Address</p>
                    <div className='border p-2'>
                        <h5 className='font-weight-normal'>{SubscriptionHelper.getSubscriberAddress(this.currentSubscriber.contactAddress)}</h5>
                    </div>
                </div>
            :   <></>;
    }

    private get billingAddress(): JSX.Element {
        return this.currentSubscriber.contactAddress
            ?   <div className='mt-1'>
                    <p className='m-0 font-weight-light'>Billing Address</p>
                    <div className='border p-2'>
                        <h5 className='font-weight-normal'>{SubscriptionHelper.getSubscriberAddress(this.currentSubscriber.billingAddress)}</h5>
                    </div>
                </div>
            :   <></>;
    }

    private onEditClick(): void {

    }

    private get currentSubscriber(): User {
        return UserStoreInstance.loggedInUser;
    }
}