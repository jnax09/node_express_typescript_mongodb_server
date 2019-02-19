import * as express from 'express';
import authController from './../controllers/AuthController';
import Routing from '../interfaces/Routing';
import CreateUserDto from '../dto/User';
import LogInDto from '../dto/LogIn';
import validationMiddleware from '../middlewares/Validation';

class AuthRoutes implements Routing {
    public router: express.Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            '/register',
            validationMiddleware(CreateUserDto),
            authController.registration,
        );
        this.router.post(
            '/login',
            validationMiddleware(LogInDto),
            authController.loggingIn,
        );
        this.router.post('logout', authController.loggingOut);
    }
}

export const authRoutes = new AuthRoutes().router;
