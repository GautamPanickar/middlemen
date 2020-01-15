import Controller from '../types/controller/controller';
import { Router, NextFunction, Request, Response } from 'express';
import BillingDTO from '../dtos/payment/billingdto';
import { AppUtils } from '../utils/apputils';
import CustomException from '../utils/exceptions/customexception';
import PaymentService from '../services/payment/paymentservice';

class PaymentController implements Controller {
    public path: string = '/payment';
    public router: Router =   Router();
    private paymentService: PaymentService;
    public constructor() {
        this.initializeRoutes();
        this.paymentService = new PaymentService();
    }

    /**
     * Routes for payment related actions.
     */
    private initializeRoutes(): void {
        this.router.post(`${this.path}/order`, this.newOrder);
        this.router.post(`${this.path}/capture`, this.capturePayment);
        this.router.get(`${this.path}/:id`, this.loadById);
        this.router.get(`${this.path}/user/:id`, this.loadByUser);
        this.router.get(`${this.path}/order/:id`, this.loadOrder);
        this.router.get(`${this.path}/pay/:id`, this.loadPayment);
        this.router.get(`${this.path}/paid/:userId`, this.loadPaidBills);
        this.router.get(`${this.path}/invoices/:userId`, this.loadAllInvoices);
        this.router.get(`${this.path}/invoice/download/:id`, this.downloadInvoice);
    }

    /**
     * Creates a new payment order.
     */
    public newOrder = async(request: Request, response: Response, next: NextFunction) => {
        const dto: BillingDTO = request.body;
        try {
            if (AppUtils.isNotEmpty(dto.user_id)) {
                const savedBilling: BillingDTO = await this.paymentService.newOrder(dto);
                return response.send({
                    'status': 200,
                    'billing': savedBilling,
                    'message': 'New payment order created successfully!'
                });
            } else {
                next(new CustomException('Could not find the subscriber'));
            }
        } catch(error) {
            next(error);
        }
    }

    /**
     * Captures the paid payment, locally after updating the payment service.
     */
    public capturePayment = async(request: Request, response: Response, next: NextFunction) => {
    }

    /**
     * Loads the billing by id.
     */
    public loadById = async(request: Request, response: Response, next: NextFunction) => {
    }

    /**
     * Loads the billing/payment by user id.
     */
    public loadByUser = async(request: Request, response: Response, next: NextFunction) => {
    }

    /**
     * Loads the order by the given order id.
     */
    public loadOrder = async(request: Request, response: Response, next: NextFunction) => {
    }

    /**
     * Loads the payment by the payment id.
     */
    public loadPayment = async(request: Request, response: Response, next: NextFunction) => {
    }

    /**
     * Loads all paid bills for the user with given id.
     */
    public loadPaidBills = async(request: Request, response: Response, next: NextFunction) => {
    }

    /**
     * Loads all invoices for the user.
     */
    public loadAllInvoices = async(request: Request, response: Response, next: NextFunction) => {
    }

    /**
     * Downloads the invocie for the given id.
     */
    public downloadInvoice = async(request: Request, response: Response, next: NextFunction) => {
    }
}

export default PaymentController;