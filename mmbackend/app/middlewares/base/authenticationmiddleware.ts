import { Request, Response, NextFunction } from 'express';
import AuthenticationTokenMissingException from '../../utils/exceptions/authentication/authenticationtokenmissingexception';
import WrongAuthenticationTokenException from '../../utils/exceptions/authentication/wrongauthenticationtokenexception';
import Secret from '../../utils/secret';
import * as JWT from 'jsonwebtoken';
import TokenData from  '../../types/user/tokendata';
import { UserModel } from '../../models/usermodel';

async function AuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        try {
            const verificationResponse: TokenData = JWT.verify(cookies.Authorization, Secret.JWT_SECRET) as TokenData;  
            const _id: string = verificationResponse.token._id;
            const user = await UserModel.findById(_id);
            if (user) {
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        } 
        
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default AuthenticationMiddleware;