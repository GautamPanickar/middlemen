import Controller from '../types/controller/controller';
import { Router, NextFunction, Request, Response } from 'express';
import { AppUtils } from '../utils/apputils';
import CustomException from '../utils/exceptions/customexception';
import UserService from '../services/user/userservice';
import { UserDTO } from '../dtos/user/userdto';
import User from '../types/user/user';
import UserManager from '../managers/usermanager';

class UserController implements Controller {
    public path: string = '/user';
    public router: Router =   Router();
    public userService: UserService;
    public userManager: UserManager;

    public constructor() {
        this.userService = new UserService();
        this.userManager = new UserManager();
        this.initializeRoutes();
    }

    /**
     * Routes for user actions.
     */
    private initializeRoutes(): void {
        this.router.put(`${this.path}/:id`, this.update);
        this.router.get(`${this.path}/:id`, this.loadById);
        this.router.get(`${this.path}/all`, this.loadAll);
        this.router.patch(`${this.path}/:id/update`, this.updateUserInfo);
    }

    /**
     * API to save the user - update or new
     */
    public update = async(request: Request, response: Response, next: NextFunction) => {
        const user: UserDTO = request.body;
        const id: string = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const updatedUser: User = await this.userManager.updateUser(user);
                return response.send({
                    'status': 200,
                    'user': updatedUser,
                    'message': 'User updated successfully!'
                });
            } else {
                next(new CustomException('User id unavailable'));
            }
            
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads the user for the given id
     */
    public loadById = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const user: User = await this.userService.findById(id);
                return response.send({
                    'status': 200,
                    'user': user,
                    'message': 'Subscription found'
                });
            } else {
                next(new CustomException('User id unavailable'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads all the users.
     */
    public loadAll = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            const users: User[] = await this.userService.findAllUsers();
                return response.send({
                    'status': 200,
                    'users': users,
                    'message': 'Users found'
                });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Updates the user info for the field metnioned as query param.
     */
    public updateUserInfo = async(request: Request, response: Response, next: NextFunction) => {
        const field: string = request.query.field;
        const id: string = request.params.id;
        const user: UserDTO = request.body;
        try {
            if (AppUtils.isNotEmpty(field)) {
                const updatedUser: User = await this.userService.updateUserInfo(id, user, field);
                return response.send({
                    'status': 200,
                    'user': updatedUser,
                    'message': 'User information updated'
                });
            } else {
                next(new CustomException('The field to be updated for the user cannot be empty'));
            }
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;