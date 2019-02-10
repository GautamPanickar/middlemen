import { model, Schema, Document } from 'mongoose';
import { AuthenticationUtils } from '../utils/authenticationutils';
import User from '../types/user/user';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    hash: String,
    salt: String
}, { timestamps: true});

/**
 * To create the password salt and hash
 */
UserSchema.methods.setPassword = function (password: string) {
    this.salt = AuthenticationUtils.passwordSalt;
    this.hash = AuthenticationUtils.getPasswordHash(this.salt, password);
};

/**
 * Checks if the passowrd is valid or correct. Checks the hash values.
 */
UserSchema.methods.isValidPassword = function (password: string) {
    return  AuthenticationUtils.getPasswordHash(this.salt, password) === this.hash;
};

/**
 * Generates an authentication token post successful authentication.
 */
UserSchema.methods.generateAuthenticationToken = function () {
    return AuthenticationUtils.generateAuthenticationToken(this._id, this.email, this.name);
};

export const UserModel = model<User & Document>('User', UserSchema);