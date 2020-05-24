import { model, Schema, Document } from 'mongoose';
import AppDetails from '../types/user/appdetails';

const AppDetailsSchema: Schema = new Schema({
    name: String,
    code: String,
    subdomain: String
}, { timestamps: true});

const AppDetailsModel = model<AppDetails & Document>('AppDetails', AppDetailsSchema);

export default AppDetailsModel;
