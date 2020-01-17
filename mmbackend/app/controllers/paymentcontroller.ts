import Controller from '../types/controller/controller';
import { Router, NextFunction, Request, Response } from 'express';
import BillingDTO from '../dtos/payment/billingdto';
import { AppUtils } from '../utils/apputils';
import CustomException from '../utils/exceptions/customexception';
import PaymentService from '../services/payment/paymentservice';
import Billing from '../types/billing/billing';
import BillingOrder from '../types/billing/billingorder';
import BillingPayment from '../types/billing/billingpayment';
import BillingPaymentCaptureDTO from '../dtos/payment/billingpaymentcapturedto';

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
                const savedBilling: Billing = await this.paymentService.newOrder(dto);
                return response.send({
                    'status': 200,
                    'billing': savedBilling,
                    'message': 'New payment order created successfully!'
                });
            } else {
                next(new CustomException('Could not find the subscriber'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Captures the paid payment, locally after updating the payment service.
     */
    public capturePayment = async(request: Request, response: Response, next: NextFunction) => {
        const dto: BillingPaymentCaptureDTO = request.body;
        try {
            if (AppUtils.isNotEmpty(dto.billingId)) {
                const savedBilling: Billing = await this.paymentService.capturePayment(dto);
                return response.send({
                    'status': 200,
                    'billing': savedBilling,
                    'message': 'New payment order created successfully!'
                });
            } else {
                next(new CustomException('A payment/bill needs to be associated with capture information'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads the billing by id.
     */
    public loadById = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const billing: Billing = await this.paymentService.findById(id);
                return response.send({
                    'status': 200,
                    'billing': billing,
                    'message': 'Billing details found'
                });
            } else {
                next(new CustomException('Billing Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads the billing/payment by user id.
     */
    public loadByUser = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const billings: Billing[] = await this.paymentService.findBillingsForUser(id);
                return response.send({
                    'status': 200,
                    'billings': billings,
                    'message': 'Billing details found'
                });
            } else {
                next(new CustomException('User Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads the order by the given order id.
     */
    public loadOrder = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const order: BillingOrder = await this.paymentService.findOrderByOrderId(id);
                return response.send({
                    'status': 200,
                    'billingOrder': order,
                    'message': 'Billing order details found'
                });
            } else {
                next(new CustomException('Order Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads the payment by the payment id.
     */
    public loadPayment = async(request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            if (AppUtils.isNotEmpty(id)) {
                const payment: BillingPayment = await this.paymentService.findPaymentByPaymentId(id);
                return response.send({
                    'status': 200,
                    'billingPayment': payment,
                    'message': 'Billing payment details found'
                });
            } else {
                next(new CustomException('Payment Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads all paid bills for the user with given id.
     */
    public loadPaidBills = async(request: Request, response: Response, next: NextFunction) => {
        const userId = request.params.userId;
        try {
            if (AppUtils.isNotEmpty(userId)) {
                const billing: Billing[] = await this.paymentService.findPaidBillsForUser(userId);
                return response.send({
                    'status': 200,
                    'billing': billing,
                    'message': 'Billing details found'
                });
            } else {
                next(new CustomException('User Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Loads all invoices for the user.
     */
    public loadAllInvoices = async(request: Request, response: Response, next: NextFunction) => {
        const userId = request.params.userId;
        try {
            if (AppUtils.isNotEmpty(userId)) {
                const billing: Billing[] = await this.paymentService.findPaidBillsForUser(userId);
                return response.send({
                    'status': 200,
                    'billing': billing,
                    'message': 'Billing details found'
                });
            } else {
                next(new CustomException('User Id not found'));
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Downloads the invocie for the given id.
     */
    public downloadInvoice = async(request: Request, response: Response, next: NextFunction) => {
        // TODO
    }
}

export default PaymentController;