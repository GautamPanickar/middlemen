import { model, Schema, Document } from 'mongoose';
import Plan from '../../types/subscription/plan';

const PlanSchema: Schema = new Schema({
    code: String,
    app_id: String,
    name: String,
    description: String,
    features: [String],
    price: Number,
    active: Boolean,
    createdBy: String,
    updatedBy: String
}, { timestamps: true});

const PlanModel = model<Plan & Document>('Plan', PlanSchema);

export default PlanModel;