import Logger from './logger';
import dotenv from 'dotenv';
import * as fs from 'fs';
import SecretKeys from '../types/config/secretkeys';

const secretValues: SecretKeys = {
    ENVIRONMENT: '',
    JWT_SECRET: '',
    MONGODB_URI: '',
    PORT: 0
};

class Secret {    

    /**
     * Gets the secret.
     */
    public static get Secret(): SecretKeys {
        if (fs.existsSync('.env')) {
            Logger.logError('Using .env file to supply config environment variables');
            dotenv.config({ path: '.env' });
        } else {
            Logger.debug('Using .env.mm file to supply config environment variables');
            dotenv.config({ path: '.env.mm' });  // you can delete this after you create your own .env file!
        }

        secretValues.ENVIRONMENT = process.env['NODE_ENV'];
        const isProduction: boolean = secretValues.ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
        
        secretValues.JWT_SECRET = process.env['JWT_SECRET'];
        secretValues.MONGODB_URI = isProduction ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
        secretValues.PORT = parseInt(process.env['PORT']);

        if (!secretValues.JWT_SECRET) {
            Logger.logError('No JWT secret. Set JWT_SECRET environment variable.');
            process.exit(1);
        }
        
        if (!secretValues.MONGODB_URI) {
            Logger.logError('No mongo connection string. Set MONGODB_URI environment variable.');
            process.exit(1);
        }

        if (!secretValues.PORT) {
            Logger.logError('Server listening port not set.');
            process.exit(1);
        }

        return secretValues;
    }

}

export default Secret.Secret;