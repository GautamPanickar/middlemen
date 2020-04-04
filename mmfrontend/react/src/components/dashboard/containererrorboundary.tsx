import * as React from 'react';
import UserActionCreator from '../../actioncreators/useractioncreator';

interface Props {
}

interface State {
    error: Error,
    errorInfo: React.ErrorInfo
}

export class ContainerErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            error: undefined,
            errorInfo: undefined
        };
        // Bindings
        this.onLogout = this.onLogout.bind(this);
    }

    public render() {
      if (this.state.errorInfo) {
        return (
          <div className='container d-flex h-100'>
            <div className='row align-self-center w-100 h-100 mt-5'>
              <div className='col-4 mx-auto left-panel-separator'>
                <ul className='list-group-flush'>
                  <h5 className='font-weight-lighter mt-2'><a href='javascript:void(0);' className='text-dark'>Dashboard</a></h5>
                  <h5 className='font-weight-lighter mt-2'><a href='javascript:void(0);' className='text-dark' onClick={this.onLogout}>Sign out</a></h5>
                </ul>
              </div>
              <div className='col-6 mx-auto'>
                <h2>Something went wrong&nbsp;<i className='fas fa-exclamation-circle text-danger'></i></h2>
                  <details style={{ whiteSpace: 'pre-wrap' }} className='text-danger'>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </details>
              </div>
            </div>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        // You can also log error messages to an error reporting service here
    }

    private onLogout(): void {
      UserActionCreator.logout();
      this.setState({
          error: undefined,
          errorInfo: undefined
      });
    }
}
