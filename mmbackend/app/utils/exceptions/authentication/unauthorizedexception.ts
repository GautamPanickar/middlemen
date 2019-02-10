import HttpException from '../base/httpexception';

class UnauthorizedException extends HttpException {
  constructor() {
    super(403, "You're not authorized");
  }
}

export default UnauthorizedException;