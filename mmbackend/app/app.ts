import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as CookieParser from 'cookie-parser';
import * as Mongoose from 'mongoose';
import Controller from './types/controller/controller';
import AuthenticationController from './controllers/authenticationcontroller';
import ErrorMiddleware from './middlewares/base/errormiddleware';


class App {

    public app: Express.Application;

    public constructor(controllers: Controller[]) {
        this.app = Express();
        this.connectToTheDatabase();
        this.initializeBaseConfig();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
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
                console.log(`${req.ip} ${req.method} ${req.url}`);
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
     * Initializes error handling.
     */
    private initializeErrorHandling() {
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
        // const {
        //   MONGO_USER,
        //   MONGO_PASSWORD,
        //   MONGO_PATH,
        // } = process.env;
        // Mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
        console.log('Hello');
        Mongoose.connect('mongodb://localhost:27017/middlemen', {useNewUrlParser: true}).then( () => {
            console.log('MongoDB connection established successfully!');
        }).catch(err => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });
    }
}

export default new App([
    new AuthenticationController()
]).app;