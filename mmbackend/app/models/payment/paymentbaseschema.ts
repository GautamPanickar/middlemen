import { Schema } from 'mongoose';

const PaymentBaseSchema: Schema = new Schema({
    entity: String,
    amountPaid: Number,
    amountDue: Number,
    amountRefunded: Number,
    currency: String,
    status: String,
    refundStatus: String,
    method: String,
    attempts: Number,
    createdAt: Date,
    fee: String,
    tax: String,
    errorCode: String,
    errorDescription: String,
    description: String,
    international: Boolean,
});

export default PaymentBaseSchema;
