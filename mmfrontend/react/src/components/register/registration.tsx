import * as React from 'react';
import { GenericModal } from '../common/genericmodal';
import { AlertBox } from '../common/alertbox';
import { TextField } from '../common/textfield';
import { Enums } from '../../utilities/enums';
import { SubscriptionHelper } from '../../helpers/subscriptionhelper';
import { PriceBox } from './pricebox';
import { PlanDisplayInfo } from '../../types/others/plandisplayinfo';
import { User } from '../../types/user/user';
import GenericActionCreator from '../../actioncreators/genericactioncreator';
import UserActionCreator from '../../actioncreators/useractioncreator';
import { AccountForm } from '../account/accountform';
import { AppUtils } from '../../utilities/apputils';

interface Props extends PropsBase {
}

export class Registration extends AccountForm {
    
    private urlDetails: Location;

    constructor(props: Props) {
        super(props);

        this.state = {
            nameError: '',
            companyError: '',
            emailError: '',
            passwordError: '',
            name: '',
            company: '',
            email: '',
            password: '',
            plan: Enums.SubscriptionPlan.PLAN_1,
            formDisplay: true
        };

        this.urlDetails = window.location;

        // Bindings
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onPlanChange = this.onPlanChange.bind(this);
        this.onPurchasingPlan = this.onPurchasingPlan.bind(this);
    }

    public render() {
        return (
            <>
                <div className='row justify-content-center fade show'>
                    {
                        this.state.formDisplay ? 
                        <div className={this.formType === 'SubscriberForm' ?  'col-md-8': 'col-md-6' } id='registrationFormHolder'>
                            <div>
                                <h1 className='display-4 font-weight-light'>
                                    {this.formType === 'SubscriberForm' ? 'Subscriber registration' : 'App account registration'}
                                </h1>
                                <hr />
                            </div>
                            <div className='row'>
                                <div className={'mt-3 ' + (this.formType === 'SubscriberForm' ?  'col-md-9': 'col-md-12')}>
                                    <AlertBox id='registrationFormAlertBox'
                                        key='key-registrationFormAlertBox'
                                        onHideCallBack={this.onAlertHide}/>
                                    <form className='form'>
                                        <TextField id='nameField' key='key-nameField'
                                            type='Text' labelName='Your name' name='name' borderless={true}
                                            error={this.state.nameError}
                                            onValueChange={this.handleNameChange}/>
                                        <TextField id='companyField' key='key-companyField'
                                            type='Text' labelName={this.formType === 'SubscriberForm' ? "Company's Name" : "App's name"}
                                            name='companyName' borderless={true}
                                            error={this.state.companyError}
                                            onValueChange={this.handleCompanyChange}/>
                                        <TextField id='emailField' key='key-emailField'
                                            type='Email' labelName='Email' name='email' borderless={true}
                                            error={this.state.emailError}
                                            onValueChange={this.handleEmailChange}/>
                                        <TextField id='passwordField' key='key-passwordField'
                                            type='Password' labelName='Password' name='password' borderless={true}
                                            error={this.state.passwordError}
                                            onValueChange={this.handlePasswordChange}/>
                                        <p>
                                            By clicking below, you agree to the MiddleMen&nbsp;
                                            <a href='javascript:void(0);' target='_blank' >Terms of Service</a> and
                                            <a href='javascript:void(0);' target='_blank'>Privacy Policy.</a>
                                        </p>
                                        <a className='btn btn-dark' href='javascript:void(0);' onClick={this.onRegister}>Agree and Register</a>
                                    </form>
                                </div>
                                {
                                    this.formType === 'SubscriberForm'
                                        ?   <div className='col-md-3 right-panel-separator'>
                                                <h4 className='font-weight-light'>You have chosen &nbsp;</h4>
                                                <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                                    planInfo={this.selectedPlanInfo} onPlanChangeCallBack={this.onPlanChange}/>
                                            </div>
                                        : <></>
                                }
                                
                            </div>
                        </div>
                        : <div id='allPlanSelectorholder' className='col-md-8'>
                            <div>
                                <h1 className='display-4 font-weight-light'>Select your desired plan</h1>
                                <hr />
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_1)} 
                                        onPurchaseCallback={this.onPurchasingPlan.bind(this, Enums.SubscriptionPlan.PLAN_1)}/>
                                </div>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_2)}
                                        onPurchaseCallback={this.onPurchasingPlan.bind(this, Enums.SubscriptionPlan.PLAN_2)}/>
                                </div>
                                <div className='col'>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={SubscriptionHelper.getDefaultPlansInfo(Enums.SubscriptionPlan.PLAN_3)} 
                                        onPurchaseCallback={this.onPurchasingPlan.bind(this, Enums.SubscriptionPlan.PLAN_3)}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <GenericModal id='registrationLoaderModal' key='key-registrationLoaderModal' />
            </>
        );
    }

    public componentDidMount() {
    }

    public componentWillUnmount() {
    }

    private onAlertHide(): void {
        // Do something if necessary.
    }

    private handleNameChange(value: string): void {
        this.setState({
            name: value
        });
    }

    private handleCompanyChange(value: string): void {
        this.setState({
            company: value
        });
    }

    private handleEmailChange(value: string): void {
        this.setState({
            email: value
        });
    }

    private handlePasswordChange(value: string): void {
        this.setState({
            password: value
        });
    }

    /**
     * On clicking the register button
     */
    private onRegister(): void {
        this.setState({
            nameError: '',
            companyError: '',
            emailError: '',
            passwordError: ''
        });
        if (this.validateRegistrationForm()) {
            GenericActionCreator.toggleOverlay(true, true);
            UserActionCreator.register(this.userToSave);
        }
    }

    private get userToSave(): User {
        const user: User = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            company: this.state.company
        };
        if (this.formType === 'AccountAdminForm') {
            user.isApp = true;
        } else {
            user.newSubscription =  {
                details: {
                    plan: this.state.plan,
                    status: Enums.SubscriptionStatus.PENDING
                }
            };
        }
        return user;
    }

    /**
     * Returns the selcted subscription plan information to be displayed on to the right sdie panel
     */
    private get selectedPlanInfo(): PlanDisplayInfo {
        let planInfo: PlanDisplayInfo = SubscriptionHelper.getPlanInfo(this.state.plan);
        planInfo.subText = [
            'Lorem ipsum dolor sit amet',
            'Excepteur sint occaecat cupidatat',
            'Duis aute irure dolor'
        ]
        return planInfo;
    }

    /**
     * On clicking the change plan button against subscription plan card.
     */
    private onPlanChange(): void {
        this.setState({
            formDisplay: false
        });
    }

    /**
     * On clicking the purchase button against a plan.
     * @param plan 
     */
    private onPurchasingPlan = (plan: Enums.SubscriptionPlan) => {
        this.setState({
            formDisplay: true,
            plan: plan
        });
    }

    /**
     * Returns the form type to be rendered.
     */
    private get formType(): string {
        const path: string = this.urlDetails.pathname;
        const search: string = this.urlDetails.search;
        const params: URLSearchParams =  new URLSearchParams(search);
        const app: string = params.get('app');
        const plan: string = params.get('plan');
        if (path === '/register' && AppUtils.isNotEmpty(app) && AppUtils.isNotEmpty(plan)) {
            return 'SubscriberForm';
        } else {
            return 'AccountAdminForm';
        }
    }
}