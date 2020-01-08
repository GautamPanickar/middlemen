import { EncryptionService } from './encryptionservice';
import * as BCrypt from 'bcrypt';

class BCryptEncryptionService implements EncryptionService {

    /**
     * Returns the hash by combining password with salt.
     * @param password
     * @param salt 
     */
    public getPasswordHash(password: string, salt: string | number): Promise<string> {
        return BCrypt.hash(password, salt);
    }    
    
    /**
     * Gets the password salt.
     */
    public getPasswordSalt(): string {
        throw new Error("Method not implemented.");
    }

}

export default BCryptEncryptionService;