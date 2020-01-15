import * as Dotenv from 'dotenv';
import * as fs from 'fs';
import SecretKeys from '../types/config/secretkeys';

const secretValues: SecretKeys = {
    ENVIRONMENT: '',
    JWT_SECRET: '',
    MONGODB_URI: '',
    PORT: 0,
    RPAY_KEY_ID: '',
    RPAY_KEY_SECRET: ''
};

class Secret {    

    /**
     * Gets the secret.
     */
    public static get Secret(): SecretKeys {
        if (fs.existsSync('.env')) {
            console.log('Using .env file to supply config environment variables');
            Dotenv.config({ path: '.env' });
        } else {
            console.log('Using .env.mm file to supply config environment variables');
            Dotenv.config({ path: `${__dirname}/../../.env.mm` });
        }

        secretValues.ENVIRONMENT = process.env['NODE_ENV'];        
        const isProduction: boolean = secretValues.ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
        
        secretValues.JWT_SECRET = process.env['JWT_SECRET'];
        secretValues.MONGODB_URI = isProduction ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
        secretValues.PORT = parseInt(process.env['PORT']);
        secretValues.RPAY_KEY_ID = process.env['RPAY_KEY_ID'];
        secretValues.RPAY_KEY_SECRET = process.env['RPAY_KEY_SECRET'];

        if (!secretValues.JWT_SECRET) {
            console.log('No JWT secret. Set JWT_SECRET environment variable.');
            process.exit(1);
        }
        
        if (!secretValues.MONGODB_URI) {
            console.log('No mongo connection string. Set MONGODB_URI environment variable.');
            process.exit(1);
        }

        if (!secretValues.PORT) {
            console.log('Server listening port not set.');
            process.exit(1);
        }

        return secretValues;
    }

}

export default Secret.Secret;