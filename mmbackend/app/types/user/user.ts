import TokenData from './tokendata';

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    token?: TokenData;
}

export default User;
