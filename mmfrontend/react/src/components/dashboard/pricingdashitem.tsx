import * as React from 'react'

interface Props extends PropsBase{

}

/**
 * This pricing dashboard box or item is a stateless component.
 * @param props
 */
export const PricingDashItem = (props: Props) => {
    return (
        <div id={props.id} key={props.key} className='box box-shadow dashboard-box bg-light'>
            <div className='dash-box-heading mt-1'>
                <h4 className='font-weight-light'>Plans & Pricing</h4>
                <hr />
                <h6 className='font-weight-lighter'>Details of different subscription plans offered by HQPulse.</h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={view}>* View current plan</a></h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={change}>* Change plan</a></h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={addons}>* Buy add-ons</a></h6>
                {
                    showCancel 
                        ? <h6 className='font-weight-lighter' ><a href='javascript:void(0);' className='dashboard-link' onClick={cancel}>* Cancel subscription</a></h6>
                        : <></>
                }
                
            </div>
        </div>
    );

    function view() {

    }

    function change() {

    }

    function addons() {

    }

    function cancel() {

    }

    function showCancel() {
        return true;
    }
}