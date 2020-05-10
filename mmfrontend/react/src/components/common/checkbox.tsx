import * as React from 'react';
import { AppUtils } from '../../utilities/apputils';

interface Props extends PropsBase {
    required?: boolean;
    name: string;
    labelName: string;
    error?: string;
    onValueChange: Function;
    defaultValue?: boolean;
}

interface State {
    value: boolean;
    defaultValue: boolean;
}

export class Checkbox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: true,
            defaultValue:  this.props.defaultValue
        };

        // Bindings
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public render() {
        return (
            <div className='form-group' id={this.props.id} key={this.props.key}>
                <div className='custom-control custom-checkbox'>
                    <input type='checkbox' className='custom-control-input'
                        name={this.props.name} id={this.props.name}
                        required={this.props.required}
                        checked={this.state.defaultValue ? this.state.defaultValue : this.state.value}
                        onChange={this.handleValueChange}/>
                    <label className='custom-control-label' htmlFor={this.props.name}>{this.props.labelName}</label>
                </div>
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

    
    private handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            value: event.target.checked,
            defaultValue: undefined
        });
    }
}