import { model, Schema, Document } from 'mongoose';
import Invoice from '../../types/billing/invoice';

const InvoiceProductSchema: Schema = new Schema({
    name: String,
    price: Number,
    tax: Number
});

const InvoiceItemSchema: Schema = new Schema({
    product: InvoiceProductSchema,
    quantity: Number,
    cost: Number
});

const InvoiceSchema: Schema = new Schema({
    user_id: String,
    billing_id: String,
    total: Number,
    items: [InvoiceItemSchema],
    invoiceDate: Date,
    invoiceCode: String
});

const InvoiceModel = model<Invoice & Document>('Document', InvoiceSchema);

export default InvoiceModel;
