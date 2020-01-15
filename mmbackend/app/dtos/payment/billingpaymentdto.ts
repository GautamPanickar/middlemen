import PaymentBaseDTO from './paymentbasedto';

interface BillingPaymentDTO extends PaymentBaseDTO {
    billing_id: string;
    paymentId?: string;
    orderId?: string;
    amount?: string;
    captured?: boolean;
    email?: string;
    contact?: string;
}

export default BillingPaymentDTO;