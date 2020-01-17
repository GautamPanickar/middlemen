import { model, Schema, Document } from 'mongoose';
import PaymentBaseSchema from './paymentbaseschema';
import BillingPayment from '../../types/billing/billingpayment';

const BillingPaymentSchema: Schema = new Schema({
    ...PaymentBaseSchema,
    billing_id: String,
    paymentId: String,
    orderId: String,
    amount: String,
    captured: Boolean,
    email: String,
    contact: String
});

const BillingPaymentModel = model<BillingPayment & Document>('Document', BillingPaymentSchema);

export default BillingPaymentModel;