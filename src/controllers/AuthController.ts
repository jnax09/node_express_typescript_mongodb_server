import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';

import userModel from '../models/User';
import CreateUserDto from '../dto/User';
import LogInDto from '../dto/LogIn';

import User from '../interfaces/UserInterface';
import TokenData from '../interfaces/TokenData';
import DataStoredInToken from '../interfaces/DataStoredInToken';
import configOptions from '../config';

import AuthService from '../services/AuthService';

export class AuthController {
    private user = userModel;
    private authService = new AuthService();

    public registration = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const userData: CreateUserDto = request.body;
        try {
            const { cookie, user } = await this.authService.register(userData);
            response.setHeader('Set-Cookie', [cookie]);
            response.send(user);
        } catch (error) {
            next(error);
        }
    };

    public loggingIn = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const logInData: LogInDto = request.body;

        try {
            const { cookie, user } = await this.authService.loggingIn(logInData);
            response.setHeader('Set-Cookie', [cookie]);
            response.send(user);
        } catch (error) {
            next(error);
        }
    };

    public loggingOut = (request: express.Request, response: express.Response) => {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);
    };
}

const authController = new AuthController();

export default authController;
