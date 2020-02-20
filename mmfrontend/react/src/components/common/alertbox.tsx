import React = require('react');
import { AppUtils } from '../../utilities/apputils';
import GenericStoreInstance, { GenericStore } from '../../stores/genericstore';

interface Props extends PropsBase {
    onHideCallBack: Function;
}

interface State {
    type: AlertType;
    message: string;
}

type AlertType = 'Success' | 'Danger' | 'Info' | 'Warning' | 'Light' | 'Dark';

/**
 * Alert box component mainly used for diaplying form errors.
 */
export class AlertBox extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            type: 'Danger',
            message: ''
        }

        // Bindings 
        this.hideAlertBox = this.hideAlertBox.bind(this);
        this.onShowHideAlert = this.onShowHideAlert.bind(this);
    }

    public render() {
        const alertClass: string = 'alert alert-dismissible fade show ' + this.alertClassName;
        return (
            AppUtils.isNotEmpty(this.state.message) ? 
                <div className={alertClass} role='alert' id={this.props.id} key={this.props.key}>
                    <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={this.hideAlertBox}>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    <h6 className='font-weight-light'><i className='fas fa-microphone'></i>&nbsp;{this.state.message}</h6>
                </div>
                : <div></div>
        );
    }

    public componentDidMount() {
        GenericStoreInstance.addListener(GenericStore.SHOW_HIDE_ALERT_EVENT, this.onShowHideAlert);
    }

    public componentWillUnmount() {
        GenericStoreInstance.removeListener(GenericStore.SHOW_HIDE_ALERT_EVENT, this.onShowHideAlert);
    }
    
    private get alertClassName(): string {
        switch (this.state.type) {
            case 'Success' : return 'alert-success';
            case 'Danger': return 'alert-danger';
            case 'Info': return 'alert-info';
            case 'Warning': return 'alert-warning';
            case 'Light': return 'alert-secondary';
            case 'Dark': return 'alert-dark';
            default: return 'alert-secondary';
        }
    }

    private hideAlertBox(): void {
        this.setState({
            message: ''
        });
        if (this.props.onHideCallBack) {
            this.props.onHideCallBack();
        }
    }

    private onShowHideAlert(): void {
        this.setState({
            message: GenericStoreInstance.alertMessage,
            type: this.parseAlertType(GenericStoreInstance.alertType)
        });
    }

    private parseAlertType(type: string): AlertType {
        switch(type) {
            case 'Danger': return 'Danger';
            default: return 'Danger';
        }
    }
}