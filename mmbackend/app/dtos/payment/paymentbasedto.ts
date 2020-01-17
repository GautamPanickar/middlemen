import { Enums } from '../../utils/enums';

interface PaymentBaseDTO {
    id?: string;
    entity?: string;
    amountPaid?: number;
    amountDue?: number;
    amountRefunded?: number;
    currency?: string;
    status?: Enums.PaymentOrderStatus;
    refundStatus?: Enums.PaymentRefundStatus;
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

export default PaymentBaseDTO;