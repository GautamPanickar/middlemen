import * as React from 'react'

interface Props {
    color?: SpinnerColor;
    strength?: number;
}

type SpinnerColor = 'Yellow' | 'Blue' | 'Red' | 'Green';

const spinnerStyle: React.CSSProperties = {
    width: '2.5rem',
    height: '2.5rem'
};

const spinnerHolderStyle: React.CSSProperties = {
    width: '100%'
};

/**
 * The Spinner is a stateless component.
 * @param props
 */
export const Spinner = (props: Props) => {
    let spinnerClass: string = 'spinner-grow ' + getColor();
    return (
        <div className='spinner-holder mt-3 mb-3 d-flex justify-content-center text-center' style={spinnerHolderStyle}>
            {spinners()}
        </div>
    );

    function getColor(): string {
        switch (props.color) {
            case 'Yellow':
                return 'text-warning';
            case 'Blue':
                return 'text-info';
            case 'Red':
                return 'text-danger';
            case 'Green':
                return 'text-success';
            default:
                return 'text-warning';
        }
    }

    function spinners(): Array<JSX.Element> {
        let items:Array<JSX.Element> = new Array<JSX.Element>();
        let spinnerStrength: number = props.strength > 0 ? props.strength : 3;
        for (let i = 0; i < spinnerStrength ; i++) {
            items.push(
                <div className={spinnerClass} style={spinnerStyle} role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            );
        }
        return items;
    }
}