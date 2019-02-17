import  * as Winston from 'winston';
import Secret from './secret';

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
                    level: Secret.ENVIRONMENT === 'production' ? 'error' : 'debug' 
                }),
                new (Winston.transports.File)({ 
                    filename: 'debug.log', 
                    level: 'debug'
                })
            ]
        });

        if (Secret.ENVIRONMENT !== 'production') {
            this.logger.debug('Logging initialized at debug level');
        }
    }

    /**
     * Logs the message
     * @param message
     */
    public info(message: string): void {
        console.log(message);
        this.logger.info(message);
    }

    /**
     * Logs the error
     * @param message
     */
    public logError(message: string): void {
        console.log(message);
        this.logger.error(message);
    }

    /**
     * Logs the debug info
     * @param message
     */
    public debug(message: string): void {
        console.log(message);
        this.logger.debug(message);
    }
}

export default new Logger();