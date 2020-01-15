import PaymentBase from './paymentbase';

interface BillingPayment extends PaymentBase {
    billing_id: string;
    paymentId?: string;
    orderId?: string;
    amount?: string;
    captured?: boolean;
    email?: string;
    contact?: string;
}

export default BillingPayment;