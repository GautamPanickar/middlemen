import * as React from 'react'

interface Props extends PropsBase {
    onPlanConfigCallback: Function;
}

/**
 * This configuration dashboard box or item is a stateless component.
 * @param props
 */
export const ConfigurationDashItem = (props: Props) => {
    return (
        <div id={props.id} key={props.key} className='box box-shadow dashboard-box bg-light'>
            <div className='dash-box-heading mt-1'>
                <h4 className='font-weight-light'>Configuration</h4>
                <hr />
                <h6 className='font-weight-lighter'>Configure new plans and other app specific things here.</h6>
                <h6 className='font-weight-lighter'><a href='javascript:void(0);' className='dashboard-link' onClick={plansConfiguration}>* Configure plans</a></h6>
                
            </div>
        </div>
    );

    function plansConfiguration() {
        props.onPlanConfigCallback();
    }
}