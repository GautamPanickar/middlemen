import { Request, Response, NextFunction } from 'express';
import Logger  from '../../utils/logger';

function LoggerMiddleware(request: Request, response: Response, next: NextFunction) {
    Logger.info(`${request.method} ${request.path}`);
    next();
}

export default LoggerMiddleware;