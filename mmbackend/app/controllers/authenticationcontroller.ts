import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../types/controller/controller';
import User from 'types/user/user';
import { UserModel } from '../models/usermodel';
import DuplicateUserException from '../utils/exceptions/authentication/duplicateuserexception';
import UserDTO from '../dtos/user/userdto';
import TokenData from 'types/user/tokendata';

class AuthentiCationController implements Controller {
    public path: string = '/auth';
    public router: Router =   Router();
    private user = UserModel;

    public constructor() {
        this.initializeRoutes();
    }

    /**
     * Routes for authentication related purpose.
     */
    private initializeRoutes(): void {
        this.router.post(`${this.path}/register`);
        this.router.post(`${this.path}/login`);
        this.router.post(`${this.path}/logout`);
    }
    
    /**
     * Registering a new user.
     */
    public register = async(request: Request, response: Response, next: NextFunction) => {
        // Getting the registration details
        const userData: UserDTO = request.body;
        if ( await this.user.findOne({ email: userData.Email })) {
            // If there's already a user with the same email,prevent registration.
            next(new DuplicateUserException(userData.Email));
        } else {
            const newUser = new UserModel();
            newUser.name = userData.Name;
            newUser.email = userData.Email;
            newUser.setPassword(userData.Password);

            // Create the new user and return the token
            let token: TokenData;
            const createdUser: User = await this.user.create({
                ...newUser
            }, function() {
                token = newUser.generateAuthenticationToken();
            });
            createdUser.password = undefined;

            // Sending the response back
            response.sendStatus(200).send('OK');
            response.setHeader('Set-Cookie', [this.createCookie(token)]);
            response.send(createdUser);
            response.json({
                'token' : token
            });
        }
    }

    /**
     * Creates the cookie
     * @param tokenData 
     */
    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    /**
     * When logging out clears the cookie.
     */
    private loggingOut = (request: Request, response: Response) => {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);
    }

}

export default AuthentiCationController;