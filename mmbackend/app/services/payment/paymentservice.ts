import BillingModel from '../../models/payment/billingmodel';
import BillingOrderModel from '../../models/payment/billingordermodel';
import BillingPaymentModel from '../../models/payment/billingpaymentmodel';
import BillingDTO from '../../dtos/payment/billingdto';
import UserService from '../../services/user/userservice';
import { Razorpay } from 'razorpay';
import Secret from '../../utils/secret';
import BillingOrderDTO from '../../dtos/payment/billingorderdto';
import User from '../../types/user/user';
import SubscriptionDetails from '../../types/subscription/subscriptiondetails';
import Address from '../../types/user/address';
import { AppUtils } from '../../utils/apputils';
import SubscriptionService from '../../services/subscription/subscriptionservice';
import Subscription from 'types/subscription/subscription';
import CustomException from 'utils/exceptions/customexception';
import Logger  from '../../utils/logger';
import BillingOrder from '../../types/billing/billingorder';
import Billing from '../../types/billing/billing';
import BillingPayment from '../../types/billing/billingpayment';
import Invoice from '../../types/billing/invoice';
import InvoiceModel from '../../models/payment/invoicemodel';
import BillingPaymentCaptureDTO from 'dtos/payment/billingpaymentcapturedto';
import { Enums } from 'utils/enums';
import PaymentSignatureInvalidException from 'utils/exceptions/payment/paymentsignatureinvalidexception';

class PaymentService {
    private billing = BillingModel;
    private order = BillingOrderModel;
    private payment = BillingPaymentModel;
    private invoice = InvoiceModel;
    private userService: UserService;
    private subscriptionService: SubscriptionService;
    private razorPay: any;

    constructor() {
        this.userService = new UserService();
        this.subscriptionService = new SubscriptionService();
        this.razorPay = new Razorpay({
            key_id: Secret.RPAY_KEY_ID,
            key_secret: Secret.RPAY_KEY_SECRET
        });
    }

    /**
     * Creates the new payment order.
     * @param dto 
     */
    public async newOrder(dto: BillingDTO): Promise<Billing> {
        // If the user and order data exists then continue order creation.
        const user: User = await this.userService.findById(dto.user_id);
        if (user && dto.billingOrder) {
            const subscription: Subscription = await this.subscriptionService.findById(dto.user_id);
            if (subscription)  {
                this.setRazorPayOrderEssentials(dto.billingOrder, user, subscription.details);
                const options = {
                    amount: dto.billingOrder.amount,
                    currency: dto.billingOrder.currency,
                    receipt: dto.billingOrder.receipt,
                    payment_capture: '1'
                };
                // Before creating  order with razor pay save the order in the db.
                let newOrder: BillingOrder = await this.createNewOrder(dto.billingOrder);
                let newBilling: Billing = await this.createNewBilling(user._id, newOrder);
                // Create razorpay order
                const that = this;
                newBilling = await this.razorPay.orders.create(options,  async function(err, rpayOrder) {
                    if (err) {
                        Logger.logError(err);
                    } else {
                        Logger.info(`Order with razor pay created succeffully - ${rpayOrder}`);
                        newOrder = await that.updateOrderWithRPay(newBilling, newOrder, rpayOrder);
                        newBilling = await that.updateBillingWithOrder(newBilling, newOrder);
                        return newBilling;
                    }
                });
                return newBilling;
            } else {
                throw new CustomException('Could not find the subscription');
            }            
        }
    }

    /**
     * Captures the payment with the provided information.
     * @param dto 
     */
    public async capturePayment(dto: BillingPaymentCaptureDTO): Promise<Billing> {
        let billing: Billing = await this.findById(dto.billingId);
        if (billing) {
            if (AppUtils.isNotEmpty(dto.billingPaymentId)) {
                const that = this;
                await this.razorPay.payments.fetch(dto.billingPaymentId, async function(err, rpayPayment) {
                    if (err) {
                        Logger.logError(err);
                    } else {
                        Logger.info(`Payment fetched succeffully - ${rpayPayment}`);
                        const payment: BillingPayment = await that.createPaymentWithRPay(billing, rpayPayment);
                        billing = await that.updateBillingWithPayment(billing, payment, dto);
                        if (that.isValidSignature(billing)) {
                            that.updatePaymentInfo(billing, payment);
                            return billing;
                        } else {
                            throw new PaymentSignatureInvalidException();
                        }
                    }
                });
            } else {
                throw new CustomException('Razorpay payment id should be present to initate a capture');
            }
        }
        return undefined;
    }

    /**
     * Creates a new payment order.
     * @param orderDTO 
     */
    public async createNewOrder(orderDTO: BillingOrderDTO): Promise<BillingOrder> {
        return await this.order.create({...orderDTO,
            billing_id: undefined,
            orderId: undefined,
            status: undefined
        });
    }

    /**
     * Returns the billing for the given id.
     * @param id 
     */
    public async findById(id: string): Promise<Billing> {
        return this.billing.findById(id);
    }

    /**
     * Returns the billings for the user.
     * @param userId 
     */
    public async findBillingsForUser(userId: string): Promise<Billing[]> {
        return this.billing.find({user_id: userId});
    }

    /**
     * Returns the billing order for the given order id.
     * @param id 
     */
    public async findOrderByOrderId(id: string): Promise<BillingOrder> {
        return this.order.find({orderId: id});
    }

    /**
     * Returns the billing payment for the given payment id.
     * @param id 
     */
    public async findPaymentByPaymentId(id: string): Promise<BillingPayment> {
        return this.payment.find({paymentId: id});
    }

    /**
     * Returns the paid bills for the user.
     * @param userId 
     */
    public async findPaidBillsForUser(userId: string): Promise<Billing[]> {
        return this.billing.find({
            user_id: userId, 
            border_id : { $ne: undefined },
            bpayment_id: { $ne: undefined },
            billingOrderId: { $ne: undefined },
            billingPaymentId: { $ne: undefined },
            paymentSignature: { $ne: undefined }
        });
    }

    /**
     * Returns the invoices for the user.
     * @param userId 
     */
    public async findInvoicesForUser(userId: string): Promise<Invoice[]> {
        return this.invoice.find({user_id: userId});
    }

    /**
     * Creates new billing.
     * @param userId 
     * @param order 
     * @param payment 
     * @param invoice 
     */
    private async createNewBilling(userId: string, order?: BillingOrder, payment?: BillingPayment, invoice?: Invoice): Promise<Billing> {
        return await this.billing.create({
            user_id: userId,
            border_id: order ? order._id : undefined,
            bpayment_id: payment ? payment._id : undefined,
            billingOrderId: undefined,
            billingPaymentId: undefined,
            paymentSignature: undefined,
            invoice_id: invoice ? invoice._id : undefined
        });
    }

    /**
     * Sets the razor pay order object essentials.
     * @param order 
     * @param user 
     * @param subscriptionDetails 
     */
    private setRazorPayOrderEssentials(order: BillingOrderDTO, user: User, subscriptionDetails: SubscriptionDetails): void {
        const billingAddress: Address = user.billingAddress;
        const country: string = billingAddress.country;
        const state: string = billingAddress.state;
        if (null === order.amount) {
            const amountToPay: number = AppUtils.getTaxInclusiveAmount(AppUtils.getPlanPrice(subscriptionDetails.plan), country, state);
            order.amount = AppUtils.getAmountInSmallestUnit(amountToPay);
        } else {
            const amountToPay: number = AppUtils.getTaxInclusiveAmount(order.amount, country, state);
            order.amount = AppUtils.getAmountInSmallestUnit(amountToPay);
        }
        order.receipt = AppUtils.randomReceiptId;
    }

    /**
     * Updates the order with RPay order object.
     * @param billing 
     * @param order 
     * @param rpayOrder 
     */
    private async updateOrderWithRPay(billing: Billing, order: BillingOrder, rpayOrder: any): Promise<BillingOrder> {
        order.receipt = rpayOrder.receipt;
        order.currency = rpayOrder.currency;
        order.amountPaid = rpayOrder.amount_paid;
        order.amountDue = rpayOrder.amount_due;
        order.amount = rpayOrder.amount;
        order.status = rpayOrder.status;
        order.orderId = rpayOrder.id;
        order.billing_id = billing._id;
        order = this.order.save({...order });
        return order;
    }

    /**
     * Updates the billing with the order details.
     * @param billing 
     * @param order 
     */
    private async updateBillingWithOrder(billing: Billing, order: BillingOrder): Promise<Billing> {
        billing.billingOrderId = order.orderId;
        billing.border_id = order._id;
        billing = this.billing.save({...billing});
        return billing;
    }

    /**
     * Updates the billing with the payment details.
     * @param billing 
     * @param payment 
     * @param checkout 
     */
    private async updateBillingWithPayment(billing: Billing, payment: BillingPayment, checkout: BillingPaymentCaptureDTO): Promise<Billing> {
        billing.billingPaymentId = payment.paymentId;
        billing.bpayment_id = payment._id;
        billing.paymentSignature = checkout.paymentSignature;
        billing = this.billing.save({...billing});
        return billing;
    }

    /**
     * Creates and updates the payment with respect to RPay payment object.
     * @param billing 
     * @param rpayPayment 
     */
    private async createPaymentWithRPay(billing: Billing, rpayPayment: any): Promise<BillingPayment> {
        let paymentToSave: BillingPayment = {
            billing_id: billing._id,
            paymentId: rpayPayment.id,
            amount: rpayPayment.amount,
            currency: rpayPayment.currency,
            status: rpayPayment.status,
            orderId: rpayPayment.order_id,
            international: rpayPayment.international,
            method: rpayPayment.method,
            amountRefunded: rpayPayment.amount_refunded,
            refundStatus: this.parseRefundStatus(rpayPayment.refund_status),
            captured: rpayPayment.captured,
            errorCode: rpayPayment.error_code,
            errorDescription: rpayPayment.error_description
        };
        paymentToSave = this.payment.save({...paymentToSave });
        return paymentToSave;
    }

    /**
     * Parses the refund status from rpay for saving it as ordinal.
     * @param status 
     */
    private parseRefundStatus(status: string): Enums.PaymentRefundStatus  {
        if (status === 'null') {
            return Enums.PaymentRefundStatus.NULL_REFUND;
        } else if (status === 'full') {
            return Enums.PaymentRefundStatus.FULL;
        } else if (status === 'partial') {
            return Enums.PaymentRefundStatus.PARTIAL;
        }
        return Enums.PaymentRefundStatus.NULL_REFUND;
    }

    /**
     * Checks if the signature after the payment is vaild.
     * @param billing 
     */
    private isValidSignature(billing: Billing): boolean {
        return this.razorPay.validateWebhookSignature(
            billing.billingOrderId + '|' + billing.billingPaymentId, 
            billing.paymentSignature, Secret.RPAY_KEY_SECRET);
    }

    /**
     * Updates the payment info with correct statuses, order/payment attributes post signature validation.
     * @param billing 
     * @param payment 
     */
    private async updatePaymentInfo(billing: Billing, payment: BillingPayment): Promise<void> {
        const orderToUpdate: BillingOrder = await this.findOrderByOrderId(billing.billingOrderId);
        // Update the order
        if (orderToUpdate) {
            orderToUpdate.status = Enums.PaymentOrderStatus.PAID;
            orderToUpdate.amountPaid = orderToUpdate.amount;
            orderToUpdate.amountDue = 0;
        } else {
            orderToUpdate.status = Enums.PaymentOrderStatus.ATTEMPTED;
        }
        this.order.save({...orderToUpdate});
        // Update the payment
        payment.amountDue = 0;
        this.payment.save({...payment});
    }
}

export default PaymentService;