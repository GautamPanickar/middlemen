import  * as Winston from 'winston';
import * as Secret from './secret';

class Logger {
    private logger: Winston.Logger;

    public constructor() {
        this.initializeLogger();
    }

    /**
     * Initializes the winston logger
     */
    private initializeLogger(): void {
        this.logger = Winston.createLogger({
            transports: [
                new (Winston.transports.Console)({ 
                    level: Secret.default.ENVIRONMENT === 'production' ? 'error' : 'debug' 
                }),
                new (Winston.transports.File)({ 
                    filename: 'debug.log', 
                    level: 'debug'
                })
            ]
        });

        if (Secret.default.ENVIRONMENT !== 'production') {
            this.logger.debug('Logging initialized at debug level');
        }
    }

    /**
     * Logs the message
     * @param message
     */
    public info(message: string): void {
        this.logger.info(message);
    }

    /**
     * Logs the error
     * @param message
     */
    public logError(message: string): void {
        this.logger.error(message);
    }

    /**
     * Logs the debug info
     * @param message
     */
    public debug(message: string): void {
        this.logger.debug(message);
    }
}

export default new Logger();