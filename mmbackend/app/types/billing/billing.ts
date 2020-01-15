interface Billing {
    _id: string;
    user_id: string;
    border_id?: string;
    bpayment_id?: string;
    billingOrderId?: string;
    billingPaymentId?: string;
    paymentSignature?: string;
    invoice_id?: string;
}

export default Billing;