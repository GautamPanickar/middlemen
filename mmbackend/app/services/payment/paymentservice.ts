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

class PaymentService {
    private billing = BillingModel;
    private order = BillingOrderModel;
    private payment = BillingPaymentModel;
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
     */
    public async newOrder(dto: BillingDTO) {
        // If the user and order data exists then continue order creation.
        const user: User = await this.userService.findById(dto.user_id);
        if (user && dto.billingOrder) {
            const subscription: Subscription = await this.subscriptionService.findById(dto.user_id);
            if (subscription)  {
                this.setRazorPayOrderEssentials(dto.billingOrder, user, subscription.details);
            } else {
                throw new CustomException("Could not find the subscription");
            }            
        }
        return null;
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
}

export default PaymentService;