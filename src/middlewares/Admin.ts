import * as express from 'express';
import configOptions from '../config';
import RequestWithUser from '../interfaces/RequestWithUser';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

module.exports = function(
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction,
) {
    // 401 Unauthorized
    // 403 Forbidden
    if (!configOptions.requireAuth) return next();
    //req.user from auth middleware
    if (!request.user.isAdmin) return next(new NotAuthorizedException()); //forbidden

    next(); //pass control to next middleware (route handler)
};
