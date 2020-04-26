import { model, Schema, Document } from 'mongoose';
import User from '../types/user/user';

const AddressSchema: Schema = new Schema({
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    email: String,
    phone: String,
    zipCode: String
});

const UserSchema: Schema = new Schema({
    name: String,
    email: String,
    contactAddress: AddressSchema,
    billingAddress: AddressSchema,
    password: String,
    activated: Boolean,
    activationKey: String,
    resetKey: String,
    company: String,
    gstNumber: String,
    companyId: String
}, { timestamps: true});

const UserModel = model<User & Document>('User', UserSchema);

export default UserModel;