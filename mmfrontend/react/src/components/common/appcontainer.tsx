import * as React from 'react';
import { Login } from '../login/login';
import { Registration } from '../register/registration';
import GenericStoreInstance, { GenericStore } from '../../stores/genericstore';
import { Dashboard } from '../dashboard/dashboard';
import UserStoreInstance, { UserStore } from '../../stores/userstore';
import SubscriptionActionCreator from '../../actioncreators/subscriptionactioncreator';

interface Props {

}

interface State {
    showRegistration: boolean;
    showDashboard: boolean;
}

export class AppContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showRegistration: false,
            showDashboard: false
        };

        // Bindings
        this.onRegistrationLoad = this.onRegistrationLoad.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onSusbcriptionsLoad = this.onSusbcriptionsLoad.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    public render() {
        return (
            <>
                {
                    UserStoreInstance.isLoggedIn || this.state.showDashboard
                        ? <Dashboard id={'userDashboard'} key={'key-userDashboard'}/>
                        : (this.state.showRegistration ? <Registration /> : <Login />)
                }
            </>
        );
    }

    public componentDidMount() {
        GenericStoreInstance.addListener(GenericStore.LOAD_REGISTRATION_EVENT, this.onRegistrationLoad);
        UserStoreInstance.addListener(UserStore.LOGIN_SUCCESSFUL, this.onLogin);
        UserStoreInstance.addListener(UserStore.USER_SUBSCRIPTIONS_LOADED_EVENT, this.onSusbcriptionsLoad);
        UserStoreInstance.addListener(UserStore.LOGOUT_EVENT, this.onLogout);
    }

    public componentWillUnmount() {
        GenericStoreInstance.removeListener(GenericStore.LOAD_REGISTRATION_EVENT, this.onRegistrationLoad);
        UserStoreInstance.removeListener(UserStore.LOGIN_SUCCESSFUL, this.onLogin);
        UserStoreInstance.removeListener(UserStore.USER_SUBSCRIPTIONS_LOADED_EVENT, this.onSusbcriptionsLoad);
        UserStoreInstance.addListener(UserStore.LOGOUT_EVENT, this.onLogout);
    }

    /**
     * After listening to registration load event.
     */
    public onRegistrationLoad(): void {
        this.setState({
            showRegistration: true,
            showDashboard: false
        });
    }

    /**
     * After the user has logged in.
     */
    public onLogin(): void {
        SubscriptionActionCreator.loadSubscriptionsForUser(UserStoreInstance.loggedInUser._id);
    }

    /**
     * Once the susbcriptions for the user have been loaded.
     */
    public onSusbcriptionsLoad(): void {
        this.setState({
            showRegistration: false,
            showDashboard: true
        });
    }

    /**
     * On logging out of the applciation.
     */
    private onLogout(): void {
        this.setState({
            showRegistration: false,
            showDashboard: false
        });
    }
}