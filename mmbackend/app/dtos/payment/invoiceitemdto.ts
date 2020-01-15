import InvoiceProductDTO from './invoiceproductdto';

interface InvoiceItemDTO {
    product?: InvoiceProductDTO;
    quantity?: number;
    cost?: number;
}

export default InvoiceItemDTO;