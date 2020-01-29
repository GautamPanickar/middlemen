import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';

class OverlayAction {
    private _visible: boolean;
    private _hasSpinner: boolean;

    constructor(visible:boolean, hasSpinner?: boolean) {
        this._visible = visible;
        this._hasSpinner = hasSpinner;
        Dispatcher.dispatch( {
            actionType: ActionType.SHOW_HIDE_OVERLAY,
            visible: this.visible,
            hasSpinner: this.hasSpinner
        });
    }

    /**
     * Returns if the overlay is currently visible or not.
     */
    public get visible(): boolean {
        return this._visible;
    }

    /**
     * Returns if the overlay has a spinner or not
     */
    public get hasSpinner(): boolean {
        return this._hasSpinner;
    }
}

export default OverlayAction;
