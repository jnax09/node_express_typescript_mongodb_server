import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/TokenData';
import CreateUserDto from '../dto/User';
import userModel from '../models/User';
import User from '../interfaces/UserInterface';
import configOptions from '../config';
import LogInDto from '../dto/LogIn';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';

class AuthenticationService {
    private user = userModel;

    public async register(userData: CreateUserDto) {
        if (
            await this.user.findOne({
                email: userData.email,
            })
        ) {
            throw new UserWithThatEmailAlreadyExistsException(userData.email);
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.user.create({
            ...userData,
            password: hashedPassword,
        });
        user.password = undefined;

        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);
        return {
            cookie,
            user,
        };
    }

    public async loggingIn(logInData: LogInDto) {
        const user = await this.user.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = undefined;
                const tokenData = this.createToken(user);
                const cookie = this.createCookie(tokenData);
                return {
                    cookie,
                    user,
                };
            } else {
                throw new WrongCredentialsException();
            }
        } else {
            throw new WrongCredentialsException();
        }
    }

    public createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
    public createToken(user: User): TokenData {
        const expiresIn = configOptions.secrets.jwtExp;
        const secret = configOptions.secrets.jwt;
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, {
                expiresIn,
            }),
        };
    }
}

export default AuthenticationService;
