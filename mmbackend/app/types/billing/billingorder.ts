import PaymentBase from './paymentbase';

interface BillingOrder extends PaymentBase {
    billing_id: string;
    orderId?: string;
    amount?: number;
    receipt?: string;
    paymentCapture?: boolean;
}

export default BillingOrder;