interface BillingPaymentCaptureDTO {
    billingId: string;
    billingPaymentId: string;
    billingOrderId: string;
    paymentSignature: string;
}

export default BillingPaymentCaptureDTO;