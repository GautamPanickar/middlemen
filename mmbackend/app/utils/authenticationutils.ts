import * as Crypto from 'crypto';
import * as JWT from 'jsonwebtoken';
import TokenData from '../types/user/tokendata';
import DataStoredInToken from '../types/user/datastoredintoken';
import Secret from '../utils/secret';

export class AuthenticationUtils {

    /**
     * Gets the password salt.
     */
    public static get passwordSalt(): String {
        return Crypto.randomBytes(16).toString('hex');
    }

    /**
     * Returns the hash by combining password with salt.
     * @param salt 
     * @param password 
     */
    public static getPasswordHash(salt: string, password: string): String {
        return Crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    }

    /**
     * Generates the authentication token post successful authentication.
     * @param id 
     * @param email 
     * @param name 
     */
    public static generateAuthenticationToken(id: String, email: String, name: String): TokenData {
        const expiryTime: Date = new Date();
        // Sets the expiry time to 7 days after the current date.
        expiryTime.setDate(expiryTime.getDate() + 7);
        const expiresIn: number = (expiryTime.getTime() / 1000);
        const dataStoredInToken: DataStoredInToken = {
            _id: id.toString(),
            email: email.toString(),
            name: name.toString()
        };
        
        return {
            expiresIn,
            token: JWT.sign(
                dataStoredInToken,
                Secret.JWT_SECRET, 
                { expiresIn }
            )
        };
    }
}
