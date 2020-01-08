export interface EncryptionService {
    getPasswordHash(password: string, salt: string | number): Promise<string>;
    getPasswordSalt(): string;
}
