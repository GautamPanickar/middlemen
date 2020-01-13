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
}