import { Request, Response, NextFunction } from 'express';
import Secret from '../../utils/secret';
import * as JWT from 'jsonwebtoken';
import TokenData from  '../../types/user/tokendata';
import UserModel from '../../models/usermodel';
import CustomException from 'utils/exceptions/customexception';

async function UserInfoMiddleware(request: Request, response: Response, next: NextFunction) {
    const cookies = request.cookies;
    try {
        const verificationResponse: TokenData = JWT.verify(cookies.Authorization, Secret.JWT_SECRET) as TokenData;  
        const _id: string = verificationResponse.token._id;
        const user = await UserModel.findById(_id);
        response.locals.userinfo = user;
        if (user) {
            next();
        }
    } catch (error) {
        next(new CustomException('Something went wrong while retrieving user details'));
    } 
}

export default UserInfoMiddleware;