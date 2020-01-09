import HttpException from './base/httpexception';

class CustomException extends HttpException {
  constructor(message: string, errors?: string[]) {
    if (errors) {
      super(500, message, errors);
    } else {
      super(500, message);
    }
  }
}

export default CustomException;