import * as React from 'react';

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
    }

    public render() {
        const overlayClass: string = 'overlay';
        return (
            <div className={this.state.display ? overlayClass + ' show' : 'hide' }>
            </div>
        );
    }

}