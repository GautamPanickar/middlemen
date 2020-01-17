import HttpException from '../base/httpexception';

class PaymentSignatureInvalidException extends HttpException {
  constructor() {
    super(400, 'Payment could not be validated. The signature is invalid.');
  }
}

export default PaymentSignatureInvalidException;