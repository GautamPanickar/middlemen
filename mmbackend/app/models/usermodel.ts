import { model, Schema, Document } from 'mongoose';
import User from '../types/user/user';

const UserSchema: Schema = new Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true});

const UserModel = model<User & Document>('User', UserSchema);

export default UserModel;