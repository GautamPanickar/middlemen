import * as React from 'react';
import UserStoreInstance from '../../stores/userstore';
import { User } from '../../types/user/user';
import { AppUtils } from '../../utilities/apputils';
import { AlertBox } from '../common/alertbox';
import { TextField } from '../common/textfield';
import { TextArea } from '../common/textarea';
import { Selector } from '../common/selector';
import { Constants } from '../../utilities/constants';
import { Checkbox } from '../common/checkbox';

interface Props extends PropsBase {

}

interface State {
    nameError: string;
    name: string;
    companyError: string;
    company: string;
    emailError: string;
    email: string;
    phoneError: string;
    phone: string;
    sameAddress: boolean;
    bAddressError: string,
    baCountryError: string;
    baStateError: string;
    baCityError: string;
    baZipError: string; 
    baCountry: string;
    baState: string;
    baCity: string;
    bAddress: string;
    baZip: string;
    caZip: string;
    cAddressError: string,
    caCountryError: string;
    caStateError: string;
    caCityError: string;
    caZipError: string;
    caCountry: string;
    caState: string;
    caCity: string;
    cAddress: string;
    gstError: string;
    gst: string;
}

export class AccountEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nameError: '',
            name: '',
            companyError: '',
            company: '',
            emailError: '',
            email: '',
            phoneError: '',
            phone: '',
            sameAddress: true,
            bAddressError: '',
            bAddress: '',
            baCountryError:'',
            baStateError:'',
            baCityError:'',
            baZipError:'',
            baCountry: '',
            baState: '',
            baCity: '',
            cAddressError: '',
            caCountryError: '',
            caStateError: '',
            caCityError: '',
            caZipError: '',
            caCountry: '',
            caState: '',
            caCity: '',
            cAddress: '',
            baZip: '',
            caZip: '',
            gstError: '',
            gst: ''
        };

        // Bindings
        this.onUpdate = this.onUpdate.bind(this);
        this.onAlertHide = this.onAlertHide.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleBAddressChange = this.handleBAddressChange.bind(this);
        this.handleBACountryChange = this.handleBACountryChange.bind(this);
        this.handleBAStateChange = this.handleBAStateChange.bind(this);
        this.handleBACityChange = this.handleBACityChange.bind(this);
        this.handleBAZipChange = this.handleBAZipChange.bind(this);
        this.handleCACountryChange = this.handleCACountryChange.bind(this);
        this.handleCAStateChange = this.handleCAStateChange.bind(this);
        this.handleCACityChange = this.handleCACityChange.bind(this);
        this.handleCAZipChange = this.handleCAZipChange.bind(this);
        this.handleSameAddressChange = this.handleSameAddressChange.bind(this);
        this.handleCAddressChange = this.handleCAddressChange.bind(this);
        this.handleGSTChange = this.handleGSTChange.bind(this);
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
                        <AlertBox id='accountFormAlertBox'
                                key='key-accountFormAlertBox'
                                onHideCallBack={this.onAlertHide}/>
                        <form className='form'>
                            <div className='form-row'>
                                <TextField id='nameField' key='key-nameField' className='col-md-6'
                                    type='Text' labelName='Your name' name='name' borderless={true}
                                    error={this.state.nameError}
                                    onValueChange={this.handleNameChange}/>
                                <TextField id='companyField' key='key-companyField' className='col-md-6'
                                            type='Text' labelName="Company's Name" name='companyName' borderless={true}
                                            error={this.state.companyError}
                                            onValueChange={this.handleCompanyChange}/>
                            </div>
                            <div className='form-row'>
                                <TextField id='emailField' key='key-emailField' className='col-md-6'
                                    type='Email' labelName='Email' name='email' borderless={true}
                                    error={this.state.emailError}
                                    onValueChange={this.handleEmailChange}/>
                                <TextField id='phoneField' key='key-phoneField' className='col-md-6'
                                        type='Text' labelName="Phone" name='phone' borderless={true}
                                        error={this.state.phoneError}
                                        onValueChange={this.handlePhoneChange}/>
                            </div>
                            <div className='row'>
                                <div className={this.state.sameAddress ? 'col-md-12' : 'col-md-6'}>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h6 className='font-weight-light'>Billing Address</h6>
                                        </div>
                                        <div className='card-body'>
                                            <TextArea id='billigAddressTA' key='key-billigAddressTA'
                                                rows={3}
                                                labelName='Billing Address' name='billingAddress' borderless={false}
                                                error={this.state.bAddressError}
                                                onValueChange={this.handleBAddressChange}/>
                                                                                            
                                            <div className='form-row'>
                                                <Selector id='countrySelector' key='key-countrySelector' className='col-md-6'
                                                    borderless={false} labelName='Country' name='countries'
                                                    error={this.state.baCountryError}
                                                    onValueChange={this.handleBACountryChange} 
                                                    options={AppUtils.mapConstantsToSelector(Constants.COUNTRIES)} />
                                                <Selector id='stateSelector' key='key-stateSelector' className='col-md-6'
                                                    borderless={false} labelName='State' name='states'
                                                    error={this.state.baStateError}
                                                    onValueChange={this.handleBAStateChange} 
                                                    options={AppUtils.mapConstantsToSelector(Constants.INDIAN_STATES)} />
                                            </div>
                                            <div className='form-row'>
                                                <TextField id='baCityField' key='key-baCityField' className='col-md-6'
                                                    type='Text' labelName="City" name='bacity' borderless={true}
                                                    error={this.state.baCityError}
                                                    onValueChange={this.handleBACityChange}/>
                                                <TextField id='baZipField' key='key-baZipField' className='col-md-6'
                                                    type='Text' labelName="PIN Code" name='baZip' borderless={true}
                                                    error={this.state.baZipError}
                                                    onValueChange={this.handleBAZipChange}/>
                                                <Checkbox id='sameAddressField' key='key-sameAddressField'
                                                    labelName="My contact and billing addresses are the same" name='sameAddress'
                                                    defaultValue={this.state.sameAddress}
                                                    onValueChange={this.handleSameAddressChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    !this.state.sameAddress
                                    ?   <div className='col-md-6'>
                                            <div className='card'>
                                                <div className='card-header'>
                                                    <h6 className='font-weight-light'>Contact Address</h6>
                                                </div>
                                                <div className='card-body'>
                                                    <TextArea id='contactAddressTA' key='key-contactAddressTA'
                                                        rows={3}
                                                        labelName='Contact Address' name='contactAddress' borderless={false}
                                                        error={this.state.cAddressError}
                                                        onValueChange={this.handleCAddressChange}/>                
                                                    <div className='form-row'>
                                                        <Selector id='ccountrySelector' key='key-ccountrySelector' className='col-md-6'
                                                            borderless={false} labelName='Country' name='ccountries'
                                                            error={this.state.caCountryError}
                                                            onValueChange={this.handleCACountryChange} 
                                                            options={AppUtils.mapConstantsToSelector(Constants.COUNTRIES)} />
                                                        <Selector id='cstateSelector' key='key-cstateSelector' className='col-md-6'
                                                            borderless={false} labelName='State' name='cstates'
                                                            error={this.state.caStateError}
                                                            onValueChange={this.handleCAStateChange} 
                                                            options={AppUtils.mapConstantsToSelector(Constants.INDIAN_STATES)} />
                                                    </div>
                                                    <div className='form-row'>
                                                        <TextField id='caCityField' key='key-caCityField' className='col-md-6'
                                                            type='Text' labelName="City" name='cacity' borderless={true}
                                                            error={this.state.caCityError}
                                                            onValueChange={this.handleCACityChange}/> 
                                                        <TextField id='caZipField' key='key-caZipField' className='col-md-6'
                                                            type='Text' labelName="PIN Code" name='caZip' borderless={true}
                                                            error={this.state.caZipError}
                                                            onValueChange={this.handleCAZipChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    :   <></>
                                }
                            </div>
                            <TextField id='gstField' key='key-gstField' className='col-md-6'
                                type='Text' labelName="GST Number" name='gst' borderless={true}
                                error={this.state.gstError}
                                onValueChange={this.handleGSTChange}/>
                            <a href='javascript:void(0);' className='btn btn-success' onClick={this.onUpdate}>Update Information</a>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    private onUpdate(): void {

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

    private handlePhoneChange(value: string): void {
        this.setState({
            phone: value
        });
    }

    private handleBAddressChange(value: string): void {
        this.setState({
            bAddress: value
        });
    }

    private handleBACountryChange(value: string): void {
        this.setState({
            baCountry: value
        });
    }
        
    private handleBAStateChange(value: string): void {
        this.setState({
            baState: value
        });
    }
    
    private handleBACityChange(value: string): void {
        this.setState({
            baCity: value
        });
    }
    
    private handleBAZipChange(value: string): void {
        this.setState({
            baZip: value
        });
    }
        
    private handleCACountryChange(value: string): void {
        this.setState({
            caCountry: value
        });
    }

    private handleCAStateChange(value: string): void {
        this.setState({
            caState: value
        });
    }

    private handleCACityChange(value: string): void {
        this.setState({
            caCity: value
        });
    }
    
    private handleCAZipChange(value: string): void {
        this.setState({
            caZip: value
        });
    }

    private handleSameAddressChange(checked: boolean): void {
        this.setState({
            sameAddress: checked
        });
    }

    private handleCAddressChange(value: string): void {
        this.setState({
            cAddress: value
        });
    }

    private handleGSTChange(value: string): void {
        this.setState({
            gst: value
        });
    }

    private get currentSubscriber(): User {
        return UserStoreInstance.loggedInUser;
    }
}