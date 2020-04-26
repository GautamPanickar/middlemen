import * as React from 'react';
import { Spinner } from '../common/spinner';
import { User } from '../../types/user/user';
import UserStoreInstance, { UserStore } from '../../stores/userstore';
import { TextArea } from '../common/textarea';
import { SubscriptionHelper } from '../../helpers/subscriptionhelper';
import { AppUtils } from '../../utilities/apputils';
import { Address } from '../../types/user/address';
import Subscription from '../../types/user/subscription';
import { TextField } from '../common/textfield';
import UserActionCreator from '../../actioncreators/useractioncreator';

interface Props {
    billingAddressOnly?: boolean;
}

interface State {
    isLoading: boolean;
    fieldToShow: string;
    billingAddressErrror: string;
    contactAddressErrror: string;
    companyNameError: string;
    nameError: string;
    companyName: string;
    name: string;
    billingAddress: string;
    contactAddress: string;
    renderedOn: number;
}

export class SubscriberInfoBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state= {
            isLoading: false,
            fieldToShow: '',
            billingAddressErrror: '',
            contactAddressErrror: '',
            companyNameError: '',
            nameError: '',
            companyName: '',
            name: '',
            billingAddress: '',
            contactAddress: '',
            renderedOn: 0
        };
        // Bindings
        this.onSubscriberEdit = this.onSubscriberEdit.bind(this);
        this.onFieldEdit = this.onFieldEdit.bind(this);        
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
        this.onUserInfoUpdate = this.onUserInfoUpdate.bind(this);
    }

    public render() {
        return (
            <>
                <h5 className='font-weight-light p-2 bg-light'>
                    <i className='far fa-id-badge'></i>&nbsp;Subscriber Information&nbsp;
                    <a href='javascript:void(0);' onClick={this.onSubscriberEdit.bind(this, 'BillingAddress')}>
                        &nbsp;<i className='fas fa-pen'></i>
                    </a>
                </h5>
                {this.state.isLoading ? <Spinner color={'Blue'}/> : <></>}
                {this.props.billingAddressOnly ? this.billingAddressField : this.subscriberInfoFields}
            </>
        );
    }

    /**
     * Billing Address field with editable textfield
     */
    private get billingAddressField(): JSX.Element {
        let currentSubscriber: User = UserStoreInstance.loggedInUser;
        return (
            <ul className='list-group list-group-flush'>
                {
                    currentSubscriber.billingAddress && AppUtils.isNotEmpty(currentSubscriber.billingAddress.line1)
                    ? <li className='list-group-item'>
                        {
                            this.state.fieldToShow !== 'BillingAddress'
                            ? <div>
                                <p className='m-0 font-weight-light'>Billing address
                                    <a href='javascript:void(0);' onClick={this.onFieldEdit.bind(this, 'BillingAddress')}>
                                        &nbsp;<i className='fas fa-pen'></i>
                                    </a>
                                </p>
                                <h6 dangerouslySetInnerHTML={this.getAddressAsHTML(currentSubscriber.billingAddress)}></h6>
                            </div>
                            : <div>
                                <TextArea id='billigAddressTA' key='key-billigAddressTA'
                                    rows={3}
                                    labelName='Billing Address' name='billingAddress' borderless={false}
                                    error={this.state.billingAddressErrror}
                                    onValueChange={this.handleFieldValueChange.bind(this, 'BillingAddress')}/>
                                {this.getEditableFieldActionButtons('BillingAddress')}
                        </div>
                        }
                    </li>
                    : <></>
                }
            </ul>
        );
    }

    /**
     * Returns the important fields for a subscriber
     */
    private get subscriberInfoFields(): JSX.Element {
        let subscriptions: Subscription[] = UserStoreInstance.subscriptions;
        let hasOneSubscription: boolean =  subscriptions && subscriptions.length === 1;
        let currentSubscription: Subscription = hasOneSubscription ? subscriptions[0] : undefined;
        return (
            <ul className='list-group list-group-flush'>
                {
                    currentSubscription
                    ? <>
                        {this.getCompanyField()}
                        <li className='list-group-item'>
                            <p className='m-0 font-weight-light'>Company ID</p>
                            <h6>{this.currentSubscriber.companyId}</h6>
                        </li>
                        <li className='list-group-item' >
                            <p className='m-0 font-weight-light'>GST Number</p>
                            <h6>{this.currentSubscriber.gstNumber}</h6>
                        </li>
                    </>
                    : <></>
                }
                {
                    this.currentSubscriber
                    ? <>
                        {this.getNameField()}
                        <li className='list-group-item' >
                            <p className='m-0 font-weight-light'>Email</p>
                            <h6>{this.currentSubscriber.email}</h6>
                        </li>
                        {this.currentSubscriber.contactAddress ? this.getContactAddressField() : <></>}
                    </>
                    : <></>
                }
                
            </ul>
        );
    }

    /**
     * Returns the contact address textfield with editable text field.
     */
    private getContactAddressField(): JSX.Element {
        return (
            <>
            <li className='list-group-item'>
                {
                    this.state.fieldToShow !== 'ContactAddress'
                    ? <div>
                        <p className='m-0 font-weight-light'>ContactAddress
                            <a href='javascript:void(0);' onClick={this.onFieldEdit.bind(this, 'ContactAddress')}>
                                &nbsp;<i className='fas fa-pen'></i>
                            </a>
                        </p>
                        <h6 dangerouslySetInnerHTML={this.getAddressAsHTML(this.currentSubscriber.contactAddress)}></h6>
                    </div>
                    : <div>
                        <TextArea id='contactAddressTA' key='key-contactAddressTA'
                            rows={3}
                            labelName='Contact Address' name='contactAddress' borderless={false}
                            error={this.state.contactAddressErrror}
                            onValueChange={this.handleFieldValueChange.bind(this, 'ContactAddress')}/>
                        {this.getEditableFieldActionButtons('ContactAddress')}
                    </div>
                }
            </li>
            <li className='list-group-item'>
                <p className='m-0 font-weight-light'>Phone Number</p>
                <h6>{this.currentSubscriber.contactAddress.phone}</h6>
            </li>
            </>
        );
    }

    /**
     * Returns the editable name field
     */
    private getNameField(): JSX.Element {
        return (
            <li className='list-group-item'>
                {
                    this.state.fieldToShow !== 'Name'
                    ? <div>
                        <p className='m-0 font-weight-light'>Name
                            <a href='javascript:void(0);' onClick={this.onFieldEdit.bind(this, 'Name')}>
                                &nbsp;<i className='fas fa-pen'></i>
                            </a>
                        </p>
                        <h6>{this.currentSubscriber.name}</h6>
                    </div>
                    : <div>
                        <TextField id={'name'} key={'key-name'}
                            type='Text' labelName={'Name'} name='name' borderless={true}
                            error={this.state.nameError}
                            defaultValue={this.currentSubscriber.name}
                            onValueChange={this.handleFieldValueChange.bind(this, 'Name')}/>
                        {this.getEditableFieldActionButtons('Name')}
                    </div>
                }
            </li>
        );
    }

    /**
     * Returns the editable company name field
     */
    private getCompanyField(): JSX.Element {
        return(
            <li className='list-group-item'>
                {
                    this.state.fieldToShow !== 'Company'
                    ? <div>
                        <p className='m-0 font-weight-light'>Company
                            <a href='javascript:void(0);' onClick={this.onFieldEdit.bind(this, 'Company')}>
                                &nbsp;<i className='fas fa-pen'></i>
                            </a>
                        </p>
                        <h6>{this.currentSubscriber.company}</h6>
                    </div>
                    : <div>
                        <TextField id={'companyName'} key={'key-companyName'}
                            type='Text' labelName={'Company'} name='companyName' borderless={true}
                            error={this.state.companyNameError}
                            defaultValue={this.currentSubscriber.company}
                            onValueChange={this.handleFieldValueChange.bind(this, 'Company')}/>
                        {this.getEditableFieldActionButtons('Company')}
                    </div>
                }
            </li>
        );
    }

    /**
     * Returns the action buttons for the editable fields
     * @param fieldName 
     */
    private getEditableFieldActionButtons(fieldName: string): JSX.Element {
        return (
            <div className='mt-1'>
                <button type='button' className='btn btn-sm btn-secondary' onClick={this.onCancelClick.bind(this, fieldName)}>Cancel</button>
                <button type='button' className='btn ml-1 btn-sm btn-primary' onClick={this.onSaveClick.bind(this, fieldName)}>Save</button>
            </div>
        );
    }

    public componentDidMount() {
        UserStoreInstance.addListener(UserStore.USER_INFO_UPDATED_EVENT, this.onUserInfoUpdate);
    }

    public componentWillUnmount() {
        UserStoreInstance.removeListener(UserStore.USER_INFO_UPDATED_EVENT, this.onUserInfoUpdate);
    }

    /**
     * On clicking the edit button against the subscriber info box.
     */
    private onSubscriberEdit(field: string): void {
        this.setState({
            fieldToShow: field
        });
    }

    /**
     * On editing an editable field.
     */
    private onFieldEdit(name: string): void {
        this.setState({
            fieldToShow: name
        });
    }

    /**
     * Returns the address as HTML
     */
    private getAddressAsHTML(address: Address): any {
        return {
            _html: SubscriptionHelper.getSubscriberAddress(address)
        };
    }

    /**
     * On a field's value change.
     * @param field 
     */
    private handleFieldValueChange(field: string, value: string): void {
        switch (field) {
            case 'BillingAddress': 
                this.setState({
                    billingAddress: value
                });
                break;
            case 'ContactAddress': 
                this.setState({
                    contactAddress: value
                });
                break;
            case 'Name': 
                this.setState({
                    name: value
                });
                break;
            case 'Company': 
                this.setState({
                    companyName: value
                });
                break;
        }
    }

    /**
     * On canncelling a edited field
     * @param field 
     */
    private onCancelClick(field: string): void {
        this.setState({
            billingAddress: '',
            contactAddress: '',
            name: '',
            companyName: '',
            fieldToShow: ''
        });
    }

    /**
     * On saving the edited changes to a field.
     * @param field 
     */
    private onSaveClick(field: string): void {
        const userInfo: User = Object.assign({}, this.currentSubscriber);
        switch (field) {
            case 'Company': 
                userInfo.company = this.state.companyName;
                break;
            case 'BillingAddress': 
                userInfo.billingAddress.line1 = this.state.billingAddress;
                break;
            case 'ContactAddress': 
                userInfo.contactAddress.line1 = this.state.contactAddress;
                break;
            case 'Name': 
                userInfo.name = this.state.name;
                break;
        }
        UserActionCreator.updateUserInfo(userInfo._id, userInfo, field);
    }

    private get currentSubscriber(): User {
        return UserStoreInstance.loggedInUser;
    }

    private onUserInfoUpdate(): void {
        this.setState({
            renderedOn: Date.now(),
            fieldToShow: ''
        });
    }
}
