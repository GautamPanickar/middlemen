import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../types/controller/controller';
import User from 'types/user/user';
import { UserDTO } from '../dtos/user/userdto';
import TokenData from 'types/user/tokendata';
import AuthenticationService from '../services/auth/authenticationservice';

class AuthentiCationController implements Controller {
    public path: string = '/auth';
    public router: Router =   Router();
    public authenticationService = new AuthenticationService();

    public constructor() {
        this.initializeRoutes();
    }

    /**
     * Routes for authentication related purpose.
     */
    private initializeRoutes(): void {
        this.router.post(`${this.path}/register`, this.register);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/logout`, this.logout);
    }
    
    /**
     * API for Registering a new user.
     */
    public register = async(request: Request, response: Response, next: NextFunction) => {
        // Getting the registration details
        const userData: UserDTO = request.body;
        try {
            const createdUser: User = await this.authenticationService.registerUser(userData);
            // Sending the response back
            response.setHeader('Set-Cookie', [this.createCookie(createdUser.token)]);
            return response.send({
                'status': 200,
                'user': createdUser,
                'token': createdUser.token,
                'message': 'User created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * API for logging in as a user.
     */
    public login = async(request: Request, response: Response, next: NextFunction) => {
        const userData: UserDTO = request.body;
        try {
            const authenticatedUser: User = await this.authenticationService.authenticateUser(userData);
            // Sending the response back
            response.setHeader('Set-Cookie', [this.createCookie(authenticatedUser.token)]);
            return response.send({
                'status': 200,
                'user': authenticatedUser,
                'token': authenticatedUser.token,
                'message': 'You are now logged in!'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * APi to logout the user.
     */
    private logout = (request: Request, response: Response) => {
        // Clears the cookie on logout.
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        return response.send({
            'status': 200,
            'message': 'You are now logged out!'
        });
    }

    /**
     * Creates the cookie
     * @param tokenData 
     */
    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}

export default AuthentiCationController;