import InvoiceProduct from './invoiceproduct';

interface InvoiceItem {
    product?: InvoiceProduct;
    quantity?: number;
    cost?: number;
}

export default InvoiceItem;