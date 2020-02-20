import OverlayAction from '../actions/overlayaction';
import AlertAction from '../actions/alertaction';

class GenericActionCreator {

    /**
     * Shows or hides the overlay.
     * @param show 
     * @param hasSpinner 
     */
    public static toggleOverlay(show: boolean, hasSpinner: boolean = false): void {
        if (!show) {
            setTimeout(() => {
                new OverlayAction(show, hasSpinner);
            }, 1000);
        } else {
            new OverlayAction(show, hasSpinner);
        }
    }

    /**
     * Displays the alert box with the given message.
     * @param message 
     */
    public static showFormAlert(message: string): void {
        new AlertAction(message);
    }
}

export default GenericActionCreator;