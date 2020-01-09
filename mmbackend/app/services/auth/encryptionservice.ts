export interface EncryptionService {
    getPasswordHash(password: string, salt: string | number): Promise<string>;
    getPasswordSalt(): string;
    arePasswordsEqual(password1: string, passwotd2: string): Promise<boolean>;
}
