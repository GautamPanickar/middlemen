import * as React from 'react';
import { Login } from '../login/login';
import { Registration } from '../register/registration';
import GenericStoreInstance, { GenericStore } from '../../stores/genericstore';

interface Props {

}

interface State {
    showLogin: boolean;
    showRegistration: boolean;
}

export class AppContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showLogin: true,
            showRegistration: false
        };

        // Bindings
        this.onRegistrationLoad = this.onRegistrationLoad.bind(this);
    }

    public render() {
        return (
            <>
                {this.state.showLogin ? <Login /> : <></>}
                {this.state.showRegistration ? <Registration /> : <></>}
            </>
        );
    }

    public componentDidMount() {
        GenericStoreInstance.addListener(GenericStore.LOAD_REGISTRATION_EVENT, this.onRegistrationLoad);
    }

    public componentWillUnmount() {
        GenericStoreInstance.removeListener(GenericStore.LOAD_REGISTRATION_EVENT, this.onRegistrationLoad);
    }

    /**
     * After listening to registration load event.
     */
    public onRegistrationLoad(): void {
        this.setState({
            showRegistration: true,
            showLogin: false
        });
    }
}