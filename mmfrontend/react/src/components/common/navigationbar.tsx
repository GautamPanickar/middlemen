import * as React from 'react';

interface Props {

}

interface State {
    isCollapsed?: boolean;
}

/**
 * This is the component for the navigation bar on top.
 */
export class NavigationBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isCollapsed: true
        };
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
                <div className='navbar-collapse collapse' id='navbarResponsive'>
                    <ul className='navbar-nav ml-auto'>
                        {this.renderUserAction()}
                    </ul>
                </div>
            </nav>
        );
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
        const currentState: boolean = this.state.isCollapsed;
        this.setState({
            isCollapsed: !currentState
        });
    }

    private renderUserAction(): JSX.Element {
        const isAuthenticated = false;
        if (isAuthenticated) {
            return (
                <li className='nav-item dropdown pointer'>
                <a className='nav-link dropdown-toggle' href='javascript:void(0);' id='account-menu'>
                  <span>
                      <i className='fas fa-user'></i>
                      <span>Account</span>
                  </span>
                </a>
                <ul className='dropdown-menu' aria-labelledby='account-menu'>
                    <li>
                        <a className='dropdown-item' onClick={this.collapseNavbar}>
                            <i className='fas fa-wrench'></i>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a className='dropdown-item' onClick={this.collapseNavbar}>
                            <i className='fas fa-key'></i>
                            <span>Password</span>
                        </a>
                    </li>
                    <li >
                        <a className='dropdown-item' onClick={this.logout} id='logout'>
                            <i className='fas fa-sign-out-alt'></i>
                            <span>Sign out</span>
                        </a>
                    </li>
                </ul>
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
        // for logging the user out
    }
}