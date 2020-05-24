import { EventEmitter } from 'events';
import Dispatcher from '../actioncreators/dispatcher';
import ActionType from '../actions/typings/actiontypes';
import { User } from '../types/user/user';
import LoginAction from '../actions/loginaction';
import ErrorData from '../dataservices/typings/errordata';
import UserRegistrationAction from '../actions/userregistrationaction';
import LoadSubscriptionAction from '../actions/loadsubscriptionaction';
import Subscription from '../types/user/subscription';
import StorageService from '../dataservices/storageservice';
import { AppUtils } from '../utilities/apputils';
import LoadUserAction from '../actions/loaduseraction';
import UserInfoUpdateAction from '../actions/userinfoupdateaction';
import { Constants } from '../utilities/constants';

export class UserStore extends EventEmitter {
    // Store variables
    private _loggedInUser: User;
    private _subscriptions: Subscription[];

    // Events
    public static LOGIN_SUCCESSFUL: string = 'LoginSuccessful';
    public static LOGIN_UNSUCCESSFUL: string = 'LoginUnsuccessful';
    public static USER_REGISTRATION_SUCCESSFUL_EVENT: string = 'UserRegistrationSuccessfulEvent';
    public static USER_REGISTRATION_UNSUCCESSFUL_EVENT: string = 'UserRegistrationUnSuccessfulEvent';
    public static USER_SUBSCRIPTIONS_LOADED_EVENT: string = 'UserSubscriptionsLoadedEvent';
    public static LOGOUT_EVENT: string = 'LogoutEvent';
    public static USER_DETAILS_LOADED_EVENT: string = 'UserDetailsLoadedEvent';
    public static USER_INFO_UPDATED_EVENT: string = 'UserInfoUpdatedEvent';

    constructor() {
        super();

        // Registering the callback
        Dispatcher.register(this.dispatcherCallback.bind(this));
    }

    // Whenever the action is dipatched from an action dispatcher
    private dispatcherCallback(action: any) {
        switch(action.actionType) {
            case ActionType.LOGIN:
                const loginAction = action as LoginAction;
                this._loggedInUser = loginAction.user;
                if (this._loggedInUser) {
                    StorageService.storeItem('loggedinuserid', this._loggedInUser._id);
                    this.emit(UserStore.LOGIN_SUCCESSFUL);
                } else {
                    this.emit(UserStore.LOGIN_UNSUCCESSFUL);
                }
                break;
            case ActionType.LOGOUT:
                this._loggedInUser = undefined;
                StorageService.clearItem('authenticationtoken');
                this.emit(UserStore.LOGOUT_EVENT);
                break;
            case ActionType.USER_REGISTERED_ACTION:
                const regAction = action as UserRegistrationAction;
                this._loggedInUser = regAction.user;
                if (this._loggedInUser) {
                    this.emit(UserStore.USER_REGISTRATION_SUCCESSFUL_EVENT);
                    this.emit(UserStore.LOGOUT_EVENT);
                } else {
                    this.emit(UserStore.USER_REGISTRATION_UNSUCCESSFUL_EVENT);
                }                
                break;
            case ActionType.LOAD_SUBSCRIPTION_ACTION:
                const subscriptionAction = action as LoadSubscriptionAction;
                this._subscriptions = subscriptionAction.subscriptions;
                this.emit(UserStore.USER_SUBSCRIPTIONS_LOADED_EVENT);
                break;
            case ActionType.LOAD_USER_ACTION:
                const loadUserAction = action as LoadUserAction;
                if (!this._loggedInUser) {
                    this._loggedInUser = loadUserAction.user;
                }
                this.emit(UserStore.USER_DETAILS_LOADED_EVENT);
                break;
            case ActionType.USER_INFO_UPDATED_ACTION:
                const infoAction = action as UserInfoUpdateAction;
                this._loggedInUser = infoAction.user;
                this.emit(UserStore.USER_INFO_UPDATED_EVENT);
                break;
        }
    }

    /**
     * Returns the logged in user.
     */
    public get loggedInUser(): User {
        return this._loggedInUser;
    }

    /**
     * Returns the subscriptinos of the user.
     */
    public get subscriptions(): Subscription[] {
        return this._subscriptions;
    }

    /**
     * Checks in the local storage to see if the user is logged in.
     */
    public get isLoggedIn(): boolean {
        return AppUtils.isNotEmpty(StorageService.retrieveItem('authenticationtoken'));
    }

    /**
     * Checks if the logged in user has super admin role.
     */
    public get isSuperAdmin(): boolean {
        return this._loggedInUser && this._loggedInUser.roles.includes(Constants.ROLE_SUPER_ADMIN);
    }

    /**
     * Checks if the logged in user has account admin role.
     */
    public get isAccountAdmin(): boolean {
        return this._loggedInUser && this._loggedInUser.roles.includes(Constants.ROLE_ACCOUNT_ADMIN);
    }

    /**
     * Checks if the logged in user has ssubscriber role.
     */
    public get isSubscriber(): boolean {
        return this._loggedInUser && this._loggedInUser.roles.includes(Constants.ROLE_SUBSCRIBER);
    }
}

let UserStoreInstance = new UserStore();
export default UserStoreInstance;
