export namespace Enums {
    export const enum SubscriptionPlan {
        PLAN_1,
        PLAN_2,
        PLAN_3
    }

    export const enum SubscriptionStatus {
        PENDING,
        ACTIVE,
        CANCELED,
        DISABLED
    }

    export const enum Authorities {
        ROLE_ADMIN = 50,
        ROLE_USER = 100,
        ROLE_SUBSCRIBER = 150
    }

    export const enum PaymentOrderStatus {
        CREATED, 
        ATTEMPTED, 
        PAID, 
        CANCELLED
    }

    export const enum PaymentCurrency {
        INR = 'INR', 
        USD = 'USD'
    }

    export const enum PaymentCheckoutStatus {
        CREATED, 
        AUTHORIZED, 
        CAPTURED, 
        REFUNDED, 
        FAILED
    }

    export const enum PaymentCheckoutMethod {
        CARD = 'card', 
        NET_BANKING = 'netbanking', 
        WALLET = 'wallet',
        EMI = 'emi', 
        UPI = 'upi'
    }

    export const enum PaymentRefundStatus {
        NULL_REFUND, 
        PARTIAL, 
        FULL
    }
}