import * as React from 'react';
import UserStoreInstance, { UserStore } from '../../stores/userstore';
import UserActionCreator from '../../actioncreators/useractioncreator';

interface Props {

}

interface State {
    isCollapsed?: boolean;
    displayUserAction?: boolean;
}

/**
 * This is the component for the navigation bar on top.
 */
export class NavigationBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isCollapsed: true,
            displayUserAction: this.isLoggedIn
        };

        // Bindings
        this.onLogin = this.onLogin.bind(this);
        this.collapseNavbar = this.collapseNavbar.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onUserDetailsRefresh = this.onUserDetailsRefresh.bind(this);
    }

    public render() {
        return (
            <nav className='navbar navbar-light navbar-expand-md bg-light'>
                <a className='navbar-brand logo' href='#' onClick={this.collapseNavbar}>
                    <span className='navbar-title'>&nbsp;MiddleMen</span>
                </a>
                <a className='navbar-toggler d-lg-none' href='javascript:void(0);' 
                    data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' 
                    aria-expanded='false' aria-label='Toggle navigation' onClick={this.toggleNavbar}>
                    <i className='fas fa-bars'></i>
                </a>
                <div className='navbar-collapse' id='navbarResponsive'>
                    <ul className='navbar-nav ml-auto'>
                        {this.renderUserAction()}
                    </ul>
                </div>
            </nav>
        );
    }

    public componentDidMount() {
        UserStoreInstance.addListener(UserStore.LOGIN_SUCCESSFUL, this.onLogin);
        UserStoreInstance.addListener(UserStore.LOGOUT_EVENT, this.onLogout);
        UserStoreInstance.addListener(UserStore.USER_DETAILS_LOADED_EVENT, this.onUserDetailsRefresh);
    }

    public componentWillUnmount() {
        UserStoreInstance.removeListener(UserStore.LOGIN_SUCCESSFUL, this.onLogin);
        UserStoreInstance.removeListener(UserStore.LOGOUT_EVENT, this.onLogout);
        UserStoreInstance.removeListener(UserStore.USER_DETAILS_LOADED_EVENT, this.onUserDetailsRefresh);
    }

    /**
     * Collapses the navbar
     */
    private collapseNavbar(): void {
        this.setState({
            isCollapsed: true
        });
    }

    /**
     * Toggles the navbar. Useful when the navbar is in collapsed state in small widths.
     */
    private toggleNavbar(): void {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }

    private renderUserAction(): JSX.Element {
        if (this.state.displayUserAction) {
            return (
                <li className='nav-item dropdown pointer'>
                <a className='nav-link dropdown-toggle' href='javascript:void(0);' id='account-menu' onClick={this.toggleNavbar}>
                  <span>
                      <i className='fas fa-user'></i>&nbsp;
                      <span>Account</span>
                  </span>
                </a>
                {
                    !this.state.isCollapsed
                        ? <ul className='dropdown-menu' >
                            <li>
                                <a className='dropdown-item' onClick={this.collapseNavbar}>
                                    <i className='fas fa-wrench'></i>&nbsp;
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li>
                                <a className='dropdown-item' onClick={this.collapseNavbar}>
                                    <i className='fas fa-key'></i>&nbsp;
                                    <span>Password</span>
                                </a>
                            </li>
                            <li >
                                <a className='dropdown-item' onClick={this.logout} id='logout'>
                                    <i className='fas fa-sign-out-alt'></i>&nbsp;
                                    <span>Sign out</span>
                                </a>
                            </li>
                        </ul>
                        : <></>
                }
                
            </li>
            );
        } else {
            return null;
        }
    }

    /**
     * Logs the user out of the application.
     */
    private logout(): void {
        UserActionCreator.logout();
    }

    /**
     * When the user logs in at first.
     */
    private onLogin(): void {
        this.setState({
            displayUserAction: true
        });
    }

    /**
     * Checks if there is already a user logged in.
     */
    private get isLoggedIn(): boolean {
        return UserStoreInstance.loggedInUser ? true : false;
    }

    /**
     * After successful logout.
     */
    private onLogout(): void {
        this.setState({
            isCollapsed: true,
            displayUserAction: false
        });
    }

    /**
     * On refreshing the suer details section.
     */
    private onUserDetailsRefresh(): void {
        this.setState({
            isCollapsed: true,
            displayUserAction: true
        });
    }
}