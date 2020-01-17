import { model, Schema, Document } from 'mongoose';
import BillingOrder from '../../types/billing/billingorder';
import PaymentBaseSchema from './paymentbaseschema';

const BillingOrderSchema: Schema = new Schema({
    ...PaymentBaseSchema,
    billing_id: String,
    orderId: String,
    amount: Number,
    receipt: String,
    paymentCapture: Boolean
});

const BillingOrderModel = model<BillingOrder & Document>('Document', BillingOrderSchema);

export default BillingOrderModel;
