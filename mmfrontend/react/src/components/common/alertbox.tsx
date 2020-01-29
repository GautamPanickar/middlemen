import React = require('react');
import { AppUtils } from '../../utilities/apputils';

interface Props extends PropsBase {
    type: AlertType;
    message: string;
    onHideCallBack: Function;
}

type AlertType = 'Success' | 'Danger' | 'Info' | 'Warning' | 'Light' | 'Dark';

/**
 * Alert box is also a stateless component.
 * @param props 
 */
export const AlertBox = (props: Props) => {
    const alertClass: string = 'alert alert-dismissible fade show ' + getClassName();
    return (
        AppUtils.isNotEmpty(props.message) ? 
            <div className={alertClass} role='alert' id={props.id} key={props.key}>
                <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={hideAlertBox}>
                    <span aria-hidden='true'>&times;</span>
                </button>
                <h6 className='font-weight-light'><i className='fas fa-microphone'></i>&nbsp;{props.message}</h6>
            </div>
            : <div></div>
    );

    function getClassName(): string {
        switch (props.type) {
            case 'Success' : return 'alert-success';
            case 'Danger': return 'alert-danger';
            case 'Info': return 'alert-info';
            case 'Warning': return 'alert-warning';
            case 'Light': return 'alert-secondary';
            case 'Dark': return 'alert-dark';
            default: return 'alert-secondary';
        }
    }

    function hideAlertBox(): void {
        props.onHideCallBack();
    }
}