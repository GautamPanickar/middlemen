import { EventEmitter } from 'events';
import Dispatcher from '../actioncreators/dispatcher';
import ActionType from '../actions/typings/actiontypes';
import OverlayAction from '../actions/overlayaction';
import LoadRegistrationAction from '../actions/loadregistrationaction';
import AlertAction from '../actions/alertaction';

export class GenericStore extends EventEmitter {
    // Store variables
    private _hasOverlay: boolean;
    private _hasSpinner: boolean;
    private _alertMessage: string;
    private _alertType: string;

    // Events
    public static SHOW_HIDE_OVERLAY: string = 'ShowHideOverlay';
    public static LOAD_REGISTRATION_EVENT: string = 'LoadRegistrationEvent';
    public static SHOW_HIDE_ALERT_EVENT: string = 'ShowHideAlertEvent';

    constructor () {
        super();
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
                this.emit(GenericStore.SHOW_HIDE_ALERT_EVENT);
                break;
        }
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
}

let GenericStoreInstance = new GenericStore();
export default GenericStoreInstance;