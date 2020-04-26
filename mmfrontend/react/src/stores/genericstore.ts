import { EventEmitter } from 'events';
import Dispatcher from '../actioncreators/dispatcher';
import ActionType from '../actions/typings/actiontypes';
import OverlayAction from '../actions/overlayaction';
import LoadRegistrationAction from '../actions/loadregistrationaction';
import AlertAction from '../actions/alertaction';
import BreadcrumbItem from '../types/others/breadcrumbitem';
import UpdateBreadcrumbAction from '../actions/updatebreadcrumbaction';

export class GenericStore extends EventEmitter {
    // Store variables
    private _hasOverlay: boolean;
    private _hasSpinner: boolean;
    private _alertMessage: string;
    private _alertType: string;
    private _breadcrumbs: BreadcrumbItem[];

    // Events
    public static SHOW_HIDE_OVERLAY: string = 'ShowHideOverlay';
    public static LOAD_REGISTRATION_EVENT: string = 'LoadRegistrationEvent';
    public static SHOW_HIDE_ALERT_EVENT: string = 'ShowHideAlertEvent';
    public static BREADCRUMBS_UPDATED_EVENT: string = 'BreadcrumbsUpdatedEvent';

    constructor () {
        super();
        this._breadcrumbs = [];
        this._breadcrumbs.push(this.defaultBreadcrumb);

        Dispatcher.register(this.dispatcherCallback.bind(this));
    }

    // Whenever the action is dipatched from an action dispatcher
    private dispatcherCallback(action: any) {
        switch(action.actionType) {
            case ActionType.SHOW_HIDE_OVERLAY:
                const overlayAction = action as OverlayAction;
                this._hasOverlay = overlayAction.visible;
                this._hasSpinner = overlayAction.hasSpinner;
                this.emit(GenericStore.SHOW_HIDE_OVERLAY);
                break;
            case ActionType.LOAD_REGISTRATION_ACTION:
                const loadRegistrationAction = action as LoadRegistrationAction;
                this.emit(GenericStore.LOAD_REGISTRATION_EVENT);
                break;
            case ActionType.ALERT_ACTION:
                const alertAction = action as AlertAction;
                this._alertMessage = alertAction.message;
                this._alertType = alertAction.type;
                this.hideOverlay();
                this.emit(GenericStore.SHOW_HIDE_ALERT_EVENT);
                this.emit(GenericStore.SHOW_HIDE_OVERLAY);
                break;
            case ActionType.UPDATE_BREADCRUMB_ACTION:
                const breadcrumbAction = action as UpdateBreadcrumbAction;
                if (breadcrumbAction.action === 'INIT') {
                    this._breadcrumbs = [];
                } else if (breadcrumbAction.action === 'PUSH') {
                    this._breadcrumbs.push(breadcrumbAction.item);
                } else if (breadcrumbAction.action === 'POP' && breadcrumbAction.item === null) {
                    this._breadcrumbs.pop();
                } else if (breadcrumbAction.action === 'POP' && breadcrumbAction.item !== null) {
                    this._breadcrumbs = this._breadcrumbs.filter((item: BreadcrumbItem) => {
                        item.ukey !== breadcrumbAction.item.ukey
                    });
                }
                this.emit(GenericStore.BREADCRUMBS_UPDATED_EVENT);
                break; 
            case ActionType.LOGIN:
            case ActionType.USER_REGISTERED_ACTION:
            case ActionType.USER_INFO_UPDATED_ACTION:
                this.hideOverlay();
                this.emit(GenericStore.SHOW_HIDE_OVERLAY);
                break;
        }
    }

    /**
     * Hides the overlay.
     */
    private hideOverlay(): void {
        this._hasOverlay = false;
        this._hasSpinner = false;
    }

    /**
     * Returns if the overlay is activated or not.
     */
    public get hasOverlay(): boolean {
        return this._hasOverlay;
    }

    /**
     * Returns if the overlay has a spinner too.
     */
    public get hasSpinner(): boolean {
        return this._hasSpinner;
    }

    /**
     * Returns the active alert message.
     */
    public get alertMessage(): string {
        return this._alertMessage;
    }

    /**
     * Returns the active alert type;
     */
    public get alertType(): string {
        return this._alertType;
    }

    /**
     * Returns the default home breadcrumb.
     */
    public get defaultBreadcrumb(): BreadcrumbItem {
        const item: BreadcrumbItem = {
            ukey: 'homeKEY-000',
            name: 'Home',
            parent: null,
            active: true
        };
        return item;
    }

    /**
     * Returns the array of breadcrumbs.
     */
    public get breadcrumbs(): BreadcrumbItem[] {
        return this._breadcrumbs;
    }
}

let GenericStoreInstance = new GenericStore();
export default GenericStoreInstance;