import * as express from 'express';
import Routing from '../interfaces/Routing';
import validationMiddleware from '../middlewares/Validation';
import postController from '../controllers/PostController';
import authMiddleware from '../middlewares/Auth';
import CreatePostDto from '../dto/Post';

class PostRoutes implements Routing {
    public router: express.Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', postController.getAllPosts);
        this.router.get('/:id', postController.getPostById);
        this.router
            .all('/*', authMiddleware)
            .patch(
                '/:id',
                validationMiddleware(CreatePostDto, true),
                postController.modifyPost,
            )
            .delete('/:id', postController.deletePost)
            .post('/', validationMiddleware(CreatePostDto), postController.createPost);
    }
}

export const postRoutes = new PostRoutes().router;
