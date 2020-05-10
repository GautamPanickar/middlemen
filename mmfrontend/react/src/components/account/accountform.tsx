import * as React from 'react';
import { AppUtils } from '../../utilities/apputils';
import UserHelper from '../../helpers/userhelper';
import { Enums } from '../../utilities/enums';

interface Props extends PropsBase {
}

interface State {
    nameError?: string;
    companyError?: string;
    emailError?: string;
    passwordError?: string;
    name?: string;
    company?: string;
    email?: string;
    password?: string;
    plan?: Enums.SubscriptionPlan;
    formDisplay?: boolean;
    phoneError?: string;
    phone?: string;
    sameAddress?: boolean;
    bAddressError?: string,
    baCountryError?: string;
    baStateError?: string;
    baCityError?: string;
    baZipError?: string; 
    baCountry?: string;
    baState?: string;
    baCity?: string;
    bAddress?: string;
    baZip?: string;
    caZip?: string;
    cAddressError?: string,
    caCountryError?: string;
    caStateError?: string;
    caCityError?: string;
    caZipError?: string;
    caCountry?: string;
    caState?: string;
    caCity?: string;
    cAddress?: string;
    gstError?: string;
    gst?: string;
}

export class AccountForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    /**
     * Validates the registration form.
     */
    protected validateRegistrationForm(): boolean {
        const nameError: string = this.validateName();
        const companyError: string = this.validateCompany();
        const emailError: string = this.validateEmail();
        const passwordError: string = this.validatePassword();
        this.setState({
            nameError: nameError,
            companyError: companyError,
            emailError: emailError,
            passwordError: passwordError
        });
        return AppUtils.isEmpty(nameError)
            && AppUtils.isEmpty(companyError)
            && AppUtils.isEmpty(emailError) 
            && AppUtils.isEmpty(passwordError)
            && this.state.plan !== undefined;
    }

    /**
     * Validates the subscriber update form.
     */
    protected validateUpdateForm(): boolean {
        const nameError: string = this.validateName();
        const companyError: string = this.validateCompany();
        const emailError: string = this.validateEmail();
        const phoneError: string = this.validatePhone();
        const gstError: string = this.validateGST();
        const baError: string = this.validateBillingAddress();
        const baCityError: string = this.validateBACity();
        const baCountryError: string = this.validateBACountry();
        const baStateError: string = this.validateBAState();
        const baPinError: string = this.validateBAPin();
        const caError: string = this.validateContactAddress();
        const caCityError: string = this.validateCACity();
        const caCountryError: string = this.validateCACountry();
        const caStateError: string = this.validateCAState();
        const caPinError: string = this.validateCAPin();
        this.setState({
            bAddressError: baError,
            baCountryError: baCountryError,
            baStateError: baStateError,
            baCityError: baCityError,
            baZipError: baPinError,
            cAddressError: caError,
            caCountryError: caCountryError,
            caStateError: caStateError,
            caCityError: caCityError,
            caZipError: caPinError,
            nameError: nameError,
            companyError: companyError,
            emailError: emailError,
            phoneError: phoneError,
            gstError: gstError
        });
        return AppUtils.isEmpty(nameError) && AppUtils.isEmpty(companyError) && AppUtils.isEmpty(emailError)
            && AppUtils.isEmpty(phoneError) && AppUtils.isEmpty(gstError) && AppUtils.isEmpty(caPinError)
            && AppUtils.isEmpty(baError) && AppUtils.isEmpty(baCityError) && AppUtils.isEmpty(baCountryError)
            && AppUtils.isEmpty(baStateError) && AppUtils.isEmpty(baPinError) &&AppUtils.isEmpty(caError)
            && AppUtils.isEmpty(caCityError) && AppUtils.isEmpty(caCountryError) &&AppUtils.isEmpty(caStateError);
    }

    protected validateName(): string {
        if (AppUtils.isEmpty(this.state.name) ||  this.state.name.length <= 1) {
            return 'A valid name needs to be provided to proceed with registration';
        } else if (this.state.name.length > 50) {
            return 'Length of name cannot exceed 50 characters';
        }
        return '';
    }

    protected validateCompany(): string {
        if (AppUtils.isEmpty(this.state.company) ||  this.state.company.length <= 1) {
            return 'A valid company name should be provided';
        }  else if (this.state.company.length > 50) {
            return 'Length of company name cannot exceed 50 characters';
        }
        return '';
    }

    protected validateEmail(): string {
        if (AppUtils.isEmpty(this.state.email) 
                ||  this.state.email.length <= 1 
                || !UserHelper.isValidEmail(this.state.email)) {
            return 'A valid email should be provided';
        } else if (this.state.email.length > 50) {
            return 'Length of email cannot exceed 50 characters';
        }
        return '';
    }

    protected validatePassword(): string {
        if (AppUtils.isEmpty(this.state.password) ||  this.state.email.length <= 1 ) {
            return 'You cannot proceed forward until you provide a valid password';
        } else if (this.state.password.length > 20) {
            return 'Password length cannot exceed 20 characters';
        }
        return '';
    }

    protected validatePhone(): string {
        if (AppUtils.isEmpty(this.state.phone) 
                ||  this.state.phone.length !== 10) {
            return 'A valid phone number with 10 digits should be provided';
        }
        return '';
    }

    protected validateGST(): string {
        if (this.isIndiaSelected() && AppUtils.isEmpty(this.state.gst)) {
            return 'You will have to provide a valid GST Number';
        }
        return '';
    }

    protected isIndiaSelected(): boolean {
        return this.state.baCountry === 'India';
    }

    protected validateBillingAddress(): string {
        if (AppUtils.isEmpty(this.state.bAddress)) {
            return 'A valid billing address should be provided';
        }  else if (this.state.bAddress.length > 100) {
            return 'Length of billing address cannot exceed 100 characters';
        }
        return '';
    }

    protected validateBACountry(): string {
        if (AppUtils.isEmpty(this.state.baCountry)) {
            return 'A valid country should be provided for the billing address';
        }
        return '';
    }

    protected validateBAState(): string {
        if (AppUtils.isEmpty(this.state.baState)) {
            return 'A valid state should be provided for the billing address';
        }
        return '';
    }

    protected validateBACity(): string {
        if (AppUtils.isEmpty(this.state.baCity)) {
            return 'A valid city should be provided for the billing address';
        }
        return '';
    }

    protected validateBAPin(): string {
        if (AppUtils.isEmpty(this.state.baZip)) {
            return 'A valid PIN code should be provided for the billing address';
        }
        return '';
    }

    protected validateContactAddress(): string {
        if (AppUtils.isEmpty(this.state.cAddress)) {
            return 'A valid contact address should be provided';
        }  else if (this.state.cAddress.length > 100) {
            return 'Length of contact address cannot exceed 100 characters';
        }
        return '';
    }

    protected validateCACountry(): string {
        if (AppUtils.isEmpty(this.state.caCountry)) {
            return 'A valid country should be provided for the contact address';
        }
        return '';
    }

    protected validateCAState(): string {
        if (AppUtils.isEmpty(this.state.caState)) {
            return 'A valid state should be provided for the contact address';
        }
        return '';
    }

    protected validateCACity(): string {
        if (AppUtils.isEmpty(this.state.caCity)) {
            return 'A valid city should be provided for the contact address';
        }
        return '';
    }

    protected validateCAPin(): string {
        if (AppUtils.isEmpty(this.state.caZip)) {
            return 'A valid PIN code should be provided for the contact address';
        }
        return '';
    }
}
