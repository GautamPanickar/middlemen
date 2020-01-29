import * as React from 'react';
import { Spinner } from './spinner';
import ModalData from '../typings/modaldata';

interface Props extends PropsBase {
    animate?: boolean;
    showModal: boolean;
    showSpinner?: boolean;
    data?: ModalData;
    onPrimaryButtonClick: Function;
    onSecondaryButtonClick: Function;
}

interface State {
    modalVisible: boolean;
    spinnerVisible: boolean;
}

/**
 * A common modal component which could be used for different purpose
 */
export class GenericModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            modalVisible: this.props.showModal,
            spinnerVisible: this.props.showSpinner
        };
    }

    public render() {
        let modalClass: string = 'modal fade' + (this.props.animate ? 'show' : '');
        return (
            this.state.modalVisible 
                ? <div className={modalClass}
                    id={this.props.id} tabIndex={-1} role='dialog' aria-hidden='true'>
                    <div className='modal-dialog modal-dialog-centered' role='document'>
                        <>
                            this.state.spinnerVisible
                                ? <Spinner />
                                : <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h5 className='modal-title' id={this.props.id + 'Title'}>{this.props.data.title}</h5>
                                        <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.onCloseClick}>
                                            <span aria-hidden='true'>&times;</span>
                                        </button>
                                    </div>
                                    <div className='modal-body' dangerouslySetInnerHTML={this.getModalBodyHTML()}>
                                    </div>
                                    <div className='modal-footer'>
                                        <button type='button' className='btn btn-secondary' 
                                            onClick={this.onSecondaryClick}>{this.props.data.secondaryButtonName}</button>
                                        <button type='button' className='btn btn-primary' 
                                            onClick={this.onPrimaryClick}>{this.props.data.primaryButtonName}</button>
                                    </div>
                                </div>
                        </>
                    </div>
                </div>
                : <></>
        );
    }

    /**
     * Retursnt the body of the modal to be set as HTML.
     */
    public getModalBodyHTML() {
        return { __html: this.props.data.body };
    }

    /**
     * On clicking the close button.
     */
    public onCloseClick(): void {
        this.setState({
            modalVisible: false,
            spinnerVisible: false
        });
    }

    /**
     * On clicking the primary button of the modal.
     */
    public onPrimaryClick(): void {
        this.props.onPrimaryButtonClick();
    }

    /**
     * On clciking  the secondary button of the modal
     */
    public onSecondaryClick(): void {
        this.props.onSecondaryButtonClick();
    }
}