import * as React from 'react'

interface Props extends PropsBase{

}

/**
 * This payment dashboard box or item is a stateless component.
 * @param props
 */
export const PaymentDashItem = (props: Props) => {
    return (
        <div id={props.id} key={props.key} className='box box-shadow dashboard-box bg-light'>
            <div className='dash-box-heading mt-1'>
                <h4 className='font-weight-light'>Payment</h4>
                <hr />
                <h6 className='font-weight-lighter'>Payment details, conformed orders, dues and payment history.</h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={makePayment}>* Make payment</a></h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={history}>* Payment history</a></h6>
                
            </div>
        </div>
    );

    function makePayment() {

    }

    function history() {

    }
}