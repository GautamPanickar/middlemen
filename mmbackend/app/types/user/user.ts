import TokenData from './tokendata';
import Address from './address';
import Auhtority from './authoritiy';

interface User {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    token?: TokenData;
    activated?: boolean;
    activationKey?: string;
    resetKey?: string;
    contactAddress?: Address;
    billingAddress?: Address;
    authorities?: Auhtority[];
}

export default User;
