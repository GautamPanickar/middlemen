import * as React from 'react';
import { AppUtils } from '../../utilities/apputils';
import { AlertBox } from '../common/alertbox';
import UserActionCreator from '../../actioncreators/useractioncreator';
import UserHelper from '../../helpers/userhelper';
import GenericActionCreator from '../../actioncreators/genericactioncreator';
import { GenericModal } from '../common/genericmodal';

interface Props {

}

interface State {
    email?: string;
    password?: string;
}

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        // Bindings
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this.requestResetPassword = this.requestResetPassword.bind(this);
        this.register = this.register.bind(this);
        this.onAlertHide = this.onAlertHide.bind(this);
    }

    public render() {
        return (
            <>
            <div className='row justify-content-center mb-5 mt-5'>
                <div className='col-6 text-center'>
                    <h1 className="display-3">MiddleMen</h1>
                    <h1 className='lead display-5'>Connecting the missing dots..</h1>
                    <AlertBox id='loginFormAlertBox'
                        key='key-loginFormAlertBox'
                        onHideCallBack={this.onAlertHide}/>
                    <form className='form text-left mt-4'>
                        <div className='form-group'>
                            <label className='username-label' htmlFor='email'>Email</label>
                            <input type='text' className='form-control borderless-text-field' 
                                name='email' id='email' 
                                placeholder='Your email'
                                value={this.state.email}
                                onChange={this.handleEmailChange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control borderless-text-field' 
                                name='password' id='password' 
                                placeholder='Your password'
                                value={this.state.password}
                                onChange={this.handlePasswordChange}/>
                        </div>
                        <div className='text-center mb-2'>
                            <a className='btn btn-dark' href='javascript:void(0);' 
                                onClick={this.login}>Sign in</a>
                        </div>
                    </form>
                    <div className='alert alert-secondary text-left'>
                        <a className='alert-link' href='javascript:void(0);' 
                            onClick={this.requestResetPassword}>Did you forget your password?</a>
                    </div>
                    <div className='alert alert-secondary text-left'>
                        <span>You don't have an account yet?</span>
                        <a className='alert-link' href='javascript:void(0);' 
                            onClick={this.register}>&nbsp;Register a new account</a>
                    </div>
                </div>
            </div>
            <GenericModal id='loginFormLoaderModal' key='key-loginFormLoaderModal' />
            </>
        );
    }

    /**
     * Handles email text field change
     * @param event
     */
    private handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            email: event.target.value
        });
    }

    /**
     * Handles password text field change
     * @param event
     */
    private handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            password: event.target.value
        });
    }

    /**
     * On clicking the login button.
     */
    private login(): void {
        if (AppUtils.isNotEmpty(this.state.email) && AppUtils.isNotEmpty(this.state.password)) {
            if (UserHelper.isValidEmail(this.state.email)) {
                GenericActionCreator.toggleOverlay(true, true);
                UserActionCreator.login(this.state.email, this.state.password);               
            } else {
                GenericActionCreator.showFormAlert('Entered email id is invalid!');
            }
        } else {
            GenericActionCreator.showFormAlert('Email or password cannot be empty!');
        }
    }

    private requestResetPassword(): void {

    }

    /**
     * On clicking the register link
     */
    private register(): void {
        UserActionCreator.loadRegistrationSection();
    }

    private onAlertHide = () => {
        // Do something if needed.
    }
}