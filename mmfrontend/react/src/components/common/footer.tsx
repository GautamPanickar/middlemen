import * as React from 'react'

interface Props {

}

/**
 * This footer is a stateless component.
 * @param props
 */
export const Footer = (props: Props) => {
    return (
        <div className="footer mt-2 text-center">
            <p>Copyright © 2019 Gautam Panickar SS.</p>
        </div>
    );
}