import * as React from 'react';
import { AppUtils } from '../../utilities/apputils';

interface Props extends PropsBase {
    borderless?: boolean;
    required?: boolean;
    name: string;
    labelName: string;
    placeHolder?: string;
    error?: string;
    onValueChange: Function;
    rows: number;
    defaultValue?: string;
}

interface State {
    value: string;
    defaultValue: string;
}

export class TextArea extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: '',
            defaultValue:  this.props.defaultValue
        };

        // Bindings
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public render() {
        let inputClass: string = 'form-control ' + (this.props.borderless ? 'borderless-text-field' : '');
        return (
            <div className='form-group' id={this.props.id} key={this.props.key}>
                <label className='form-control-label' htmlFor={this.props.name}>{this.props.labelName}</label>
                <textarea rows={this.props.rows} className= {inputClass}
                    name={this.props.name} id={this.props.name}
                    placeholder={this.props.placeHolder}
                    required={this.props.required}
                    value={AppUtils.isNotEmpty(this.state.defaultValue) ? this.state.defaultValue : this.state.value}
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

    public componentDidMount() {
        // Once the component is mounted, if there is a default vlaue then the state wil have to be updated with it.
        const valueToUpdate = this.state.defaultValue;
        if (AppUtils.isNotEmpty(this.state.defaultValue)) {
            this.setState({
                value: valueToUpdate
            });
        }
    }

    /**
     * On textfield value change. This happens when you type something on to the textfield.
     * @param event 
     */
    private handleValueChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({
            value: event.target.value,
            defaultValue: ''
        });
    }
}