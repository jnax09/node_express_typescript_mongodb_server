import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';

import DataStoredInToken from '../interfaces/DataStoredInToken';
import RequestWithUser from '../interfaces/RequestWithUser';

import userModel from '../models/User';
import configOptions from '../config';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    if (!configOptions.requireAuth) return next();

    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        const secret = configOptions.secrets.jwt;
        try {
            const verificationResponse = jwt.verify(
                cookies.Authorization,
                secret,
            ) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userModel.findById(id);
            if (user) {
                request.user = user;
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

export default authMiddleware;
