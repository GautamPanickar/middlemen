import { model, Schema, Document } from 'mongoose';
import Role from '../types/user/role';

const RoleSchema: Schema = new Schema({
    code: String,
    name: String,
    description: String
});

const RoleModel = model<Role & Document>('Role', RoleSchema);

export default RoleModel;
