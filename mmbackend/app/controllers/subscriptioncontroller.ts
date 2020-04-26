import Controller from '../types/controller/controller';
import { Router, NextFunction, Request, Response } from 'express';
import SubscriptionService from '../services/subscription/subscriptionservice';
import SubscriptionDTO from '../dtos/subscription/susbcriptiondto';
import { AppUtils } from '../utils/apputils';
import Subscription from '../types/subscription/subscription';
import CustomException from '../utils/exceptions/customexception';

class SubscriptionController implements Controller {
    public path: string = '/subscription';
    public subscriberPath: string = '/subscribers';
    public router: Router =   Router();
    public susbcriptionService = new SubscriptionService();

    public constructor() {
        this.initializeRoutes();
    }

    /**
     * Routes for susbcription related actions.
     */
    private initializeRoutes(): void {
        this.router.post(`${this.path}`, this.save);
        this.router.get(`${this.path}/:id`, this.loadById);
        this.router.get(`${this.path}/user/:id`, this.loadByUser);
        this.router.patch(`${this.path}/:id/activate`, this.activate);
        this.router.patch(`${this.path}/:id/cancel`, this.cancel);
    }

    /**
     * API to save the subscription - update or new
     */
    public save = async(request: Request, response: Response, next: NextFunction) => {
        const subscription: SubscriptionDTO = request.body;
        try {
            if (AppUtils.isNotEmpty(subscription.user_id)) {
                const savedSubscription: Subscription = await this.susbcriptionService.saveSubscription(subscription);
                return response.send({
                    'status': 200,
                    'subscription': savedSubscription,
                    'message': 'Subscription saved successfully!'
                });
            } else {
                next(new CustomException('Could not find the subscriber'));
            }
            
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads the susbcription by the given id
     */
    public loadById = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const susbcription: Subscription = await this.susbcriptionService.findById(id);
                return response.send({
                    'status': 200,
                    'subscription': susbcription,
                    'message': 'Subscription found'
                });
            } else {
                next(new CustomException('Subscription Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads subscriptions for the user witht the mentioed id.
     */
    public loadByUser = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const susbcriptions: Subscription[] = await this.susbcriptionService.findSubscriptionsForUser(id);
                return response.send({
                    'status': 200,
                    'subscriptions': susbcriptions,
                    'message': 'Subscriptions found'
                });
            } else {
                next(new CustomException('User Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Activates the susbcription.
     */
    public activate = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const susbcription: Subscription = await this.susbcriptionService.activateSubscription(id);
                return response.send({
                    'status': 200,
                    'subscription': susbcription,
                    'message': 'Subscription activated'
                });
            } else {
                next(new CustomException('Subscription Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Cancels the subscription.
     */
    public cancel = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const susbcription: Subscription = await this.susbcriptionService.cancelSubscription(id);
                return response.send({
                    'status': 200,
                    'subscription': susbcription,
                    'message': 'Subscription cancelled'
                });
            } else {
                next(new CustomException('Subscription Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }
}

export default SubscriptionController;
