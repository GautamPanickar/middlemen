import * as React from 'react';
import { AppUtils } from '../../utilities/apputils';
import SelectorOption from '../typings/selectoroption';
import Select from 'react-select';

interface Props extends PropsBase {
    name: string;
    labelName: string;
    error?: string;
    defaultValue?: SelectorOption;
    options: SelectorOption[];
    multiselect?: boolean;
    onValueChange: Function;
    borderless?: boolean;
    className?: string;
}

interface State {
    value: SelectorOption;
    defaultValue: SelectorOption;
}

export class Selector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: undefined,
            defaultValue:  this.props.defaultValue
        };

        // Bindings
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public render() {
        let formGroupClass = 'form-group ' +  this.props.className;
        return (
            <div className={formGroupClass} id={this.props.id} key={this.props.key}>
                <label className='form-control-label' htmlFor={this.props.name}>{this.props.labelName}</label>
                <Select value={this.state.defaultValue ? this.state.defaultValue : this.state.value}
                    onChange={this.handleValueChange}
                    options={this.props.options} />
                {   
                    AppUtils.isNotEmpty(this.props.error)
                        ? <small className='form-text text-danger'>{this.props.error}</small>
                        : <></>
                }
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
        if (this.state.defaultValue) {
            this.setState({
                value: valueToUpdate
            });
        }
    }

    private handleValueChange(option: SelectorOption): void {
        this.setState({
            value: option,
            defaultValue: undefined
        });
    }
}