import HttpException from '../base/httpexception';

class SomethingWrongException extends HttpException {
  constructor(error: any) {
    super(400, "Something went wrong", error);
  }
}

export default SomethingWrongException;