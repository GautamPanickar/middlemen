import BillingOrderDTO from './billingorderdto';
import BillingPaymentDTO from './billingpaymentdto';
import InvoiceDTO from './invoicedto';

interface BillingDTO {
    id: string;
    user_id: string;
    subscription_id: string;
    border_id?: string;
    billingOrder: BillingOrderDTO;
    bpayment_id?: string;
    billingPayment: BillingPaymentDTO;
    billingOrderId?: string;
    billingPaymentId?: string;
    paymentSignature?: string;
    invoice_id?: string;
    invoice?: InvoiceDTO;
}

export default BillingDTO;