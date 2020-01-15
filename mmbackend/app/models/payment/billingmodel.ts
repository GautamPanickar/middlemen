import { model, Schema, Document } from 'mongoose';
import Billing from '../../types/billing/billing';

const BillingSchema: Schema = new Schema({
    user_id: String,
    border_id: String,
    bpayment_id: String,
    billingOrderId: String,
    billingPaymentId: String,
    paymentSignature: String,
    invoice_id: String
});

const BillingModel = model<Billing & Document>('Document', BillingSchema);

export default BillingModel;
