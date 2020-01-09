import { model, Schema, Document } from 'mongoose';
import Subscription from '../../types/subscription/subscription';

const SubscriptionDetailsSchema: Schema = new Schema({
    plan: Number,
    status: Number,
    cancelledOn: Date,
    nextBillingOn: Date,
    startedOn: Date,
    previousPlan: Number
}, { timestamps: true});

const SubscriptionSchema: Schema = new Schema({
    company: String,
    email: String,
    gstNumber: String,
    companyId: String,
    activated: Boolean,
    details: SubscriptionDetailsSchema,
    user_id: String
});

const SubscriptionModel = model<Subscription & Document>('Subscription', SubscriptionSchema);

export default SubscriptionModel;