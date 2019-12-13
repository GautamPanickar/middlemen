import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as CookieParser from 'cookie-parser';
import * as Mongoose from 'mongoose';
import Controller from './types/controller/controller';
import AuthenticationController from './controllers/authenticationcontroller';
import ErrorMiddleware from './middlewares/base/errormiddleware';
import LoggerMiddleware from './middlewares/base/loggermiddleware';
import AuthenticationMiddleware from './middlewares/base/authenticationmiddleware';
import Secret from './utils/secret';
import Logger from './utils/logger';

class App {

    public app: Express.Application;

    public constructor(controllers: Controller[]) {
        this.app = Express();
        this.connectToTheDatabase();
        this.initializeBaseConfig();
        this.initializeControllers(controllers);
        this.initializeMiddleWares();
    }

    /**
     * Application config
     */
    private initializeBaseConfig(): void {
        // Allow any method from any host and log requests
        this.app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
            if ('OPTIONS' === req.method) {
                res.sendStatus(200);
            } else {
                Logger.info(`${req.ip} ${req.method} ${req.url}`);
                next();
            }
        });

        // support application/json type post data
        this.app.use(BodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(BodyParser.urlencoded({ extended: false }));    
        
        // For parsing cookies.
        this.app.use(CookieParser());
    }

    /**
     * Initializes different middlewares.
     */
    private initializeMiddleWares() {        
        this.app.use(LoggerMiddleware);
        this.app.use(AuthenticationMiddleware);
        this.app.use(ErrorMiddleware);        
    }

    /**
     * Initializes the controllers.
     * @param controllers 
     */
    public initializeControllers(controllers: Controller[]): void {    
        controllers.forEach((controller: Controller) => {
            this.app.use('/', controller.router);
        });
    }

    /**
     * Initialize db connection
     */
    private connectToTheDatabase(): void {
        Mongoose.connect(Secret.MONGODB_URI, {useNewUrlParser: true}).then( () => {
            Logger.info('MongoDB connection established successfully!');
        }).catch(err => {
            Logger.info('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });
    }
}

export default new App([
    new AuthenticationController()
]).app;