import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import winston from '../utils/winston';

const errorMiddleware = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    // winston logging
    winston.error(
        `${status} - ${message} - ${request.originalUrl} - ${request.method} - ${
            request.ip
        }`,
    );

    response.status(status).send({
        status,
        message,
    });
};

export default errorMiddleware;
