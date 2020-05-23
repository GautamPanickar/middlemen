import TokenData from './tokendata';
import Address from './address';

interface User {
    _id?: string;
    app_id?: string;
    name?: string;
    email?: string;
    password?: string;
    token?: TokenData;
    activated?: boolean;
    activationKey?: string;
    resetKey?: string;
    contactAddress?: Address;
    billingAddress?: Address;
    roles: string[];
    company?: string;
    gstNumber?: string;
    companyId?: string;
}

export default User;
