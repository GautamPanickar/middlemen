import * as React from 'react';
import UserStoreInstance from '../../../stores/userstore';
import { SubscriptionHelper } from '../../../helpers/subscriptionhelper';
import { User } from '../../../types/user/user';
import { PriceBox } from '../../register/pricebox';
import { Enums } from '../../../utilities/enums';

interface Props extends PropsBase {

}

interface State {

}

export class PlanConfiguration extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };

        // Bindings
    }

    public render() {
        return (
            <div id={this.props.id} key={this.props.key} className='box box-shadow dashboard-box bg-light'>
                <div className='dash-box-heading mt-1'>
                    <h4 className='font-weight-light'>New plan</h4>
                    <hr/>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='mt-1'>
                            <div className='text-center'>
                                <a href='javascript:void(0);' className='btn btn-dark' onClick={undefined}>Save</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='carousel custom-scroll m-4' id='planCarousel'>
                            <div className='row pb-3'>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_1)} 
                                        onPurchaseCallback={undefined}/>
                                </div>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_2)}
                                        onPurchaseCallback={undefined}/>
                                </div>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_3)} 
                                        onPurchaseCallback={undefined}/>
                                </div>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_1)} 
                                        onPurchaseCallback={undefined}/>
                                </div>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_2)}
                                        onPurchaseCallback={undefined}/>
                                </div>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_3)} 
                                        onPurchaseCallback={undefined}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public componentDidMount() {
    }

    private get currentSubscriber(): User {
        return UserStoreInstance.loggedInUser;
    }
}