import * as React from 'react';

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
    }

    public render() {
        return (
            <div className='row justify-content-center mb-5 mt-5'>
                <div className='col-6 text-center'>
                    <h1 className="display-3">MiddleMen</h1>
                    <h1 className='lead display-5'>Connecting the missing dots..</h1>
                    <form className='form text-left'>
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
                            <a className='btn btn-success' href='javascript:void(0);' 
                                onClick={this.login}>Sign in</a>
                        </div>
                    </form>
                    <div className='alert alert-warning text-left'>
                        <a className='alert-link' href='javascript:void(0);' 
                            onClick={this.requestResetPassword}>Did you forget your password?</a>
                    </div>
                    <div className='alert alert-warning text-left'>
                        <span>You don't have an account yet?</span>
                        <a className='alert-link' href='javascript:void(0);' 
                            onClick={this.register}>&nbsp;Register a new account</a>
                    </div>
                </div>
            </div>
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

    private login(): void {
        console.log(this.state.email);
        console.log(this.state.password);
    }

    private requestResetPassword(): void {

    }

    private register(): void {

    }
}