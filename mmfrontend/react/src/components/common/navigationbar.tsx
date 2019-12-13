import * as React from 'react';

interface Props {

}

interface State {

}

/**
 * This is the component for the navigation bar on top.
 */
export class NavigationBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    public render() {
        return (<div><h1>Attaboy!</h1></div>);
    }
}