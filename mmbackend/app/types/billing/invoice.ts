import InvoiceItem from './invoiceitem';

interface Invoice {
    _id: string;
    user_id: string;
    billing_id: string;
    total?: number;
    items?: InvoiceItem[];
    invoiceDate?: Date;
    invoiceCode?: string;
}

export default Invoice;