import OverlayAction from '../actions/overlayaction';
import { Overlay } from '../components/common/overlay';

class GenericActionCreator {

    /**
     * Shows or hides the overlay.
     * @param show 
     * @param hasSpinner 
     */
    public static toggleOverlay(show: boolean, hasSpinner: boolean = false): void {
        new OverlayAction(show, hasSpinner);
    }
}

export default GenericActionCreator;