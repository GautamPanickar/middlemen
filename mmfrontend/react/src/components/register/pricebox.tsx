import * as React from 'react';
import { PlanDisplayInfo } from '../../types/others/plandisplayinfo';
import { AppUtils } from '../../utilities/apputils';

interface Props extends PropsBase{
    planInfo: PlanDisplayInfo;
    onPurchaseCallback?: Function;
    onPlanChangeCallBack?: Function;
}

const priceCSS: React.CSSProperties = {
    fontSize: '25px'
}

export const PriceBox = (props: Props) => {
    return (
        <div className='card price-box price-card' id={props.id} key={props.key}>
            <div className='card-header'>
                <span className='float-left display-5'>{props.planInfo.name}</span>
                <span className='float-right badge badge-dark' style={priceCSS}>
                    <i className='fas fa-rupee-sign'></i>{props.planInfo.price}
                </span>
            </div>
            <div className='card-body'>
                <ul className='list-group list-group-flush'>
                    {getSubTexts()}
                </ul>
            </div>
            <div className='card-footer'>
                {props.onPurchaseCallback ? <a className='btn btn-outline-dark' onClick={onPurchaseClick} > Buy</a> : <></>}
                {props.onPlanChangeCallBack ? <a className='btn btn-outline-dark' onClick={onPlanChangeClick} > Change plan</a> : <></>}
            </div>  
        </div>
    );

    function onPurchaseClick(): void {
        props.onPurchaseCallback();
    }

    function onPlanChangeClick(): void {
        props.onPlanChangeCallBack();
    }

    function getSubTexts(): Array<JSX.Element> {
        let subTexts: Array<JSX.Element> = new Array<JSX.Element>();
        if (AppUtils.isValid(props.planInfo.subText.length)) {
            props.planInfo.subText.forEach((text: string) => {
                subTexts.push(
                <li className='list-group-item p-2'>
                    <i className='fas fa-check-circle text-success'></i>&nbsp;{text}
                </li>);
            });
        }
        return subTexts;
    }
}
