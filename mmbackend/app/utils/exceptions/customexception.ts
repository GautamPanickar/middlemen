import HttpException from './base/httpexception';

class CustomException extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}

export default CustomException;