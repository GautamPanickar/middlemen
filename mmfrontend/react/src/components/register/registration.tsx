import * as React from 'react';
import { GenericModal } from '../common/genericmodal';
import { AlertBox } from '../common/alertbox';
import { TextField } from '../common/textfield';
import { AppUtils } from '../../utilities/apputils';
import UserHelper from '../../helpers/userhelper';
import { Enums } from '../../utilities/enums';
import { SubscriptionHelper } from '../../helpers/subscriptionhelper';
import { PriceBox } from './pricebox';
import { PlanDisplayInfo } from '../../types/others/plandisplayinfo';
import { User } from '../../types/user/user';
import GenericActionCreator from '../../actioncreators/genericactioncreator';
import UserActionCreator from '../../actioncreators/useractioncreator';

interface Props {

}

interface State {
    formAlert: string;
    nameError: string;
    companyError: string;
    emailError: string;
    passwordError: string;
    name: string;
    company: string;
    email: string;
    password: string;
    plan: Enums.SubscriptionPlan;
    formDisplay?: boolean;
}

type ErrorType = 'Name' | 'Company' | 'Email' | 'Password';

export class Registration extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            formAlert: '',
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

        // Bindings
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onPlanSelectorClick = this.onPlanSelectorClick.bind(this);
        this.onPlanChange = this.onPlanChange.bind(this);
        this.onPurchasingPlan = this.onPurchasingPlan.bind(this);
    }

    public render() {
        return (
            <>
                <div className='row justify-content-center fade show'>
                    {
                        this.state.formDisplay ? 
                        <div className='col-md-8' id='registrationFormHolder'>
                            <div>
                                <h1 className='display-4 font-weight-light'>Subscriber registration</h1>
                                <hr />
                            </div>
                            <div className='row'>
                                <div className='mt-3 col-md-9'>
                                    <AlertBox id='registrationFormAlertBox'
                                        key='key-registrationFormAlertBox'
                                        message={this.state.formAlert}
                                        type='Danger'
                                        onHideCallBack={this.onAlertHide}/>
                                    <form className='form'>
                                        <TextField id='nameField' key='key-nameField'
                                            type='Text' labelName='Your name' name='name' borderless={true}
                                            error={this.state.nameError}
                                            onValueChange={this.handleNameChange}/>
                                        <TextField id='companyField' key='key-companyField'
                                            type='Text' labelName="Company's Name" name='companyName' borderless={true}
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
                                <div className='col-md-3 right-panel-separator'>
                                    <h4 className='font-weight-light'>You have chosen &nbsp;</h4>
                                    <PriceBox id='selectedPlanDetails' key='key-selectedPlanDetails'
                                        planInfo={this.selectedPlanInfo} onPlanChangeCallBack={this.onPlanChange}/>
                                </div>
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

    private onAlertHide(): void {
        this.setState({
            formAlert: ''
        });
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
        return {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            newSubscription: {
                company: this.state.company,
                details: {
                    plan: this.state.plan,
                    status: Enums.SubscriptionStatus.PENDING
                }
            }
        };
    }

    /**
     * Validates the registration form.
     */
    private validateRegistrationForm(): boolean {
        // Name validation
        return this.isNameValid && this.isCompanyValid && this.isEmailValid && this.isPasswordValid && this.state.plan !== undefined;
    }

    private get isNameValid(): boolean {
        if (AppUtils.isEmpty(this.state.name) ||  this.state.name.length <= 1) {
            this.setState({
                nameError: 'A valid name needs to be provided to proceed with registration'
            });
            return false;
        } else if (this.state.name.length > 50) {
            this.setState({
                nameError: 'Length of name cannot exceed 50 characters'
            });
            return false;
        }
        return true;
    }

    private get isCompanyValid(): boolean {
        if (AppUtils.isEmpty(this.state.company) ||  this.state.company.length <= 1) {
            this.setState({
                companyError: 'A valid company name should be provided'
            });
            return false;
        }  else if (this.state.company.length > 50) {
            this.setState({
                companyError: 'Length of comapny name cannot exceed 50 characters'
            });
            return false;
        }
        return true;
    }

    private get isEmailValid(): boolean {
        if (AppUtils.isEmpty(this.state.email) 
                ||  this.state.email.length <= 1 
                || !UserHelper.isValidEmail(this.state.email)) {
            this.setState({
                emailError: 'A valid email should be provided'
            });
            return false;
        } else if (this.state.email.length > 50) {
            this.setState({
                emailError: 'Length of email cannot exceed 50 characters'
            });
            return false;
        }
        return true;
    }

    private get isPasswordValid(): boolean {
        if (AppUtils.isEmpty(this.state.password) ||  this.state.email.length <= 1 ) {
            this.setState({
                passwordError: 'You cannot proceed forward until you provide a valid password'
            });
            return false;
        } else if (this.state.password.length > 20) {
            this.setState({
                passwordError: 'Password lenght cannot exceed 20 characters'
            });
            return false;
        }
        return true;
    }

    /**
     * On clicking the plan selector drop down
     */
    private onPlanSelectorClick(): void {

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
}