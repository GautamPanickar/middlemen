import * as React from 'react';
import GenericStoreInstance, { GenericStore } from '../../stores/genericstore';

interface Props {

}

interface State {
    display?: boolean;
}

/**
 * This is the overlay component which gets displayed when showing a loader or modal.
 */
export class Overlay extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            display: false
        }

        // Bindings
        this.onShowOrHideOverlay = this.onShowOrHideOverlay.bind(this);
    }

    public render() {
        const overlayClass: string = 'overlay';
        return (
            <div className={this.state.display ? overlayClass + ' show' : 'hide' }>
            </div>
        );
    }

    public componentDidMount() {
        GenericStoreInstance.addListener(GenericStore.SHOW_HIDE_OVERLAY, this.onShowOrHideOverlay);
    }

    public componentWillUnmount() {
        GenericStoreInstance.removeListener(GenericStore.SHOW_HIDE_OVERLAY, this.onShowOrHideOverlay);
    }

    private onShowOrHideOverlay = () => {
        this.setState({
            display: GenericStoreInstance.hasOverlay
        });
    }
}