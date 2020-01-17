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
        throw new Error('Method not implemented.');
    }

    public arePasswordsEqual(password1: string, password2: string): Promise<boolean> {
        return BCrypt.compare(password1, password2);
    }

}

export default BCryptEncryptionService;