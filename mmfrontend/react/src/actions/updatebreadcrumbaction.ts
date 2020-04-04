import Dispatcher from '../actioncreators/dispatcher';
import ActionType from './typings/actiontypes';
import BreadcrumbItem from '../types/others/breadcrumbitem';

export type BreadcrumbAction = 'PUSH' | 'POP' | 'INIT';
class UpdateBreadcrumbAction {
    private _item: BreadcrumbItem;
    private _action: BreadcrumbAction;

    constructor(item: BreadcrumbItem, action: BreadcrumbAction) {
        this._item = item;
        this._action = action;
        Dispatcher.dispatch( {
            actionType: ActionType.UPDATE_BREADCRUMB_ACTION,
            item: this.item,
            action: this.action
        });
    }

    /**
     * Returns the last pushed or popped breadcrumb item.
     */
    public get item(): BreadcrumbItem {
        return this._item;
    }

    /**
     * Returns the breadcrumb action.
     */
    public get action(): BreadcrumbAction {
        return this._action;
    }
}

export default UpdateBreadcrumbAction;
