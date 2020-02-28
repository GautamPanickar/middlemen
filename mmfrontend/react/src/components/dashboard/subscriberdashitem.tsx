import * as React from 'react'

interface Props extends PropsBase{

}

/**
 * This subscriber dashboard box or item is a stateless component.
 * @param props
 */
export const SubscriberDashItem = (props: Props) => {
    return (
        <div id={props.id} key={props.key} className='box box-shadow dashboard-box bg-light'>
            <div className='dash-box-heading mt-1'>
                <h4 className='font-weight-light'>Subscriber Information</h4>
                <hr />
                <h6 className='font-weight-lighter'>Subscriber account configuration details.</h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={view}>* View account</a></h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={edit}>* Edit account</a></h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={password}>* Change password</a></h6>
                
            </div>
        </div>
    );

    function view() {

    }

    function edit() {

    }

    function password() {

    }
}