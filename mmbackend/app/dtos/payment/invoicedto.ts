import InvoiceItemDTO from './invoiceitemdto';

interface InvoiceDTO {
    id: string;
    user_id: string;
    billing_id: string;
    total?: number;
    items?: InvoiceItemDTO[];
    invoiceDate?: Date;
    invoiceCode?: string;
}

export default InvoiceDTO;