import TokenData from './tokendata';
import Address from './address';

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    token?: TokenData;
    activated?: boolean;
    activationKey?: string;
    resetKey?: string;
    contactAddress?: Address;
    billingAddress?: Address;
}

export default User;
