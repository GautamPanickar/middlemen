import { EventEmitter } from 'events';
import Dispatcher from '../actioncreators/dispatcher';
import ActionType from '../actions/typings/actiontypes';
import OverlayAction from '../actions/overlayaction';
import LoadRegistrationAction from '../actions/loadregistrationaction';

export class GenericStore extends EventEmitter {
    // Store variables
    private _hasOverlay: boolean;
    private _hasSpinner: boolean;

    // Events
    public static SHOW_HIDE_OVERLAY: string = 'ShowHideOverlay';
    public static LOAD_REGISTRATION_EVENT: string = 'LoadRegistrationEvent';

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
}

let GenericStoreInstance = new GenericStore();
export default GenericStoreInstance;