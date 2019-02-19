import * as express from 'express';
import Routing from '../interfaces/Routing';
import authMiddleware from '../middlewares/Auth';
import userController from '../controllers/UserController';

class UserRoutes implements Routing {
    public router: express.Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/me', authMiddleware, userController.getMe);
        this.router.get('/:id/posts', authMiddleware, userController.getAllPostsOfUser);
    }
}

export const userRoutes = new UserRoutes().router;
