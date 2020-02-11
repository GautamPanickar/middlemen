import * as React from 'react';
import { Spinner } from './spinner';
import ModalData from '../typings/modaldata';
import GenericStoreInstance, { GenericStore } from '../../stores/genericstore';

interface Props extends PropsBase {
    data?: ModalData;
    onPrimaryButtonClick?: Function;
    onSecondaryButtonClick?: Function;
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
            modalVisible: false,
            spinnerVisible: false
        };

        // Bindings
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onPrimaryClick = this.onPrimaryClick.bind(this);
        this.onSecondaryClick = this.onSecondaryClick.bind(this);
        this.onShowOrHideOverlay = this.onShowOrHideOverlay.bind(this);
    }

    public render() {
        let modalClass: string = 'modal fade ' + (this.state.modalVisible ? 'show' : '');
        let modalContent = this.state.spinnerVisible
                            ? <Spinner />
                            : this.props.data ? (<div className='modal-content'>
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
                            </div>) : <></>;
        return (
            this.state.modalVisible 
                ? <div className={modalClass}
                    id={this.props.id} tabIndex={-1} role='dialog' aria-hidden='true'>
                    <div className='modal-dialog modal-dialog-centered' role='document'>
                        {modalContent}
                    </div>
                </div>
                : <></>
        );
    }

    public componentDidMount() {
        GenericStoreInstance.addListener(GenericStore.SHOW_HIDE_OVERLAY, this.onShowOrHideOverlay);
    }

    public componentWillUnmount() {
        GenericStoreInstance.removeListener(GenericStore.SHOW_HIDE_OVERLAY, this.onShowOrHideOverlay);
    }

    private onShowOrHideOverlay = () => {
        this.setState({
            modalVisible: GenericStoreInstance.hasSpinner,
            spinnerVisible: GenericStoreInstance.hasSpinner
        });
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