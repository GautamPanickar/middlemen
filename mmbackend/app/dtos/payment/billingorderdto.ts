import PaymentBaseDTO from './paymentbasedto';

interface BillingOrderDTO extends PaymentBaseDTO {
    billing_id: string;
    orderId?: string;
    amount?: number;
    receipt?: string;
    paymentCapture?: boolean;
}

export default BillingOrderDTO;