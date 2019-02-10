import Logger from './logger';
import dotenv from 'dotenv';
import * as fs from 'fs';
import SecretKeys from '../types/config/secretkeys';

const secretValues: SecretKeys = {
    ENVIRONMENT: '',
    SESSION_SECRET: '',
    MONGODB_URI: ''
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
        
        secretValues.SESSION_SECRET = process.env['SESSION_SECRET'];
        secretValues.MONGODB_URI = isProduction ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
        
        if (!secretValues.SESSION_SECRET) {
            Logger.logError('No client secret. Set SESSION_SECRET environment variable.');
            process.exit(1);
        }
        
        if (!secretValues.MONGODB_URI) {
            Logger.logError('No mongo connection string. Set MONGODB_URI environment variable.');
            process.exit(1);
        }

        return secretValues;
    }

}

export default Secret.Secret;