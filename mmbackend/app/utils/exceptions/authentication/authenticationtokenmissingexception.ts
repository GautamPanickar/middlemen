import HttpException from '../base/httpexception';

class AuthenticationTokenMissingException extends HttpException {

    public constructor() {
        super(401, 'Authentication token missing');
    }
}

export default AuthenticationTokenMissingException;