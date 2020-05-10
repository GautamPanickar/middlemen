import OverlayAction from '../actions/overlayaction';
import AlertAction from '../actions/alertaction';
import BreadcrumbItem from '../types/others/breadcrumbitem';
import UpdateBreadcrumbAction, { BreadcrumbAction } from '../actions/updatebreadcrumbaction';

class GenericActionCreator {

    /**
     * Shows or hides the overlay.
     * @param show 
     * @param hasSpinner 
     */
    public static toggleOverlay(show: boolean, hasSpinner: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(new OverlayAction(show, hasSpinner));
        });
    }

    /**
     * Displays the alert box with the given message.
     * @param message 
     */
    public static showFormAlert(message: string): void {
        new AlertAction(message);
    }

    /**
     * Updates the breadcrumb.
     * @param item 
     * @param action 
     */
    public static updateBreadCrumb(item: BreadcrumbItem, action: BreadcrumbAction): void {
        new UpdateBreadcrumbAction(item, action);
    }
}

export default GenericActionCreator;