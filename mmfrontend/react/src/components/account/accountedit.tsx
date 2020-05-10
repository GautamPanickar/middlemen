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
import SelectorOption from '../typings/selectoroption';
import GenericActionCreator from '../../actioncreators/genericactioncreator';
import UserActionCreator from '../../actioncreators/useractioncreator';
import { Address } from '../../types/user/address';
import { AccountForm } from './accountform';
import { GenericModal } from '../common/genericmodal';

interface Props extends PropsBase {

}

export class AccountEdit extends AccountForm {
    private mutableUser: User;

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
        this.mutableUser = Object.assign({}, UserStoreInstance.loggedInUser);
    }

    public render() {
        return (
            <>
                <div id={this.props.id} key={this.props.key} className='box box-shadow dashboard-box bg-light'>
                    <div className='row'>
                        <div className='col'>
                            <AlertBox id='accountFormAlertBox'
                                    key='key-accountFormAlertBox'
                                    onHideCallBack={this.onAlertHide}/>
                            <form className='form'>
                                <div className='form-row ml-4 mr-4'>
                                    <TextField id='nameField' key='key-nameField' className='col-md-6'
                                        type='Text' labelName='Your name' name='name' borderless={true}
                                        defaultValue={this.currentSubscriber.name}
                                        error={this.state.nameError}
                                        onValueChange={this.handleNameChange}/>
                                    <TextField id='emailField' key='key-emailField' className='col-md-6'
                                        type='Email' labelName='Email' name='email' borderless={true}
                                        error={this.state.emailError}
                                        defaultValue={this.currentSubscriber.email}
                                        onValueChange={this.handleEmailChange}/>
                                    
                                </div>
                                <div className='form-row ml-4 mr-4'>
                                    <TextField id='companyField' key='key-companyField' className='col-md-6'
                                        type='Text' labelName="Company's Name" name='companyName' borderless={true}
                                        defaultValue={this.currentSubscriber.company}
                                        error={this.state.companyError}
                                        onValueChange={this.handleCompanyChange}/>
                                    <TextField id='phoneField' key='key-phoneField' className='col-md-6'
                                        type='Text' labelName="Phone" name='phone' borderless={true}
                                        defaultValue={this.currentSubscriber.contactAddress ? this.currentSubscriber.contactAddress.phone : ''}
                                        error={this.state.phoneError}
                                        onValueChange={this.handlePhoneChange}/>
                                </div>
                                <div className='form-row ml-4 mr-4'>
                                    <TextField id='gstField' key='key-gstField' className='col-md-6'
                                        type='Text' labelName="GST Number" name='gst' borderless={true}
                                        defaultValue={this.currentSubscriber.gstNumber}
                                        error={this.state.gstError}
                                        onValueChange={this.handleGSTChange}/>
                                </div>
                                <div className='row'>
                                    <div className={this.state.sameAddress ? 'col-md-12' : 'col-md-6'}>
                                        <div className='card'>
                                            <div className='card-header'>
                                                <h6>Billing Address</h6>
                                            </div>
                                            <div className='card-body'>
                                                <div className='form-row'>
                                                    <div className={this.state.sameAddress ? 'col' : 'col-md-12 pr-1 pl-1'}>
                                                        <TextArea id='billigAddressTA' key='key-billigAddressTA'
                                                            rows={this.state.sameAddress ? 5 : 3}
                                                            labelName='Address' name='billingAddress' borderless={false}
                                                            defaultValue={this.currentSubscriber.billingAddress ? this.currentSubscriber.billingAddress.line1 : ''}
                                                            error={this.state.bAddressError}
                                                            onValueChange={this.handleBAddressChange}/>
                                                    </div>
                                                    <div className={'col' + (this.state.sameAddress ? '' : ' pr-1 pl-1')}>
                                                        <div className={this.state.sameAddress ? '' : 'form-row'}>
                                                            <Selector id='countrySelector' key='key-countrySelector' className='col'
                                                                borderless={false} labelName='Country' name='countries'
                                                                defaultValue={this.currentSubscriber.billingAddress ? this.getDefaultCountry('Billing') : undefined}
                                                                error={this.state.baCountryError}
                                                                onValueChange={this.handleBACountryChange} 
                                                                options={AppUtils.mapConstantsToSelector(Constants.COUNTRIES)} />
                                                            <Selector id='stateSelector' key='key-stateSelector' className='col'
                                                                borderless={false} labelName='State' name='states'
                                                                defaultValue={this.currentSubscriber.billingAddress ? this.getDefaultState('Billing') : undefined}
                                                                error={this.state.baStateError}
                                                                onValueChange={this.handleBAStateChange} 
                                                                options={AppUtils.mapConstantsToSelector(Constants.INDIAN_STATES)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='form-row'>
                                                    <TextField id='baCityField' key='key-baCityField' className='col-md-6'
                                                        type='Text' labelName="City" name='bacity' borderless={true}
                                                        defaultValue={this.currentSubscriber.billingAddress ? this.currentSubscriber.billingAddress.city : ''}
                                                        error={this.state.baCityError}
                                                        onValueChange={this.handleBACityChange}/>
                                                    <TextField id='baZipField' key='key-baZipField' className='col-md-6'
                                                        type='Text' labelName="PIN Code" name='baZip' borderless={true}
                                                        defaultValue={this.currentSubscriber.billingAddress ? this.currentSubscriber.billingAddress.zipCode : ''}
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
                                                        <h6>Contact Address</h6>
                                                    </div>
                                                    <div className='card-body'>
                                                        <TextArea id='contactAddressTA' key='key-contactAddressTA'
                                                            rows={3} labelName='Address' name='contactAddress' borderless={false}
                                                            defaultValue={this.currentSubscriber.contactAddress ? this.currentSubscriber.contactAddress.line1 : ''}
                                                            error={this.state.cAddressError}
                                                            onValueChange={this.handleCAddressChange}/>                
                                                        <div className='form-row'>
                                                            <Selector id='ccountrySelector' key='key-ccountrySelector' className='col-md-6'
                                                                borderless={false} labelName='Country' name='ccountries'
                                                                defaultValue={this.currentSubscriber.contactAddress ? this.getDefaultCountry('Contact') : undefined}
                                                                error={this.state.caCountryError}
                                                                onValueChange={this.handleCACountryChange} 
                                                                options={AppUtils.mapConstantsToSelector(Constants.COUNTRIES)} />
                                                            <Selector id='cstateSelector' key='key-cstateSelector' className='col-md-6'
                                                                borderless={false} labelName='State' name='cstates'
                                                                defaultValue={this.currentSubscriber.contactAddress ? this.getDefaultState('Contact') : undefined}
                                                                error={this.state.caStateError}
                                                                onValueChange={this.handleCAStateChange} 
                                                                options={AppUtils.mapConstantsToSelector(Constants.INDIAN_STATES)} />
                                                        </div>
                                                        <div className='form-row'>
                                                            <TextField id='caCityField' key='key-caCityField' className='col-md-6'
                                                                type='Text' labelName="City" name='cacity' borderless={true}
                                                                defaultValue={this.currentSubscriber.contactAddress ? this.currentSubscriber.contactAddress.city : ''}
                                                                error={this.state.caCityError}
                                                                onValueChange={this.handleCACityChange}/> 
                                                            <TextField id='caZipField' key='key-caZipField' className='col-md-6'
                                                                type='Text' labelName="PIN Code" name='caZip' borderless={true}
                                                                defaultValue={this.currentSubscriber.contactAddress ? this.currentSubscriber.contactAddress.zipCode : ''}
                                                                error={this.state.caZipError}
                                                                onValueChange={this.handleCAZipChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        :   <></>
                                    }
                                </div>
                                <div className='text-center mt-3 mb-3'>
                                    <a href='javascript:void(0);' className='btn btn-success' onClick={this.onUpdate}>Update Information</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <GenericModal id='userUpdateLoaderModal' key='key-userUpdateLoaderModal' />
            </>
        );
    }

    private onUpdate(): void {
        this.setState({
            bAddressError: '',
            baCountryError:'',
            baStateError:'',
            baCityError:'',
            baZipError:'',
            cAddressError: '',
            caCountryError: '',
            caStateError: '',
            caCityError: '',
            caZipError: '',
            nameError: '',
            companyError: '',
            emailError: '',
            phoneError: '',
            gstError: ''
        });
        if (this.validateUpdateForm()) {
            GenericActionCreator.toggleOverlay(true, true);
            UserActionCreator.update(this.userToSave);
        }
    }

    private get userToSave(): User {
        return {
            _id: this.userImmutable._id,
            name: this.state.name,
            email: this.state.email,
            company: this.state.company,
            companyId:  this.userImmutable.companyId,
            activated: this.userImmutable.activated,
            gstNumber: this.state.gst,
            billingAddress: {
                line1: this.state.bAddress,
                city: this.state.baCity,
                state: this.state.baState,
                country: this.state.baCountry,
                email: this.state.email,
                phone: this.state.phone,
                zipCode: this.state.baZip
            },
            contactAddress: this.contactAddressToSave
        };
    }

    private get contactAddressToSave(): Address {
        return {
            line1: this.state.cAddress,
            city: this.state.caCity,
            state: this.state.caState,
            country: this.state.caCountry,
            email: this.state.email,
            phone: this.state.phone,
            zipCode: this.state.caZip
        }
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
        const that = this;
        this.setState({
            bAddress: value,
            cAddress: that.state.sameAddress ? value : ''
        });
    }

    private handleBACountryChange(value: SelectorOption): void {
        const that = this;
        this.setState({
            baCountry: value.value,
            caCountry: that.state.sameAddress ? value.value : ''
        });
    }
        
    private handleBAStateChange(value: SelectorOption): void {
        const that = this;
        this.setState({
            baState: value.value,
            caState: that.state.sameAddress ? value.value : ''
        });
    }
    
    private handleBACityChange(value: string): void {
        const that = this;
        this.setState({
            baCity: value,
            caCity: that.state.sameAddress ? value : ''
        });
    }
    
    private handleBAZipChange(value: string): void {
        const that = this;
        this.setState({
            baZip: value,
            caZip: that.state.sameAddress ? value : ''
        });
    }
        
    private handleCACountryChange(value: SelectorOption): void {
        this.setState({
            caCountry: value.value
        });
    }

    private handleCAStateChange(value: SelectorOption): void {
        this.setState({
            caState: value.value
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
        // return UserStoreInstance.loggedInUser;
        return this.mutableUser;
    }

    private get userImmutable(): User {
        return UserStoreInstance.loggedInUser;
    }

    private getDefaultCountry(type: string): SelectorOption {
        if (type === 'Billing') {
            return {
                label:  this.currentSubscriber.billingAddress.country,
                value: this.currentSubscriber.billingAddress.country
            };
        } else {
            return {
                label:  this.currentSubscriber.contactAddress.country,
                value: this.currentSubscriber.contactAddress.country
            };
        }
    }

    private getDefaultState(type: string): SelectorOption {
        if (type === 'Billing') {
            return {
                label:  this.currentSubscriber.billingAddress.state,
                value: this.currentSubscriber.billingAddress.state
            };
        } else {
            return {
                label:  this.currentSubscriber.contactAddress.state,
                value: this.currentSubscriber.contactAddress.state
            };
        }
    }
}