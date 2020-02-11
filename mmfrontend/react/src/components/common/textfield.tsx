import * as React from 'react';
import { AppUtils } from '../../utilities/apputils';

interface Props extends PropsBase{
    type: FieldType;
    borderless?: boolean;
    required?: boolean;
    name: string;
    labelName: string;
    placeHolder?: string;
    error?: string;
    onValueChange: Function;
}

interface State {
    value: string;
}

type FieldType = 'Email' | 'Text' | 'Password';

export class TextField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: ''
        };

        // Bindings
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public render() {
        let inputClass: string = 'form-control ' + (this.props.borderless ? 'borderless-text-field' : '');
        let inputType: string = this.props.type === 'Email' ? 'email' 
                                : this.props.type === 'Text' ? 'text'
                                :  this.props.type === 'Password' ? 'password' : '';
        return (
            <div className='form-group' id={this.props.id} key={this.props.key}>
                <label className='form-control-label' htmlFor={this.props.name}>{this.props.labelName}</label>
                <input type={inputType} className= {inputClass}
                    name={this.props.name} id={this.props.name}
                    placeholder={this.props.placeHolder}
                    required={this.props.required}
                    value={this.state.value}
                    onChange={this.handleValueChange}/>
                {AppUtils.isNotEmpty(this.props.error)
                        ? <small className='form-text text-danger'>{this.props.error}</small>
                        : <></>}
            </div>
        );
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.state.value !== prevState.value) {
            this.props.onValueChange(this.state.value);
        }
    }

    /**
     * On textfield value change. This happens when you type something on to the textfield.
     * @param event 
     */
    private handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            value: event.target.value
        });
    }
}