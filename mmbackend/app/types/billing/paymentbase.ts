interface PaymentBase {
    _id?: string;
    entity?: string;
    amountPaid?: number;
    amountDue?: number;
    amountRefunded?: number;
    currency?: string;
    status?: string;
    refundStatus?: string;
    method?: string;
    attempts?: number;
    notes?: string[];
    createdAt?: Date;
    fee?: string;
    tax?: string;
    errorCode?: string;
    errorDescription?: string;
    description?: string;
    international?: boolean;
}

export default PaymentBase;