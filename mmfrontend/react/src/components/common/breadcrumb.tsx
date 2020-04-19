import * as React from 'react';
import GenericStoreInstance, { GenericStore } from '../../stores/genericstore';
import BreadcrumbItem from '../../types/others/breadcrumbitem';

interface Props extends PropsBase {

}

interface State {
    renderedOn: number;
}

export class Breadcrumb extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            renderedOn: Date.now()
        };
    }

    public render() {
        return (
            <nav aria-label='breadcrumb' className='mt-1'>
                <ol className='breadcrumb float-right pt-4 pb-0'>
                    {this.breadcrumbItemsToRender}
                </ol>
            </nav>
        );
    }

    private get breadcrumbItemsToRender(): Array<JSX.Element> {
        let items: Array<JSX.Element> = new Array<JSX.Element>();
        const crumbLength: number = GenericStoreInstance.breadcrumbs.length;
        GenericStoreInstance.breadcrumbs.map((item: BreadcrumbItem, index: number) => {
            const itemClass = 'breadcrumb-item' + (index === crumbLength - 1 ? ' active' : '');
            let itemToRender = <li className={itemClass}>
                    <a href='javascript:void(0);'>{item.name}</a>
                </li>;
            items.push(itemToRender);
        });
        return items;
    }

    public componentDidMount() {
        GenericStoreInstance.addListener(GenericStore.BREADCRUMBS_UPDATED_EVENT, this.onBreadcrumbUpdate);
    }

    public componentWillUnmount() {
        GenericStoreInstance.removeListener(GenericStore.BREADCRUMBS_UPDATED_EVENT, this.onBreadcrumbUpdate);
    }

    /**
     * When the breadrcumb array is updated.
     */
    private onBreadcrumbUpdate(): void {
        this.setState({
            renderedOn: Date.now()
        });
    }
}