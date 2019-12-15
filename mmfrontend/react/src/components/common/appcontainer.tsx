import * as React from 'react';
import { Login } from '../login/login';

interface Props {

}

interface State {

}

export class AppContainer extends React.Component<Props, State> {
    private isAuthenticated = false;

    constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    public render() {
        return (
            this.isAuthenticated ? <div></div> : <Login />
        );
    }
}