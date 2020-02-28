import * as React from 'react'

interface Props extends PropsBase {

}

/**
 * This invoice dashboard box or item is a stateless component.
 * @param props
 */
export const InvoiceDashItem = (props: Props) => {
    return (
        <div id={props.id} key={props.key} className='box box-shadow dashboard-box bg-light'>
            <div className='dash-box-heading mt-1'>
                <h4 className='font-weight-light'>Invoice</h4>
                <hr />
                <h6 className='font-weight-lighter'>Draw invoices for the payments made.</h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={history}>* Invoice history</a></h6>
                
            </div>
        </div>
    );

    function history() {

    }
}